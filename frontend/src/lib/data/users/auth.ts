import triplit from '$data/triplit';
import { userLoginOp, userRefreshOp } from '$codegen';
import { type User, AppError, type UserLoginCommand, UserLoginCommandSchema } from '@vdt-webapp/common';
import auth from '$state/auth.svelte';

const TRIPLIT_ANON_TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdG9rZW4tdHlwZSI6ImFub24iLCJ4LXRyaXBsaXQtcHJvamVjdC1pZCI6ImxvY2FsLXByb2plY3QtaWQifQ.JzN7Erur8Y-MlFdCaZtovQwxN_m_fSyOIWNzYQ3uVcc';

/**
 * Sends an authentication request to the backend.
 */
export const userLogin = {
	schema: UserLoginCommandSchema,
	mutation: async function (data: UserLoginCommand) {
		/** Don't allow re-logging in. */
		if (triplit.token != null && triplit.token != TRIPLIT_ANON_TOKEN) {
			return;
		}

		/** Fetch the token. */
		const token = await userLoginOp(data);

		/** End the anonymous session. */
		await triplit.endSession();

		/** Start the Triplit session. */
		await triplit.startSession(token);
		auth.updateAuth();

		return token;
	}
};

/**
 * Sends an authentication refresh request to the backend
 */
export const userRefresh = {
	mutation: async function () {
		const token = await userRefreshOp();
		auth.updateAuth();
		return token;
	}
};

/**
 * Ends the triplit session.
 */
export const userLogout = {
	mutation: async function () {
		/** Don't allow re-logging out. */
		if (!auth.isAuthenticated) {
			return;
		}

		await triplit.endSession();
		auth.updateAuth();
	}
};

/**
 * Fetches the client's Account and Profile objects.
 * If anonymous, null is returned.
 * @returns The client if it was found, else null.
 */
export const getClient = async (): Promise<User| null> => {
	if (!auth.isAuthenticated) {
		return null;
	}

	const account = await triplit.fetchOne(
		triplit.query('accounts').Id('$session.accountId').Include('profile')
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
export const getClientOrError = async (): Promise<User> => {
	/** Return the client if authenticated. */
	const client = await getClient();
	if (client) {
		return client;
	}

	throw new AppError('Authentication failed.', {
		nonFormErrors: ['Authentication failed. A login is required.']
	});
};
