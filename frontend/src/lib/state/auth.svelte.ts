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
	let token = localStore<string | null>('auth', null);
	let isAuthenticated = $derived(token.value != null)
	/** If an auth error is received, and this flag is set to false, a refresh will be attempted. */
	let retriedRefreshFlag = $state<boolean>(false)

	/**
	 * Calls the login endpoint and updates auth state with the provided token.
	 * @param data The email and password information.
	 * @returns The token if auth was successful.
	 */
	async function login(data: UserLoginOpBody): Promise< string > {
		/** Don't allow re-logging in. */
		if (token.value != null) {
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
			} catch (error) {
				console.log('herhere')
				console.log(error)
				triplit.updateSessionToken(token.value);
			}

			/** 
			 * Fetch the client - this has the side effect of populating the 
			 * Triplit global variables of client and profile ID. 
			 */
			await getClient()

			return newToken

		} catch (error) {
			console.log('is is this one????')
			token.value = null
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
			token.value = newToken
			return newToken

		} catch (error) {
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

		/** If no access token is present, attempt a refresh. */
		if (token.value == null) {
			await refresh()
		}

		/** If a access token is present, try to add it to the session. */
		if (token.value != null) {
		try {
			console.log('hererer')
			await triplit.startSession(token.value);
			console.log('hererer2')
			/** 
			 * Fetch the client - this has the side effect of populating the 
			 * Triplit global variables of client and profile ID. 
			 */
			//await getClient()
			const account = await triplit.fetchOne(
				triplit
					.query('accounts')
					.where([['id', '=', '$role.userId']])
					.include('profile')
					.build()
			);
			console.log(account)
		} catch (error) {
			if (error instanceof SessionAlreadyActiveError) {
				triplit.updateSessionToken(token.value);
			}
		}
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
await auth.initialize()
export default auth;
