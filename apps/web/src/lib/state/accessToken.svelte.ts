/**
 * Holds the current access token in memory, replacing what used to be
 * read off Triplit's own session object (`triplit.token`) - both the REST
 * API client and Jazz's auth need this same token, independent of any
 * particular data-layer client.
 */
let _token: string | null = $state(null);

function set(token: string) {
	_token = token;
}

function clear() {
	_token = null;
}

export const accessToken = {
	get current() {
		return _token;
	},
	set,
	clear
};
export default accessToken;
