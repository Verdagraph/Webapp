# Jazz v2 migration: paused, and how to keep Triplit development unblocked

> Written 2026-09-26 on branch `jazz-spike-gardens`, so this survives across sessions. The Jazz migration hit a severe, unresolved alpha-SDK performance/correctness issue (see below) and is being paused rather than merged. This is the plan for continuing active development on Triplit in the meantime, without losing the migration work already done.

## Context

`jazz-spike-gardens` carried a full Triplit → Jazz v2 (`jazz-tools` alpha) migration to completion: every domain (gardens, workspaces, cultivars, plants, environments, observations, user credentials) ported, `packages/models`'s Triplit source deleted, `packages/ui`'s ~24+ write call sites moved onto a shared `Commands` interface, and `apps/demo` verified rendering and seeding correctly end-to-end in a real browser.

Late in that process, real browser testing (not just the automated smoke tests that had been passing) surfaced a severe main-thread-blocking issue in `jazz-tools`'s WASM runtime, plus writes producing zero network traffic in some cases - full technical detail in `packages/models/SPIKE_NOTES.md`, **Headline finding #10**. It's unresolved: not clearly a dev-mode artifact, not clearly machine-specific, and not clearly which side of the write path is actually broken. An attempted upgrade to the one newer `jazz-tools` version available (`alpha.56`) was abandoned after discovering it's a breaking schema-DSL change (`s.ref()` removed entirely), not a compatible bump - confirming this SDK isn't API-stable even within its own alpha channel.

Given that, continuing to build product features against this backend right now is too risky. This ticket is about **not losing the two things worth keeping**: the migration research/findings, and - the specific thing asked for - **the write-side abstraction pattern that makes a future backend swap much cheaper**, applied back onto the live Triplit codebase.

## Current state of the repo (verify before starting - branches move)

- **`main`** is untouched Triplit code, no `jazz-tools` dependency anywhere, diverged from `jazz-spike-gardens` at `d4fe44c7`. This is where active Triplit development should continue - no revert, no cleanup needed, it was never touched.
- **`jazz-spike-gardens`** has the complete (but paused) Jazz migration, commits `25cc3f3b`..`b23fbe6c` on top of that same base, plus some later uncommitted fixes (identity/seeding/editable-tree bugs found while chasing the performance issue - see `git status` on that branch, or just diff against `b23fbe6c`). **Do not merge this branch into `main`** until the Headline finding #10 investigation actually resolves - keep it as a reference/resume point.
- `packages/models/SPIKE_NOTES.md` (only exists on `jazz-spike-gardens`) is the full technical findings log: 10 headline findings, each with concrete repro evidence, covering real alpha-SDK gaps found over the whole migration (JSON column write bugs, policy-compiler bugs, the SharedWorker/Vite patch, the demo-seeding concurrency races, and finally the unresolved performance issue). Read it before ever resuming Jazz work - it'll save re-discovering the same gotchas.

## The abstraction pattern worth porting back onto Triplit

The valuable architectural change made during the migration, independent of which backend is active, is the **write-side `Commands` interface**. Before this migration, `packages/ui` components imported and called Triplit command functions directly (e.g. `import { gardenCreate } from '@vdg-webapp/models'; ...; gardenCreate(data, triplitContext)`), spread across ~24+ call sites. Every one of those now goes through one shared interface instead:

```ts
// packages/models/src/controller.ts (on jazz-spike-gardens; Triplit-backed equivalent doesn't exist yet on main)
export interface Commands extends ControllerContext {
	gardenCreate(data: GardenCreateCommand): Promise<Garden>;
	workspaceCreate(data: WorkspaceCreateCommand): Promise<Workspace>;
	plantingAreaCreate(data: PlantingAreaCreateCommand): Promise<void>;
	plantsCreate(data: PlantsCreateCommand): Promise<void>;
	// ... one method per domain command
}
export function createCommands(params: ControllerContextParams): Commands {
	/* binds every command fn to one shared ctx */
}
```

`packages/ui`'s components call `ctx.controller.gardenCreate(data)` (via `getAppContext().controller`, set up once in `packages/ui/src/state/application/appContext.svelte.ts`) and never import a command function or a backend-specific context directly. **This is the actual swap point**: as long as `createCommands()`'s _implementation_ can target a different backend, none of `packages/ui`'s ~24+ call sites need to change again.

**Honest gap - this was never fully symmetric**: the _read_ side was not abstracted the same way. Each context (`gardenContext.svelte.ts`, `workspacesContext.svelte.ts`, `plantsContext.svelte.ts`, `cultivarContext.svelte.ts`, `environmentContext.svelte.ts`) calls its backend's query API (Triplit's `useQuery`/`.Include()`, or Jazz's `QuerySubscription`/`db.one()`) directly inline. Swapping backends today would still mean rewriting every context's query logic by hand. If a clean two-way swap matters enough to invest in, a `Queries`-shaped interface mirroring `Commands` (one method per read, e.g. `queries.gardenBySlug(slug)` returning a reactive result) would close this gap - **not done this session, worth deciding whether it's worth doing now vs. deferring until the next real swap attempt.**

## Concrete plan for the next session

1. **Confirm `main` is still the active Triplit branch** (`git log --oneline main -1`, check no `jazz-tools` in `packages/models/package.json`) before starting anything - branches may have moved since this was written.
2. **Port the `Commands` interface shape onto `main`'s Triplit code**, _not_ by merging `jazz-spike-gardens` (that would drag in the entire Jazz backend and its unresolved bug). Instead:
   - Look at `jazz-spike-gardens`'s `packages/models/src/controller.ts` (`ControllerContext`/`createController`/`Commands`/`createCommands`) as the reference shape.
   - Recreate the same interface on `main`, but with `createCommands()`'s implementation calling the existing Triplit command functions (already framework-agnostic zod-validated functions in each domain's `commands.ts`/`controller.ts` on `main` - these don't need to change, only how they're _wired together and exposed_ changes).
   - Update `packages/ui`'s write call sites to go through `ctx.controller.<method>()` the same way `jazz-spike-gardens` already did (that branch's diff _is_ the worked example of every call site that needs this change - use it as a checklist, not something to blindly cherry-pick, since the Triplit-side binding will look different from the Jazz-side one it's currently bound to).
3. **Decide on the read-side gap** (previous section) - close it now with a `Queries` interface, or explicitly defer and note that as the known cost of the next backend swap.
4. **Keep developing product features against Triplit** through this abstraction from here on.
5. **When resuming Jazz** (whenever the SDK matures, or Headline finding #10 gets a real answer): the schema/permissions/controller design work on `jazz-spike-gardens` is a real head start, not a from-scratch redo - re-verify it against whatever `jazz-tools` version is current at that time (expect real API drift, per the alpha.55→alpha.56 experience), and re-run the empirical validation discipline documented in `SPIKE_NOTES.md`'s "How to reproduce locally" section rather than trusting the SDK's own docs/types alone - that discipline is what caught 9 of the 10 headline findings before they became runtime surprises.

## What NOT to do

- Don't merge `jazz-spike-gardens` into `main` as-is - the performance issue is unresolved and would ship a broken write path.
- Don't re-attempt the `jazz-tools` alpha.56 upgrade without first deciding whether the `s.rel()`/`s.reverse()` rewrite is worth doing blind - there's no evidence yet it fixes anything, only that it's a real rewrite cost.
- Don't rediscover the alpha-SDK gotchas in `SPIKE_NOTES.md` by trial and error again - read it first.
