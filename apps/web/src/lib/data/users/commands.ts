import {
	UserCreateCommandSchema,
	UserConfirmEmailConfirmationCommandSchema,
	UserRequestEmailConfirmationCommandSchema,
	UserRequestPasswordResetCommandSchema,
	UserConfirmPasswordResetCommandSchema
} from '@vdg-webapp/models';
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
	schema: UserCreateCommandSchema,
	mutation: userCreateOp
};

/**
 * Sends an email verification request to the backend.
 */
export const userRequestEmailConfirmation = {
	schema: UserRequestEmailConfirmationCommandSchema,
	mutation: userRequestEmailConfirmationOp
};

/**
 * Sends an email verification confirmation to the backend.
 */
export const userConfirmEmailConfirmation = {
	schema: UserConfirmEmailConfirmationCommandSchema,
	mutation: userConfirmEmailOp
};

/**
 * Sends a password reset request to the backend.
 */
export const userRequestPasswordReset = {
	schema: UserRequestPasswordResetCommandSchema,
	mutation: userRequestPasswordResetOp
};

/**
 * Sends a password reset confirmation to the backend.
 */
export const userConfirmPasswordReset = {
	schema: UserConfirmPasswordResetCommandSchema,
	mutation: userConfirmPasswordResetOp
};
