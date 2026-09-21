# Jazz v2 Validation Spike: Notes

Reference document for the `jazz-spike-gardens` branch. See the plan this
spike executes: it resumes from the abandoned `origin/migrate-data-layer-jazz2`
branch's gardens-domain port, re-verified against current `jazz-tools`
(`2.0.0-alpha.55` at time of writing; the old branch used `alpha.42`).

Scope: `gardens` domain only (schema, permissions, controller), plus a
minimal `users` stub table for membership lookups. Triplit is untouched and
still fully live — `apps/web`'s `gardenContext.svelte.ts` now reads through
Jazz instead (see "Headline finding #5"), but every other domain
(cultivars, plants, workspaces, observations, planner) is still 100%
Triplit. All design decisions here should be reviewed by the user before
any wider rollout.

**Naming/layout is spike-only, not the intended final shape.** The `Jazz`
prefix on types (`JazzGarden`, `JazzGardenMembership`, `JazzUser`, `JazzApp`,
`JazzDb`) and the whole `src/jazz/` subtree exist only so this port can live
_alongside_ the Triplit-backed code without name collisions during
validation. In an actual migration (Jazz replacing Triplit, not sitting
next to it), these become the real names — `Garden`, `GardenMembership`,
etc. — living directly in `gardens/schema.ts` and friends, the same way the
Triplit versions do today; no separate `jazz/` nesting or prefix needed.

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
- **The real JWT auth bridge is done and verified against production code**,
  not just a probe — see "Headline finding #4" below.
- **`apps/web` now runs against Jazz in a real browser, end to end**:
  `gardenContext.svelte.ts` (packages/ui, the shared context every garden
  route reads) is swapped to Jazz; `<JazzProvider>` wraps the app using the
  same JWT that drives Triplit; the app renders with zero console errors
  after a real login. Required fixing two real Vite-dev-server
  incompatibilities in `jazz-tools`'s browser runtime — see "Headline
  finding #5". Triplit itself is untouched and still driving everything
  else in the app.

## Headline finding #4: the existing JWT auth bridges to Jazz cleanly — verified with a real login

Traced Jazz's external-JWT verification (`jose`'s `compactVerify`/`importJWK`
in `jazz-tools/backend`, not just the `.d.ts` files) to settle whether the
app's existing HS256 shared-secret auth (`apps/server`, Argon2 + JWT, see
`apps/server/src/users/auth/tokens.ts`) could work with Jazz at all, per the
plan's recommendation to reuse it instead of adopting Better Auth.

**It works, end to end, verified against a real `/users/login` call — not
just a hand-crafted token.** Concretely:

1. **HS256 shared secrets work.** `--jwt-public-key` accepts a JWK; passing
   `{ kty: "oct", k: base64url(secret) }` (the JWK form of an HMAC secret)
   verifies our existing `ACCESS_TOKEN_SECRET`-signed tokens correctly. No
   asymmetric keypair or JWKS endpoint needed, contrary to what the flag
   names alone suggest.
2. **`sub`/`iss`/`aud` claims are required**, and the CLI mandates
   `--jwt-issuer`/`--jwt-audience` whenever `--jwt-public-key` is set (even
   though the underlying library only _enforces_ issuer/audience matching if
   those options are actually configured). Our tokens had none of the three.
   **Fixed**: `apps/server/src/users/auth/tokens.ts`'s `encodeAccessToken`
   now sets `subject: accountId`, `issuer: 'verdagraph'`,
   `audience: 'jazz'` via `jsonwebtoken`'s sign options — additive, doesn't
   change `decodeAccessToken`'s existing verification (which doesn't check
   audience/issuer) or break anything reading the token elsewhere.
3. **`session.user.account` — what `gardens/permissions.ts` already checks —
   gets populated correctly for external JWT sessions**, via Jazz's own
   account-admission/registry mechanism: calling
   `session.loginOrRegisterJWT(token)` (client-side; the equivalent on a
   backend is `JazzClient.forRequest(request, { account: "login-or-register" })`)
   auto-provisions a stable Jazz-native account UUID for a given
   `(iss, sub)` identity pair on first use, and returns the same UUID on
   every subsequent login — **confirmed identical across separate process
   runs with the same token**. No change needed to `gardens/permissions.ts`
   or the ref-array schema decision from finding #3 — they already worked
   against this correctly once the token had `sub`/`iss`.
4. **The full loop was verified with real production code**, not synthetic
   sessions: called `POST /users/login` on the actual running `apps/server`
   with real seeded credentials (`test@Verdagraph.com` / `password` from
   `packages/models/triplit/seeds/seed.ts`), took the real returned access
   token, fed it through `createJazzSession(...).loginOrRegisterJWT(token)`
   against a real local Jazz server, and confirmed: a garden with that
   user's real Jazz account UUID in `adminIds` could be updated by them: a
   garden _without_ it there was correctly denied
   (`permission_denied: Write rejected by server authorization`).

**Open question, not yet resolved: how does inviting _another_ user to a
garden work?** `gardenCreate`/`gardenMembershipCreate` currently resolve
invites by username against the `users` stub table to get a `profileId`,
then put that directly in `adminIds`/`editorIds`/`viewerIds`. But the value
those arrays actually need is the invitee's **Jazz account UUID** — which
only exists once _that user_ has completed a Jazz login at least once (the
UUID is assigned by Jazz's account registry on first `loginOrRegisterJWT`/
`forRequest`, not computed by us). Whether that assignment is a pure
deterministic function of `(issuer, subject)` we could replicate ourselves
ahead of time (there's a `readAccountAssignment` client helper in
`jazz-tools`'s `accounts/registry-client` that suggests a registry _lookup_
is the sanctioned path, not a local hash) is unconfirmed. Needs
investigation before invite flows can be ported — not blocking for a
single-user demo of the UI wiring, but blocking for real multi-user
membership flows.

## Headline finding #5: two real Vite-dev-server bugs in `jazz-tools`'s browser runtime — found, patched, verified in a real browser

Wiring `gardenContext.svelte.ts` (`packages/ui`) to Jazz and loading it in
an actual browser (Playwright against the real dev stack, not a probe
script) hit two separate, genuine incompatibilities between `jazz-tools`
alpha's browser runtime and Vite's dev server. Both needed fixes before the
app would render past a loading/error screen; neither is a Jazz _logic_
bug — the underlying schema/permissions/controller work (findings #1–#4)
needed zero changes.

**Bug A — a ternary breaks Vite's static worker-options parsing.**
`jazz-tools` picks between two `new SharedWorker(...)` call sites with a
ternary, and the fallback branch's options object (`{ type: "module", name
}`) includes a free variable (`name`), which Vite's `vite:worker-import-meta-url`
plugin can't statically evaluate — it throws `"Vite is unable to parse the
worker options as the value is not static"` at dev-server request time (a
hard 500, not a warning). Symptom: the whole page fails to load with a
`Failed to fetch dynamically imported module` error, before Jazz even gets
involved.

**Bug B — fixing Bug A naively breaks the worker's own URL resolution.**
Vite's suggested fix (`/* @vite-ignore */` in the options) works, but
_inside the options object_, not before the `new URL(...)` call — the
comment has to land in the substring Vite extracts between the URL argument
and the closing paren (`getWorkerType` in Vite's source literally slices
that range and regex-tests it). Get the placement right and Vite stops
throwing, but it _also_ stops doing its normal `new Worker(new URL(...))`
dev-URL rewriting for that call, so the worker script 404s in the browser
at runtown from an unresolvable relative path — meaning `/* @vite-ignore */`
alone trades a hard crash for a silent, harder-to-diagnose failure
(`Shared browser runtime did not issue a foreground node lease` after a
~10s timeout, with the actual cause invisible in the main page's console
since it happens inside a `SharedWorker`).

**Fix, confirmed working end-to-end:**

1. Patch (`pnpm patch jazz-tools`, see `patches/jazz-tools@2.0.0-alpha.55.patch`):
   hoist the `new URL("../../worker/jazz-broker-worker.js", import.meta.url)`
   computation _out of_ the `new SharedWorker(...)` call, into an IIFE
   parameter, so it's no longer an inline argument Vite's plugin tries to
   specially parse at all:
   ```js
   : ((workerUrl) => (name) => new SharedWorker(workerUrl, {
       type: "module",
       name,
     }))(new URL("../../worker/jazz-broker-worker.js", import.meta.url));
   ```
2. `apps/web/vite.config.ts`: add `jazzPlugin({ server: false })` from
   `jazz-tools/dev/vite` (handles `jazz-wasm` resolution/aliasing), **and**
   manually add `optimizeDeps.exclude: ['jazz-tools', 'jazz-tools/svelte',
'jazz-wasm']`. The plugin alone isn't enough — without also excluding
   `jazz-tools`/`jazz-tools/svelte`, Vite's dep pre-bundler relocates the
   module into `.vite/deps/`, which breaks the _same_ `import.meta.url`-relative
   worker path in a different way (a 404 for
   `/node_modules/worker/jazz-broker-worker.js` — a flattened, wrong path).
   Excluding `jazz-tools` alone (without also excluding `jazz-wasm`) trades
   that for a WASM-loading 404 instead (`jazz-wasm`'s glue code has the
   opposite expectation — that it's found _in_ `.vite/deps/`). All three
   excludes together is what actually worked.

**Verified**: after both fixes, `apps/web` (via `pnpm --filter web dev`)
loads `/gardens/[gardenId]` in a real headless-Chromium session with **zero
console errors**, a real `POST /apps/<id>/accounts/login-or-register`
request fires against the real local Jazz server using the real JWT from a
real `/users/login` call, and the app renders through to actual page
content (not stuck on Jazz's loading/error screen). This is the strongest
signal yet that the whole stack (schema → permissions → controller → auth
→ browser client) holds together, not just each piece in isolation.

**Not investigated:** whether this is dev-server-only (a production Vite
build might not hit the same static-analysis path at all, since Rollup's
worker handling differs from Vite dev's per-request transform), or whether
other bundlers (webpack, Turbopack) would hit an equivalent issue. Worth
checking if this migration proceeds toward `apps/web` actually shipping on
Jazz, since patching a third-party package via `pnpm patch` is a
maintenance liability that should be reported upstream, not treated as a
long-term fix.

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
transaction result only tells you the write was accepted _locally_; you
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
inserted earlier in the _same_ transaction, the policy engine does not see
it as existing yet — so the dependent membership insert is denied. This
reproduced consistently regardless of whether the transaction was driven
directly (`db.transaction`) or through the ported controller.

**Fix confirmed working:** insert the garden alone first, explicitly
`await write.wait({ tier: "edge" })` to get durable confirmation, and only
_then_ insert the (now-safe-to-batch-together) memberships in their own
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

## Permissions file structure: one function per table, and a corrected old gotcha

`gardens/permissions.ts` is now split into one policy-builder function per
table (`constructGardensPolicy`, `constructGardenMembershipsPolicy`),
composed by the exported `constructGardenPermissions(app)`. This is the
convention to follow as domains grow — one function per table/model within
a domain's `permissions.ts`, not one large function for the whole domain.
`PolicyContext<JazzApp>` (exported from `jazz-tools`) is the type to give
each function's destructured `{ policy, session }` parameter.

This also let a shared cross-table check get extracted into a helper —
**correcting** `MIGRATION_NOTES.md`'s old finding that a shared helper
"does not work because TypeScript cannot narrow the row type through the
helper boundary." Re-tested against `alpha.55`: it works fine, _as long as
the helper's row parameter is typed as `{ <field>: RowRefValue }`_
(`RowRefValue`, exported from `jazz-tools`) rather than left inferred or
typed `unknown`:

```ts
const isGardenAdmin = (membership: { gardenId: RowRefValue }) =>
	policy.gardens.exists.where({
		id: membership.gardenId,
		adminIds: { contains: session.user.account }
	});

policy.gardenMemberships.allowInsert.where(isGardenAdmin);
policy.gardenMemberships.allowUpdate.where(isGardenAdmin);
policy.gardenMemberships.allowDelete.where(isGardenAdmin);
```

The old branch's helper attempt was actually a different, narrower pattern
(a function capturing an _outer_ `gardenId` string and returning a closure
over an untyped row parameter) — this dedicated `RowRefValue` typing wasn't
tried. Verified behavior-identical against the same 8/8 `spike-verify.ts`
checks after the refactor.

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
- `apps/web` wiring is now **partially done** (see finding #5) —
  `gardenContext.svelte.ts` only. Every other Triplit-backed context
  (`cultivarContext`, `plantsContext`, `workspacesContext`, etc.),
  `apps/server`, and removing/touching Triplit itself are still untouched.
- Real multi-user membership/invite flows — see the open question at the
  end of finding #4 (resolving an invited user's Jazz account UUID).
- Any manual UI testing beyond confirming the page loads without errors —
  no garden was created through Jazz and viewed through the actual UI (the
  `/gardens/[gardenId]` route content itself is a pre-existing "Under
  Construction" placeholder, unrelated to Jazz).

## How to reproduce locally

**Use a pinned version** (`jazz-tools@2.0.0-alpha.55`, matching
`package.json`), not `@alpha` — that tag moved to `alpha.56` mid-spike and
an unpinned `npx jazz-tools@alpha ...` silently installs whatever's newest,
which can drift from what's actually committed.

```bash
# one-time: mint a local app id (no network call)
npx jazz-tools@2.0.0-alpha.55 create app --name jazz-spike-gardens

# start a local in-memory sync server (no external JWT auth)
npx jazz-tools@2.0.0-alpha.55 server <appId> \
  --port 1626 --in-memory --admin-secret dev-secret --allow-local-first-auth

# ...or, to test the real JWT bridge (finding #4): validate the app's
# ACCESS_TOKEN_SECRET as a JWK, and require the iss/aud it now sets
npx jazz-tools@2.0.0-alpha.55 server <appId> \
  --port 1626 --in-memory --admin-secret dev-secret \
  --jwt-public-key '{"kty":"oct","k":"<base64url(ACCESS_TOKEN_SECRET)>"}' \
  --jwt-issuer verdagraph --jwt-audience jazz

# from packages/models, validate + deploy the schema/permissions
npx jazz-tools@2.0.0-alpha.55 validate --schema-dir src/jazz
npx jazz-tools@2.0.0-alpha.55 deploy <appId> --schema-dir src/jazz \
  --server-url http://localhost:1626 --admin-secret dev-secret
```

## Stylistic guardrail (carried forward, still applies)

Same rule the old branch's notes documented: treat the Triplit → Jazz API
translation as the only sanctioned diff. No incidental style/formatting
changes to ported code.
