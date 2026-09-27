import accessToken from './accessToken.svelte';

/**
 * The user is authenticated if an access token is currently held.
 */
let _isAuthenticated: boolean = $state(false);

function updateAuth() {
	_isAuthenticated = accessToken.current != null;
}

/* Exported state methods. */
export const auth = {
	/* Getter. */
	get isAuthenticated(): boolean {
		return _isAuthenticated;
	},
	updateAuth
};
export default auth;
