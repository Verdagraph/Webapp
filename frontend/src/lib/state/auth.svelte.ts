import { localStore } from './localStore.svelte';
import { userRefreshOp } from '$codegen';
import { ACCESS_TOKEN_EXPIRY_S } from '@vdt-webapp/common/src/settings';
import triplit from '$data/triplit';
import { getClient } from '$data/user/auth';

/**
 * The number of seconds before the access token expires
 * to request a new access token.
 */
const REFRESH_EXPIRY_WINDOW_S = 20;
export const REFRESH_SCHEDULE_MS =
	(ACCESS_TOKEN_EXPIRY_S - REFRESH_EXPIRY_WINDOW_S) * 1000;
if (REFRESH_SCHEDULE_MS < 0) {
	throw Error('Invalid access expiry time or refresh configuration.');
}

/**
 * Authentication information that is persisted across reloads via local storage.
 */
type PersistedAuthState = {
	/**
	 * The current access token.
	 */
	token: string | null;

	/**
	 * The date and time at which the access expires.
	 */
	expiresAt: Date | null;
};

/**
 * Authentication information which may be deleted across reloads.
 */
type TemporaryAuthState = {
	/**
	 * Set to true if any authentication related
	 * mutations are underway.
	 * Used to disable queries so they don't use
	 * old credentials.
	 */
	authPriorityTaskFlag: boolean;

	/**
	 * On a received 401 return code, a
	 * token refresh is attempted.
	 * If it fails, this flag is set to true
	 * and a login should be required.
	 */
	retriedRefreshFlag: boolean;
};

/**
 * Creates a managed persisted and non-persisted rune which controls auth state.
 * Used as a singleton initialized in this module.
 * @returns Auth context manager.
 */
export async function createAuthContext() {
	let persistedAuthState = localStore<PersistedAuthState>('auth', {
		token: null,
		expiresAt: null
	});
	let temporaryAuthState = $state<TemporaryAuthState>({
		authPriorityTaskFlag: false,
		retriedRefreshFlag: false
	});

	/**
	 * Sets the authentication context given a received access token.
	 * @param token The access token to set.
	 */
	function setAccess(token: string) {
		persistedAuthState.value.token = token;
		temporaryAuthState.retriedRefreshFlag = false;

		/** Fetch the client - this has the side effect of populating Triplit's global variables. */
		getClient().then();

		/** Calculate the time of expiry by adding the expiry duration to the current time. */
		const now = Date.now();
		persistedAuthState.value.expiresAt = new Date(now + ACCESS_TOKEN_EXPIRY_S * 1000);
	}

	/**
	 * De-authenticates the auth context.
	 */
	function removeAccess() {
		persistedAuthState.value.token = null;
		persistedAuthState.value.expiresAt = null;
	}

	/**
	 * Calls the access refresh endpoint.
	 * @returns The new access token, if successful.
	 */
	function refreshAccess(): string | null {
		temporaryAuthState.authPriorityTaskFlag = true;

		/** Call the endpoint. */
		userRefreshOp()
			.then((accessToken) => {
				/** Update the access token if it exists. */
				if (accessToken) {
					setAccess(accessToken);
				} else {
					removeAccess();
				}
			})
			.catch(() => {
				removeAccess();
			});

		temporaryAuthState.authPriorityTaskFlag = false;
		return persistedAuthState.value.token;
	}

	/**
	 * Initializes the auth context given the persisted context.
	 */
	async function initialize() {
		/** If no credentials exist, attempt a refresh. */
		if (!persistedAuthState.value.token || !persistedAuthState.value.expiresAt) {
			refreshAccess();
			return;
		}

		/** If the current credentials have expired, attempt a refresh. */
		const now = Date.now();
		const expiresInMs = Math.abs(persistedAuthState.value.expiresAt.getTime() - now);
		if (expiresInMs < REFRESH_EXPIRY_WINDOW_S * 1000) {
			refreshAccess();
			return;
		}

		/** Add the token to Triplit. */
		await triplit.startSession(persistedAuthState.value.token);

		/** Fetch the client - this has the side effect of populating Triplit's global variables. */
		getClient().then();
	}

	/** Initialize the auth context. */
	await initialize();

	return {
		get token() {
			return persistedAuthState.value.token;
		},
		get retriedRefreshFlag() {
			return temporaryAuthState.retriedRefreshFlag;
		},
		set retriedRefreshFlag(flag: boolean) {
			temporaryAuthState.retriedRefreshFlag = flag;
		},
		get isAuthenticated() {
			return !!persistedAuthState.value.token;
		},
		setAccess,
		removeAccess,
		refreshAccess
	};
}
const auth = await createAuthContext();
export default auth;
