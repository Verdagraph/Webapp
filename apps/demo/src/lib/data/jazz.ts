import { type JazzAppConfig } from 'jazz-tools/svelte';

/**
 * apps/demo runs fully client-side with no server or login. Jazz's
 * local-first mode mirrors that: no serverUrl, no auth provider, a
 * self-signed local account is created automatically with no network
 * dependency.
 */
export const JAZZ_APP_ID = 'afe427f5-6e8a-5b1a-9546-1367d527cb39';
const JAZZ_SERVER_URL = 'http://localhost:1626';

export function getJazzConfig(): JazzAppConfig {
	return {
		appId: JAZZ_APP_ID,
		serverUrl: JAZZ_SERVER_URL,
		initial: 'local-first'
	};
}
