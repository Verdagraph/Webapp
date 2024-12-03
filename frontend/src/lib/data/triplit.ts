import { TriplitClient } from '@triplit/client';
import { browser } from '$app/environment';
import { schema } from '@vdt-webapp/common';
import auth from '$state/auth.svelte';

const anonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdG9rZW4tdHlwZSI6ImFub24iLCJ4LXRyaXBsaXQtcHJvamVjdC1pZCI6ImxvY2FsLXByb2plY3QtaWQifQ.JzN7Erur8Y-MlFdCaZtovQwxN_m_fSyOIWNzYQ3uVcc'
const serverUrl = 'http://localhost:6543'

const triplit = new TriplitClient({
	schema: schema,
	/** Anonymous token. */
	token: anonToken,
	serverUrl: serverUrl,
	autoConnect: browser,
	variables: {
		clientProfileId: ''
	},
	refreshOptions: {
		refreshHandler: async () => {
			const token = await auth.refresh();
			if (token) {
				return token;
			} else {
				return anonToken;
			}
		}
	},
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
