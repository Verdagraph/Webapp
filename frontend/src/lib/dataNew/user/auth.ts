import { z as zod } from 'zod';
import { useMutation } from '@sveltestack/svelte-query';
import { userLoginOp } from '$codegenNew';
import { UserLoginCommand } from '@vdt-webapp/common';

/**
 * Sends an authentication request to the backend.
 */
export const userLogin = {
	schema: UserLoginCommand,
	mutation: userLoginOp
};
