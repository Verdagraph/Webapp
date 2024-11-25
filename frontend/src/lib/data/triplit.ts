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
			await auth.refreshAccess()
			return auth.token
		}
	},
	onSessionError: (type) => {
		await auth.refreshAccess()
		if (auth.token) {
			triplit.updateSessionToken(auth.token)
		} else {
			triplit.endSession();
			triplit.clear();
			auth.removeAccess()
		}
	}
});
export default triplit;
