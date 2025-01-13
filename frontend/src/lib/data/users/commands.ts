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
} from '$codegen';

/**
 * Sends an user creation request to the backend.
 */
export const userCreate = {
	schema: UserCreateCommand,
	mutation: userCreateOp
};

/**
 * Sends an email verification request to the backend.
 */
export const userRequestEmailConfirmation = {
	schema: UserRequestEmailConfirmationCommand,
	mutation: userRequestEmailConfirmationOp
};

/**
 * Sends an email verification confirmation to the backend.
 */
export const userConfirmEmailConfirmation = {
	schema: UserConfirmEmailConfirmationCommand,
	mutation: userConfirmEmailOp
};

/**
 * Sends a password reset request to the backend.
 */
export const userRequestPasswordReset = {
	schema: UserRequestPasswordResetCommand,
	mutation: userRequestPasswordResetOp
};

/**
 * Sends a password reset confirmation to the backend.
 */
export const userConfirmPasswordReset = {
	schema: UserConfirmPasswordResetCommand,
	mutation: userConfirmPasswordResetOp
};
