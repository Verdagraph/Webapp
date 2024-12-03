import { localStore } from './localStore.svelte';
import { userRefreshOp } from '$codegen';
import triplit from '$data/triplit';
import { getClient } from '$data/user/auth';
import { SessionAlreadyActiveError, NoActiveSessionError, TokenExpiredError } from '@triplit/client';
import { userLogin } from '$data/user/auth';
import type {UserLoginOpBody} from '$codegen'

/**
 * Creates a managed persisted rune which controls auth state.
 * Used as a singleton initialized in this module.
 * @returns Auth context manager.
 */
export async function createAuthContext() {
	/** The current access token. */
	let token = localStore<string | null>('auth', null);
	let isAuthenticated = $derived(token.value != null)
	/** If an auth error is received, and this flag is set to false, a refresh will be attempted. */
	let retriedRefreshFlag = $state<boolean>(false)

	/**
	 * Calls the login endpoint and updates auth state with the provided token.
	 * @param data The email and password information.
	 * @returns The token if auth was successful, otherwise null.
	 */
	async function login(data: UserLoginOpBody): Promise< string | null> {
		/** Don't allow re-logging in. */
		if (isAuthenticated) {
			return token.value
		}

		try {

			/** Fetch the token. */
			const newToken = await userLogin.mutation(data)
			token.value = newToken
			retriedRefreshFlag = false

			/** Start the Triplit session, or update the existing one. */
			try {
				await triplit.startSession(token.value);
			} catch {SessionAlreadyActiveError} {
				triplit.updateSessionToken(token.value);
			}

			/** 
			 * Fetch the client - this has the side effect of populating the 
			 * Triplit global variables of client and profile ID. 
			 */
			await getClient()

			return newToken

		} catch  {
			token.value = null
			return null
		}
	}

	/**
	 * Callss the refresh endpoint and updates auth state with the provided token.
	 * @returns The token if auth was successful, otherwise null.
	 */
	async function refresh(): Promise<string | null> {

		try {
			/** Fetch the token. */
			const newToken = await userRefreshOp()
			token.value = newToken

			/** Update the Triplit session, or state a new one. */
			try {
				triplit.updateSessionToken(token.value);
			} catch {NoActiveSessionError} {
				await triplit.startSession(token.value);
			}

			/** 
			 * Fetch the client - this has the side effect of populating the 
			 * Triplit global variables of client and profile ID. 
			 */
			await getClient()

			return newToken

		} catch {
			token.value = null
			retriedRefreshFlag = true
			return null
		}
	}

	/**
	 * Ends the triplit session.
	 */
	async function logout() {
		/** Don't allow re-logging out. */
		if (!isAuthenticated) {
			return
		}

		token.value = null
		await triplit.endSession()
	}

	/**
	 * Initialize the auth context.
	 */
	async function initialize() {

		/** If a access token is present, try to add it to the session. */
		if (!!token.value) {
			try {
				try {
					await triplit.startSession(token.value);
				} catch {SessionAlreadyActiveError} {
					triplit.updateSessionToken(token.value);
				}

			/** If the token is expired, attempt a refresh. */
			} catch {TokenExpiredError} {
				await refresh()
			}

		/** If no access token is present, attempt a refresh. */
		} else {
			await refresh()
		}
	}

	return {
		get token() {
			return token.value;
		},
		get isAuthenticated() {
			return isAuthenticated;
		},
		get retriedRefreshFlag() {
			return retriedRefreshFlag
		},
		initialize,
		login,
		refresh,
		logout
	};
}
const auth = await createAuthContext();
export default auth;
