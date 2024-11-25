import { TriplitClient } from '@triplit/client';
import { browser } from '$app/environment';
import { schema } from '@vdt-webapp/common';
import auth from '$state/auth.svelte';

const triplit = new TriplitClient({
	schema: schema,
	serverUrl: '',
	autoConnect: browser,
	refreshOptions: {
		refreshHandler: async () => {
			const token = await auth.refreshAccess();
			if (token) {
				return token;
			} else {
				return '';
			}
		}
	},
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
});
export default triplit;
