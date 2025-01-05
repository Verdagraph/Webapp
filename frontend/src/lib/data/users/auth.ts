import { userLoginOp, UserLoginOpBody, userRefreshOp } from '$codegen';
import triplit from '$data/triplit';
import { UserAccount, UserProfile } from '@vdt-webapp/common';
import { AppError } from '@vdt-webapp/common/src/errors';
import { UserLoginCommand } from '@vdt-webapp/common';
import auth from '$state/auth.svelte';
import { z } from 'zod';

const TRIPLIT_ANON_TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdG9rZW4tdHlwZSI6ImFub24iLCJ4LXRyaXBsaXQtcHJvamVjdC1pZCI6ImxvY2FsLXByb2plY3QtaWQifQ.JzN7Erur8Y-MlFdCaZtovQwxN_m_fSyOIWNzYQ3uVcc';

/**
 * Sends an authentication request to the backend.
 */
export const userLogin = {
	schema: UserLoginCommand,
	mutation: async function (data: z.infer<typeof UserLoginCommand>) {
		/** Don't allow re-logging in. */
		if (triplit.token != null && triplit.token != TRIPLIT_ANON_TOKEN) {
			return;
		}

		/** Fetch the token. */
		const token = await userLoginOp(data);

		/** Start the Triplit session. */

		/** TODO: Resolve an error where a session is started already regardless... */
		await triplit.endSession();
		console.log(token);
		await triplit.startSession(token);
		auth.isAuthenticated = true;
	}
};

/**
 * Sends an authentication refresh request to the backend
 */
export const userRefresh = {
	mutation: async function () {
		const token = await userRefreshOp();
		auth.isAuthenticated = true;
		return token;
	}
};

/**
 * Ends the triplit session.
 */
export const userLogout = {
	mutation: async function () {
		/** Don't allow re-logging out. */
		if (triplit.token == null || triplit.token == TRIPLIT_ANON_TOKEN) {
			return;
		}

		await triplit.endSession();
		auth.isAuthenticated = false;
	}
};

/**
 * Fetches the client's Account and Profile objects.
 * If unauthenticated, null is returned.
 * @returns The client if it was found, else null.
 */
export const getClient = async (): Promise<{
	account: UserAccount;
	profile: UserProfile;
} | null> => {
	if (!auth.isAuthenticated) {
		return null;
	}

	const account = await triplit.fetchOne(
		triplit
			.query('accounts')
			.where([['id', '=', '$role.accountId']])
			.include('profile')
			.build()
	);
	if (!account || !account.profile) {
		return null;
	}

	return { account, profile: account.profile };
};

/**
 * Fetches the client's Account and Profile objects.
 * If the client fails to authenticate, an access refresh is attempted.
 * If this fails, an AppError is raised.
 * @returns The client.
 */
export const getClientOrError = async (): Promise<{
	account: UserAccount;
	profile: UserProfile;
}> => {
	/** Return the client if authenticated. */
	const client = await getClient();
	if (client) {
		return client;
	}

	throw new AppError('Authentication failed.', {
		nonFormErrors: ['Authentication failed. A login is required.']
	});
};
