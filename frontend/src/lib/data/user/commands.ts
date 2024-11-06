import { z as zod } from 'zod';
import { useMutation } from '@sveltestack/svelte-query';
import type {
	UserCreateCommand,
	UserConfirmEmailConfirmationCommand,
	UserRequestEmailConfirmationCommand,
	UserRequestPasswordResetCommand,
	UserConfirmPasswordResetCommand
} from '$codegen/types';
import {
	userCreateCommandOp,
	userConfirmEmailConfirmationCommandOp,
	userRequestEmailConfirmationCommandOp,
	userConfirmPasswordResetCommandOp,
	userRequestPasswordResetCommandOp
} from '$codegen';

/**
 * Sends an user creation request to the backend.
 */
export const userCreate = {
	mutation: () => {
		return useMutation(function (data: UserCreateCommand) {
			return userCreateCommandOp(data);
		});
	}
};

/**
 * Sends an email verification request to the backend.
 */
export const userRequestEmailConfirmation = {
	mutation: () => {
		return useMutation(function (data: UserRequestEmailConfirmationCommand) {
			return userRequestEmailConfirmationCommandOp(data);
		});
	}
};

/**
 * Sends an email verification confirmation to the backend.
 */
export const userConfirmEmailConfirmation = {
	mutation: () => {
		return useMutation(function (data: UserConfirmEmailConfirmationCommand) {
			return userConfirmEmailCommandOp(data);
		});
	}
};

/**
 * Sends a password reset request to the backend.
 */
export const userRequestPasswordReset = {
	mutation: () => {
		return useMutation(function (data: UserRequestPasswordResetCommand) {
			return userRequestPasswordResetCommandOp(data);
		});
	}
};

/**
 * Sends a password reset confirmation to the backend.
 */
export const userConfirmPasswordReset = {
	mutation: () => {
		return useMutation(function (data: UserConfirmPasswordResetCommand) {
			return userConfirmPasswordResetCommandOp(data);
		});
	}
};
