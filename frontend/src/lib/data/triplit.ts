import { TriplitClient } from '@triplit/client';
import { browser } from '$app/environment';
import { schema, roles } from '@vdt-webapp/common';
import { userRefresh } from './users/auth';

/**
 * When a value is updated in rapid succession,
 * a ChangeHandler (see lib/state/changeHandler.svelte.ts)
 * is used to break the updates into regular intervals
 * to avoid changes being sent to Triplit too frequently.
 * This is the default interval for that.
 */
export const TRIPLIT_UPDATE_DEFAULT_INTERVAL = 5;

export const TRIPLIT_ANON_TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdG9rZW4tdHlwZSI6ImFub24iLCJ4LXRyaXBsaXQtcHJvamVjdC1pZCI6ImxvY2FsLXByb2plY3QtaWQifQ.JzN7Erur8Y-MlFdCaZtovQwxN_m_fSyOIWNzYQ3uVcc';
const TRIPLIT_SERVER_URL = 'http://localhost:6543';

const triplit = new TriplitClient({
	schema,
	roles,
	/** Anonymous token. */
	token: TRIPLIT_ANON_TOKEN,
	serverUrl: TRIPLIT_SERVER_URL,
	autoConnect: browser,
	refreshOptions: {
		refreshHandler: async () => {
			const token = await userRefresh.mutation();
			if (token) {
				return token;
			} else {
				throw new Error('Failed to refresh access token.');
			}
		}
	}
	/**
	 onSessionError: () => {
		const refreshedToken = auth.refreshAccess();
		
		if (refreshedToken) {
			triplit.updateSessionToken(refreshedToken);
		} else {
			triplit.endSession();
		triplit.clear();
		auth.removeAccess();
	}
}
*/
});
export default triplit;
