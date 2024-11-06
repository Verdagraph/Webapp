import { z as zod } from 'zod';
import { useMutation } from '@sveltestack/svelte-query';
import type { UserLoginOpBody } from '$codegen/types';
import { userLoginCommandOp } from '$codegen';
import { userFieldSchemas } from './schemas';

/**
 * Sends an authentication request to the backend.
 */
export const userLogin = {
	schema: zod.object({
		email_address: userFieldSchemas.email,
		password: userFieldSchemas.password
	}),
	mutation: () => {
		return useMutation(function (data: UserLoginOpBody) {
			return userLoginCommandOp(data);
		});
	}
};
