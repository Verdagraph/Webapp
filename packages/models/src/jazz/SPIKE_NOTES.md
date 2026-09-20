# Jazz v2 Validation Spike: Notes

Reference document for the `jazz-spike-gardens` branch. See the plan this
spike executes: it resumes from the abandoned `origin/migrate-data-layer-jazz2`
branch's gardens-domain port, re-verified against current `jazz-tools`
(`2.0.0-alpha.55` at time of writing; the old branch used `alpha.42`).

Scope: `gardens` domain only (schema, permissions, controller), plus a
minimal `users` stub table for membership lookups. Triplit is untouched —
nothing in this tree is wired into `apps/web`/`apps/server` yet. All design
decisions here should be reviewed by the user before any wider rollout.

---

## Status: schema + permissions + controller port complete; runtime-verified end-to-end

- `packages/models/src/jazz/` typechecks cleanly (`npx tsc --noEmit`).
- A local, self-hosted Jazz sync server runs with **no Jazz Cloud account
  needed**: `npx jazz-tools@alpha create app --name <x>` mints an app ID
  entirely locally (no network call), and
  `npx jazz-tools@alpha server <appId> --in-memory --admin-secret <secret>`
  starts a real server (Rust binary, downloaded on first run) on port 1626.
- The full gardens schema + permissions (including the cross-table
  `exists.where(...)` checks) deploys successfully to that server via
  `npx jazz-tools@alpha deploy <appId> --schema-dir src/jazz --server-url http://localhost:1626 --admin-secret <secret>`.
- **`gardenCreate()` — the actual ported controller function, not a
  hand-rolled insert — runs successfully end-to-end against a real server**,
  including slug-uniqueness rejection and creator-membership creation, and
  the resulting permission enforcement matches the Triplit version's
  intended semantics (admin can update; viewer's update is denied by the
  server; a non-member gets no result reading a `HIDDEN` garden; a member
  can read it). Verified with 8/8 checks passing in `spike-verify.ts` (a
  standalone script at the package root using `jazz-tools/testing`'s
  `createPolicyTestApp` — run manually, not part of the build/CI).
- Not yet done: any `apps/web`/`apps/server` UI or auth wiring.

## Headline finding #1: garden IDs cannot stay as user-supplied slugs — resolved

Every row id in Jazz v2 — including values held in `s.ref(...)` columns,
scalar or array — must be a literal UUID; the runtime rejects anything else
with `invalid uuid <value>` or `invalid UUID value <value>`. `gardens.id`
used to be a user-chosen URL-friendly slug (`gardenIdSchema` in
`packages/models/src/gardens/commands.ts`: 4–21 chars, alphanumeric plus
hyphens, e.g. `"my-garden"`), used as the join key from
`gardenMemberships.gardenId` and everywhere the app addresses a garden.

**Decision (user, since this is a real data-model change, not just an API
translation): keep a generated UUID as the real `id`, add a separate `slug`
column carrying the existing human-readable value** — with the caveat that
`slug` must stay unique and human-readable, same as `id` was. Implemented:

- `gardens` schema gained a `slug: s.string()` column (see
  `gardens/schema.ts`). Jazz has no native unique-constraint modifier in the
  `s.table()` DSL, so uniqueness is enforced the same way the app already
  enforced it for `id` under Triplit: an application-level check-before-insert
  in `gardenCreate` (query by `slug`, reject if found) — not a DB guarantee,
  consistent with the existing pattern, not a regression.
- Every controller function that used to look up a garden by `data.gardenId`
  directly against `gardens.id` (or against `gardenMemberships.gardenId`,
  which is a real `ref` and must hold the UUID) now resolves slug → garden
  first. `requireRole` (`jazz/controller.ts`) now queries
  `.where({ slug: gardenSlug })`. A new `getGardenBySlugOrError` helper in
  `gardens/controller.ts` covers the two functions that don't go through
  `requireRole` (`gardenMembershipAccept`, `gardenMembershipDelete`).
- Functions that already called `requireRole` and used the returned
  `garden.id` for membership operations (`gardenMembershipCreate`,
  `gardenMembershipRoleChange`) needed no change beyond `requireRole`
  itself switching to `slug` — they were already using the resolved
  garden's real id, not the raw command input.

## Headline finding #2: a same-transaction insert can't pass a policy that checks the row it just inserted

Found while getting `gardenCreate()` to actually pass end-to-end (not just
compile/deploy). The original port staged the garden insert and the
creator's membership insert in one `db.transaction(...)` call — this
**looked like it succeeded** (`await ctx.db.transaction(...)` resolved with
no error) but the garden was never actually there afterward. The local
transaction result only tells you the write was accepted *locally*; you
have to explicitly `await result.wait({ tier: "edge" })` (documented in
`MIGRATION_NOTES.md`'s "transaction API" section) to get the server's real
verdict — and once awaited, it surfaced a genuine rejection:

```
PersistedWriteRejectedError: ... rejected (permission_denied):
Write rejected by server authorization
```

Root cause, isolated with a series of throwaway probes (not kept — see
history if needed): `gardenMemberships.allowInsert`'s policy checks
`policy.gardens.exists.where({ id: membership.gardenId, adminIds: {
contains: session.user.account } })`. When the referenced `gardens` row was
inserted earlier in the *same* transaction, the policy engine does not see
it as existing yet — so the dependent membership insert is denied. This
reproduced consistently regardless of whether the transaction was driven
directly (`db.transaction`) or through the ported controller.

**Fix confirmed working:** insert the garden alone first, explicitly
`await write.wait({ tier: "edge" })` to get durable confirmation, and only
*then* insert the (now-safe-to-batch-together) memberships in their own
transaction. Membership inserts don't have this problem with each other —
they all depend on the same already-durable garden, not on one another.
`gardenCreate` now does this two-phase insert; see `gardens/controller.ts`.

**Practical implication for a wider migration:** any "create a parent row
and immediately create child rows whose insert-policy depends on the
parent" pattern needs this same two-phase treatment — plan for it if this
migration proceeds further (e.g. the old branch's dropped
default-workspace/default-environment inserts in `gardenCreate` would have
hit the same issue). Not confirmed whether this is documented/intended
alpha behavior or a gap — worth asking the Jazz team, same as finding #3
below.

## API drift confirmed since the abandoned branch (`alpha.42` → `alpha.55`)

The abandoned `migrate-data-layer-jazz2` branch is ~4 months stale against
the API. Concretely:

- **`session.userId` no longer exists.** The session context now exposes
  `session.user` (a branded ref for the exact signed-in identity) with a
  nested `.account` (for ownership checks shared across linked identities)
  and `.identity.{issuer,subject}`. Fixed by using `session.user.account`
  everywhere the branch used `session.userId`.
- **`db.beginTransaction()` no longer takes a table argument.** The branch
  called `ctx.db.beginTransaction(ctx.jazz.gardens)`; current alpha's
  `beginTransaction(): Transaction<"mergeable">` takes no arguments. Used
  the documented `db.transaction(async (tx) => {...})` wrapper instead,
  which matches the docs example and needs no manual `commit()`.

## A previously "unverified speculation" gotcha, partially resolved

`MIGRATION_NOTES.md` on the old branch flagged an `as any` cast used to
supply a user-defined garden ID on insert, since `InsertOf<T>` doesn't
include `id`, and noted this needed confirmation. **Confirmed via the type
declarations directly**: `Db.insert`/`Transaction.insert` take a third
`options?: InsertOptions` argument with `id?: string`, so no cast is needed
to supply a custom id:

```ts
tx.insert(ctx.jazz.gardens, { name, visibility, ... }, { id: someUuid });
```

But this only resolves the _mechanism_ — it does not resolve the old
branch's actual use case, since that `id` must be a UUID (see the headline
finding above). The old branch's `as any` cast would have hidden this same
UUID constraint, not worked around it; it was never actually run against a
live server to find out. See `packages/models/src/jazz/gardens/controller.ts`.

## Headline finding #3: `contains` against a session ref requires a ref-array column

This is the significant new discovery from this spike, found by isolating a
deploy-time failure the CLI's local `validate` did **not** catch (only
`deploy`, which round-trips through the server's policy compiler, caught
it):

**Symptom:** deploying any policy of the shape
`{ someIds: { contains: session.user.account } }` (or `session.user`) where
`someIds` is declared as `s.array(s.string())` fails with:

```
Permissions publish failed: 400 Bad Request - {"error":"permissions schema
is not supported by the server shell: $.<table>.policies.<op>.using:
converted read policy is invalid: OperandTypeMismatch","code":"bad_request"}
```

This reproduces for `allowRead`, `allowUpdate`, `allowInsert`, and inside
nested `policy.<table>.exists.where(...)` calls alike — i.e. it's not
specific to one policy action or to the cross-table `exists` pattern, it's
specific to `contains` + a session-ref operand against a `TEXT[]` column.
The TypeScript types do not catch this — `PermissionWhereLeaf<T> = T |
SessionRefValue | RowRefValue | ...` accepts a session ref for any leaf
type, so this only surfaces at deploy time against a real server.

**Fix confirmed working:** declare the column as a ref array instead of a
plain string array — `s.array(s.ref('users'))` instead of
`s.array(s.string())` — for any `*Ids` column that a permission policy will
later compare against a session ref via `contains`. A literal string
operand (`{ contains: 'some-id' }`) against a plain `s.array(s.string())`
column deploys fine; only the session-ref operand needs the ref-array
column type. After this schema change, the full gardens permission set
(including the multi-clause `anyOf`/`exists.where` cross-table checks)
deployed cleanly on the first attempt.

**Not yet confirmed:** whether this is documented/intended behavior or an
alpha-stage compiler gap, and whether it has any runtime cost/behavior
difference (e.g. referential integrity enforcement on the array elements)
beyond satisfying the policy compiler. Worth confirming with the Jazz team
before treating this as settled for a wider rollout — flagging this
explicitly per the same "confirm before relying on it" discipline the old
branch's notes used.

## Deliberately out of scope for this spike (per the plan)

- Better Auth integration — the old branch's own finding (schema-generation
  chicken-and-egg blocker) is taken at face value and not re-investigated
  here. `packages/models/src/jazz/users.ts` is a placeholder stub table
  only used for membership-invite lookups within this spike.
- `cultivars`, `environments`, `observations`, `plants`, `workspaces` — not
  ported in this pass. `gardenCreate`'s default-workspace/default-environment
  inserts (present in the old branch) were dropped for the same reason.
- Any `apps/web` or `apps/server` wiring, and removing/touching Triplit.

## How to reproduce locally

```bash
# one-time: mint a local app id (no network call)
npx jazz-tools@alpha create app --name jazz-spike-gardens

# start a local in-memory sync server
JAZZ_ADMIN_SECRET=dev-secret npx jazz-tools@alpha server <appId> \
  --port 1626 --in-memory --admin-secret dev-secret --allow-local-first-auth

# from packages/models, validate + deploy the schema/permissions
npx jazz-tools@alpha validate --schema-dir src/jazz
npx jazz-tools@alpha deploy <appId> --schema-dir src/jazz \
  --server-url http://localhost:1626 --admin-secret dev-secret
```

## Stylistic guardrail (carried forward, still applies)

Same rule the old branch's notes documented: treat the Triplit → Jazz API
translation as the only sanctioned diff. No incidental style/formatting
changes to ported code.
