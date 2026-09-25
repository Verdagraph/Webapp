import {
	AppError,
	type UserLoginCommand,
	UserLoginCommandSchema
} from '@vdg-webapp/models';

import { userLoginOp, userRefreshOp } from '$codegen';
import axiosClient from '$data/customAxios';
import accessToken from '$state/accessToken.svelte';
import auth from '$state/auth.svelte';

/**
 * Sends an authentication request to the backend.
 */
export const userLogin = {
	schema: UserLoginCommandSchema,
	mutation: async function (data: UserLoginCommand) {
		/** Don't allow re-logging in. */
		if (auth.isAuthenticated) {
			throw new AppError('Already logged in.', {
				nonFormErrors: ['Already logged in.']
			});
		}

		const token = await userLoginOp(data);
		accessToken.set(token);
		auth.updateAuth();

		return token;
	}
};

/**
 * Sends an authentication refresh request to the backend.
 */
export const userRefresh = {
	mutation: async function () {
		const token = await userRefreshOp();
		accessToken.set(token);
		auth.updateAuth();
		return token;
	}
};

/**
 * Clears the client's access token.
 */
export const userLogout = {
	mutation: async function () {
		/** Don't allow re-logging out. */
		if (!auth.isAuthenticated) {
			return;
		}

		accessToken.clear();
		auth.updateAuth();
	}
};

/**
 * Fetches this session's username from the server, for self-provisioning
 * this browser's Jazz public profile row on first Jazz login (see
 * packages/ui/src/state/application/commandsController.svelte.ts).
 */
export const fetchUsername = async (): Promise<string> => {
	const me = await axiosClient<{ username: string }>({
		url: '/users/me',
		method: 'GET'
	});
	return me.username;
};
