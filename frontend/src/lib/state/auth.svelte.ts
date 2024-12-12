/**
 * Stores whether the user is authenticated, not considering Triplit's state.
 */
let _isAuthenticated: boolean = $state(false);

/* Exported state methods. */
export const auth = {
	/* Getter. */
	get isAuthenticated(): boolean {
		return _isAuthenticated;
	},

	/* Setter. */
	set isAuthenticated(newVal: boolean) {
		_isAuthenticated = newVal;
	}
};
export default auth;
