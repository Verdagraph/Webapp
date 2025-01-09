import triplit, { TRIPLIT_ANON_TOKEN } from '$data/triplit';

/**
 * The user is authenticated if the token registered in triplit
 * is defined and not equal to the anonymous token.
 */
let _isAuthenticated: boolean = $derived.by(() => {
	if (!triplit.token || triplit.token === TRIPLIT_ANON_TOKEN) {
		return false;
	} else {
		return true;
	}
});

/* Exported state methods. */
export const auth = {
	/* Getter. */
	get isAuthenticated(): boolean {
		return _isAuthenticated;
	}
};
export default auth;
