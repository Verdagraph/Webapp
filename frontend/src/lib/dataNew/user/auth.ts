import { QueryResult } from '@triplit/client';
import { userLoginOp } from '$codegenNew';
import triplit from '$dataNew/triplit';
import { UserAccount, UserProfile, schema } from '@vdt-webapp/common';
import { AppError } from '@vdt-webapp/common/src/errors';
import { UserLoginCommand } from '@vdt-webapp/common';
import auth from '$state/auth.svelte';
import { goto } from '$app/navigation';

/**
 * Sends an authentication request to the backend.
 */
export const userLogin = {
	schema: UserLoginCommand,
	mutation: userLoginOp
};

/**
 * Fetches the client's Account and Profile objects.
 * If unauthenticated, null is returned.
 * @returns The client if it was found, else null.
 */
const getClient = async (): Promise<{
	account: UserAccount;
	profile: UserProfile;
} | null> => {
	if (!auth.isAuthenticated) {
		return null;
	}

	const account = await triplit.fetchOne(
		triplit
			.query('accounts')
			.where([['id', '=', '$role.userId']])
			.include('profile')
			.build()
	);
	if (!account || !account.profile) {
		return null;
	}

	return { account: account, profile: account.profile };
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
	let client = await getClient();
	if (client) {
		return client;
	}

	/** If a refresh has already been attempted, prompt a login. */
	if (auth.retriedRefreshFlag) {
		auth.removeAccess();
		goto('login');
		throw new AppError('Authentication failed.', {
			nonFormErrors: ['Authentication failed. A login is required.']
		});
	}

	/** Attempt a refresh. */
	auth.retriedRefreshFlag = true;
	auth.refreshAccess();

	/** Attempt to retrieve the client again. */
	client = await getClient();
	if (client) {
		return client;
	} else {
		auth.removeAccess();
		goto('login');
		throw new AppError('Authentication failed.', {
			nonFormErrors: ['Authentication failed. A login is required.']
		});
	}
};
