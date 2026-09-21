import { type JazzAppConfig, jwtAuth } from 'jazz-tools/svelte';

import auth from '$state/auth.svelte';

import triplit from './triplit';

/**
 * Jazz v2 validation spike — reuses the app's existing JWT auth (the same
 * token driving `triplit`) rather than a separate Jazz-native login, per
 * packages/models/src/jazz/SPIKE_NOTES.md. Local dev server started via
 * `pnpm --filter @vdg-webapp/models dev:jazz`.
 */
export const JAZZ_APP_ID = 'afe427f5-6e8a-5b1a-9546-1367d527cb39';
const JAZZ_SERVER_URL = 'http://localhost:1626';

/**
 * Builds the Jazz app config. A function rather than a module-level
 * constant so `key` reflects `auth.isAuthenticated` at call time — callers
 * should construct this after login completes (e.g. behind the same
 * `{#if initialized}` gate `+layout.svelte` already uses for Triplit).
 */
export function getJazzConfig(): JazzAppConfig {
	return {
		appId: JAZZ_APP_ID,
		serverUrl: JAZZ_SERVER_URL,
		auth: jwtAuth({
			/** Stable per login/logout transition, not per token refresh. */
			key: auth.isAuthenticated ? 'authenticated' : null,
			getToken: async () => triplit.token ?? '',
			logout: () => {}
		})
	};
}
