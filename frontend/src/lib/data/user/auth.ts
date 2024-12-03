import { userLoginOp } from '$codegen';
import triplit from '$data/triplit';
import { UserAccount, UserProfile } from '@vdt-webapp/common';
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
			.where([['id', '=', '$role.userId']])
			.include('profile')
			.build()
	);
	if (!account || !account.profile) {
		return null;
	}

	setClientGlobalVariables(account.id, account.profile.id, account.profile.username);
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

/**
 * Sets some global database variables for conveinence in queries.
 * @param clientAccountId The ID of the client's account.
 * @param clientProfileId The ID of the client's profile.
 * @param clientUsername The username of the client's profile.
 */
export const setClientGlobalVariables = (
	clientAccountId: string,
	clientProfileId: string,
	clientUsername: string
) => {
	console.log(clientProfileId)
	triplit.db.updateGlobalVariables({
		clientAccountId,
		clientProfileId,
		clientUsername
	});
};
