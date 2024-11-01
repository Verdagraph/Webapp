import z from 'zod';

/** Field specifications. */
export const userFields = {
	username: z
		.string()
		.min(3, 'Must be at least 3 characters.')
		.max(50, 'May be at most 50 characters.')
		.regex(
			/^[a-zA-Z0-9_]*$/,
			'Must contain only alphanumeric characters and underscores.'
		)
		.describe(
			'Must be between 3 and 50 characters long and contain only alphanumeric characters and underscores. Must be unique.'
		),
	email: z
		.string()
		.email('Must be a valid email address.')
		.describe('Must be a valid email address.'),
	password: z
		.string()
		.min(6, 'Must be at least 6 characters.')
		.max(255, 'Must be at most 255 characters.')
		.regex(
			/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/,
			'Must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'
		)
		.describe(
			'Must be between 6 and 255 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'
		)
};

/**
 * Command to authenticate a user.
 */
export const UserLoginCommand = z.object({
	email: userFields.email,
	password: userFields.password
});

/**
 * Command to register a new user.
 */
export const UserCreateCommand = z
	.object({
		email: userFields.email,
		password1: userFields.password,
		password2: userFields.password,
		username: userFields.username
	})
	.refine((data) => data.password1 == data.password2, {
		message: 'Passwords must match',
		path: ['password2']
	});

/**
 * Command to update a user.
 */
export const UserUpdateCommand = z
	.object({
		newEmail: userFields.email.optional(),
		newPassword1: userFields.password.optional(),
		newPassword2: userFields.password.optional(),
		newUsername: userFields.username.optional(),
		password: userFields.password
	})
	.refine((data) => data.newPassword1 == data.newPassword2, {
		message: 'Passwords must match',
		path: ['newPassword2']
	});

/**
 * Command to request a verification email be sent.
 */
export const UserRequestEmailConfirmationCommand = z.object({
	email: userFields.email
});

/**
 * Command to respond to a verification email.
 */
export const UserConfirmEmailConfirmationCommand = z.object({
	token: z.string()
});

/**
 * Command to request a password reset email be sent.
 */
export const UserRequestPasswordResetCommand = z.object({
	email: userFields.email
});

/**
 * Command to respont to a password reset email.
 */
export const UserConfirmPasswordResetCommand = z
	.object({
		userId: z.string().nanoid(),
		token: z.string(),
		password1: userFields.password,
		password2: userFields.password
	})
	.refine((data) => data.password1 == data.password2, {
		message: 'Passwords must match',
		path: ['password2']
	});
