import { localStore } from './localStore.svelte';
import { userRefreshOp } from '$codegen';
import triplit from '$data/triplit';
import { getClient } from '$data/user/auth';
import { SessionAlreadyActiveError, NoActiveSessionError, TokenExpiredError } from '@triplit/client';
import { userLogin } from '$data/user/auth';
import type {UserLoginOpBody} from '$codegen'
import { AppError } from '@vdt-webapp/common/src/errors';

/**
 * Creates a managed persisted rune which controls auth state.
 * Used as a singleton initialized in this module.
 * @returns Auth context manager.
 */
export async function createAuthContext() {
	/** The current access token. */
	let token = $state<string | null>(null);
	let isAuthenticated = $derived(token != null)
	/** If an auth error is received, and this flag is set to false, a refresh will be attempted. */
	let retriedRefreshFlag = $state<boolean>(false)

	/**
	 * Calls the login endpoint and updates auth state with the provided token.
	 * @param data The email and password information.
	 * @returns The token if auth was successful.
	 */
	async function login(data: UserLoginOpBody): Promise< string > {
		/** Don't allow re-logging in. */
		if (token != null) {
			return token
		}

		try {

			/** Fetch the token. */
			const newToken = await userLogin.mutation(data)
			token = newToken
			retriedRefreshFlag = false

			/** Start the Triplit session. */
			await triplit.startSession(token);

			return newToken

		} catch (error) {
			token = null
			throw error
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
			token = newToken
			return newToken

		} catch (error) {
			token = null
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

		token = null
		await triplit.endSession()
	}

	return {
		get token() {
			return token;
		},
		get isAuthenticated() {
			return isAuthenticated;
		},
		get retriedRefreshFlag() {
			return retriedRefreshFlag
		},
		login,
		refresh,
		logout
	};
}
const auth = await createAuthContext();
export default auth;
