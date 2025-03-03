import { type } from 'arktype';

/** Field specifications. */
export const userFields = {
	username: type('string.trim & /^[a-zA-Z0-9_-]*$/')
		.to('3 <= string <= 50')
		.describe(
			'between 3 and 50 characters, contain only letters, numbers, underscores, or hyphens, and be unique.'
		)
		.configure({ details: 'Public username for account identification.' }),
	email: type('string.email').describe('a valid email address.'),
	password: type('6 <= string <= 255').describe('between 6 and 255 characters long.')
};

/**
 * Command to authenticate a user.
 */
export const UserLoginCommandSchema = type({
	email: userFields.email,
	password: type('string')
});
export type UserLoginCommand = typeof UserLoginCommandSchema.infer;

/**
 * Command to register a new user.
 */
export const UserCreateCommandSchema = type({
	email: userFields.email,
	username: userFields.username,
	password: userFields.password,
	confirmPassword: userFields.password
}).narrow((data, ctx) => {
	if (data.password === data.confirmPassword) {
		return true;
	}
	return ctx.reject({
		expected: 'identical to password.',
		actual: '',
		path: ['confirmPassword']
	});
});
export type UserCreateCommand = typeof UserCreateCommandSchema.infer;

/**
 * Command to update a new user.
 */
export const UserUpdateCommandSchema = type({
	'newEmail?': userFields.email,
	'newUsername?': userFields.username,
	'newPassword?': userFields.password,
	'confirmNewPassword?': userFields.password,
	password: userFields.password
}).narrow((data, ctx) => {
	if (data.newPassword === data.confirmNewPassword) {
		return true;
	}
	return ctx.reject({
		expected: 'identical to password.',
		actual: '',
		path: ['confirmNewPassword']
	});
});
export type UserUpdateCommand = typeof UserUpdateCommandSchema.infer;

/**
 * Command to request a verification email be sent.
 */
export const UserRequestEmailConfirmationCommandSchema = type({
	email: userFields.email
});
export type UserRequestEmailConfirmationCommand =
	typeof UserRequestEmailConfirmationCommandSchema.infer;

/**
 * Command to respond to a verification email.
 */
export const UserConfirmEmailConfirmationCommandSchema = type({
	token: 'string'
});
export type UserConfirmEmailConfirmationCommand =
	typeof UserConfirmEmailConfirmationCommandSchema.infer;

/**
 * Command to request a password reset email be sent.
 */
export const UserRequestPasswordResetCommandSchema = type({
	email: userFields.email
});
export type UserRequestPasswordResetCommand =
	typeof UserRequestPasswordResetCommandSchema.infer;

/**
 * Command to respont to a password reset email.
 */
export const UserConfirmPasswordResetCommandSchema = type({
	userId: 'string',
	token: 'string',
	password: userFields.password,
	confirmPassword: userFields.password
}).narrow((data, ctx) => {
	if (data.password === data.confirmPassword) {
		return true;
	}
	return ctx.reject({
		expected: 'identical to password.',
		actual: '',
		path: ['confirmPassword']
	});
});
export type UserConfirmPasswordResetCommand =
	typeof UserConfirmPasswordResetCommandSchema.infer;
