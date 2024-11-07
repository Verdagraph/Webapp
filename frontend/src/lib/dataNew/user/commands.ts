import { z, z as zod } from 'zod';
import { useMutation } from '@sveltestack/svelte-query';
import {
	UserCreateCommand,
	UserConfirmEmailConfirmationCommand,
	UserRequestEmailConfirmationCommand,
	UserRequestPasswordResetCommand,
	UserConfirmPasswordResetCommand
} from '@vdt-webapp/common';
import {
	userCreateOp,
	userConfirmEmailOp,
	userRequestEmailConfirmationOp,
	userConfirmPasswordResetOp,
	userRequestPasswordResetOp
} from '$codegenNew';

/**
 * Sends an user creation request to the backend.
 */
export const userCreate = {
	schema: UserCreateCommand,
	mutation: () => {
		return useMutation(function (data: z.infer<typeof UserCreateCommand>) {
			return userCreateOp(data);
		});
	}
};

/**
 * Sends an email verification request to the backend.
 */
export const userRequestEmailConfirmation = {
	schema: UserRequestEmailConfirmationCommand,
	mutation: () => {
		return useMutation(function (
			data: z.infer<typeof UserRequestEmailConfirmationCommand>
		) {
			return userRequestEmailConfirmationOp(data);
		});
	}
};

/**
 * Sends an email verification confirmation to the backend.
 */
export const userConfirmEmailConfirmation = {
	schema: UserConfirmEmailConfirmationCommand,
	mutation: () => {
		return useMutation(function (
			data: z.infer<typeof UserConfirmEmailConfirmationCommand>
		) {
			return userConfirmEmailOp(data);
		});
	}
};

/**
 * Sends a password reset request to the backend.
 */
export const userRequestPasswordReset = {
	schema: UserRequestPasswordResetCommand,
	mutation: () => {
		return useMutation(function (
			data: z.infer<typeof UserRequestPasswordResetCommand>
		) {
			return userRequestPasswordResetOp(data);
		});
	}
};

/**
 * Sends a password reset confirmation to the backend.
 */
export const userConfirmPasswordReset = {
	schema: UserConfirmPasswordResetCommand,
	mutation: () => {
		return useMutation(function (
			data: z.infer<typeof UserConfirmPasswordResetCommand>
		) {
			return userConfirmPasswordResetOp(data);
		});
	}
};
