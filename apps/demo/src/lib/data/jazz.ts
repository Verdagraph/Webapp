import { type JazzAppConfig, jwtAuth } from 'jazz-tools/svelte';

/**
 * apps/demo runs fully client-side with no server. Every visitor logs in
 * as the same fixed identity (below) rather than Jazz's per-browser
 * local-first mode: the old Triplit demo hardcoded one shared identity for
 * every visitor, and local-first gives each browser its own distinct
 * account instead, which meant concurrent first-time visitors raced to
 * create the shared demo garden and ended up with duplicate gardens
 * admined by different accounts (see jazzSeed.ts). A single shared
 * identity restores the old behavior and removes the race entirely: there
 * is only ever one admin, so every visitor is just seeing/editing the same
 * garden as everyone else, and the existing-garden check in jazzSeed.ts is
 * enough to keep seeding idempotent.
 */
export const JAZZ_APP_ID = 'afe427f5-6e8a-5b1a-9546-1367d527cb39';
const JAZZ_SERVER_URL = 'http://localhost:1626';

/**
 * A 10-year token for a fixed 'demo-visitor' identity, signed with the
 * same well-known dev JWT secret ('secret') the local Jazz server already
 * trusts by default (see packages/models/scripts/dev.sh). A genuinely
 * expiry-less token is rejected outright by the Jazz server
 * (account_request_failed) - it requires an `exp` claim - so this is
 * effectively permanent for dev purposes rather than truly infinite. Not a
 * real credential - there is no login, no password, and the secret is
 * already public throughout this repo's local dev defaults - just a fixed
 * subject so every visitor's browser resolves to the same account.
 */
const DEMO_VISITOR_TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiZGVtbyIsImlhdCI6MTc5MDMwOTE0NCwiZXhwIjoyMTA1NjY5MTQ0LCJhdWQiOiJqYXp6IiwiaXNzIjoidmVyZGFncmFwaCIsInN1YiI6ImRlbW8tdmlzaXRvciJ9.vUfqpEI7VCemP7DrLPhFJ6NQ22PY-FJZSCUyZ1XD-Vg';

export function getJazzConfig(): JazzAppConfig {
	return {
		appId: JAZZ_APP_ID,
		serverUrl: JAZZ_SERVER_URL,
		auth: jwtAuth({
			key: 'demo-visitor',
			getToken: async () => DEMO_VISITOR_TOKEN,
			logout: () => {}
		})
	};
}
