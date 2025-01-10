import triplit, { TRIPLIT_ANON_TOKEN } from '$data/triplit';

/**
 * The user is authenticated if the token registered in triplit
 * is defined and not equal to the anonymous token.
 */
let _isAuthenticated: boolean = $state(false);

function updateAuth() {
	if (!triplit.token || triplit.token === TRIPLIT_ANON_TOKEN) {
		_isAuthenticated = false;
	} else {
		_isAuthenticated = true;
	}
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
