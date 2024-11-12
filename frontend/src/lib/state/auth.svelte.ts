import { localStore } from './localStore.svelte';
import { userRefreshOp } from '$codegenNew';
import { ACCESS_TOKEN_EXPIRY_S } from '@vdt-webapp/common/src/settings';
import triplit from '$dataNew/triplit';

/**
 * The number of seconds before the access token expires
 * to request a new access token.
 */
const REFRESH_EXPIRY_WINDOW_S = 20;
const REFRESH_SCHEDULE_S = ACCESS_TOKEN_EXPIRY_S - REFRESH_EXPIRY_WINDOW_S;
if (REFRESH_SCHEDULE_S < 0) {
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

	/**
	 * Contains the task IDs returned from the
	 * setTimeout() function, so that they may
	 * be cancelled.
	 */
	scheduledRefreshTask: ReturnType<typeof setTimeout> | null;
};

/**
 * Creates a managed persisted and non-persisted rune which controls auth state.
 * Used as a singleton initialized in this module.
 * @returns Auth context manager.
 */
export function createAuthContext() {
	let persistedAuthState = localStore<PersistedAuthState>('auth', {
		token: null,
		expiresAt: null
	});
	let temporaryAuthState = $state<TemporaryAuthState>({
		authPriorityTaskFlag: false,
		retriedRefreshFlag: false,
		scheduledRefreshTask: null
	});

	/**
	 * Sets the authentication context given a received access token.
	 * @param token The access token to set.
	 */
	function setAccess(token: string) {
		persistedAuthState.value.token = token;
		temporaryAuthState.retriedRefreshFlag = false;

		/** Also update the Triplit token. */
		triplit.updateToken(token);

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
	 * Schedules a refresh of the access token.
	 * @param timeoutMs The length of time to wait before
	 * refreshing the access token in miliseconds.
	 */
	function scheduleRefreshTask(timeoutMs: number) {
		/** Clear the existing task. */
		if (temporaryAuthState.scheduledRefreshTask) {
			clearTimeout(temporaryAuthState.scheduledRefreshTask);
		}

		/** Set the new task. */
		const taskId = setTimeout(() => {
			refreshAccess();
		}, timeoutMs);
		temporaryAuthState.scheduledRefreshTask = taskId;
	}

	/**
	 * Calls the access refresh endpoint.
	 */
	function refreshAccess() {
		temporaryAuthState.authPriorityTaskFlag = true;

		/** Call the endpoint. */
		userRefreshOp()
			.then((accessToken) => {
				/** Update the access token if it exists. */
				if (accessToken) {
					setAccess(accessToken);
					scheduleRefreshTask(REFRESH_SCHEDULE_S * 1000);
				} else {
					removeAccess();
				}
			})
			.catch(() => {
				removeAccess();
			});

		temporaryAuthState.authPriorityTaskFlag = false;
	}

	/**
	 * Initializes the auth context given the persisted context.
	 */
	function initialize() {
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

		/** If the current credentials have not expired, schedule a refresh task. */
		scheduleRefreshTask(expiresInMs - REFRESH_EXPIRY_WINDOW_S * 1000);
	}

	/** Initialize the auth context. */
	initialize();

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
const auth = createAuthContext();
export default auth;
