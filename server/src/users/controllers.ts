import { Hono } from 'hono';
import { type } from 'arktype';
import { resolver } from 'hono-openapi/arktype';
import { describeRoute } from 'hono-openapi';
import {
	UserLoginCommandSchema, UserLoginCommand,
	UserCreateCommandSchema,
	UserUpdateCommandSchema,
	UserRequestEmailConfirmationCommandSchema,
	UserConfirmEmailConfirmationCommandSchema,
	UserRequestPasswordResetCommandSchema,
	UserConfirmPasswordResetCommandSchema
} from '@vdt-webapp/common';
import * as commands from './commands';
import {
	setRefreshTokenCookie,
	getRefreshTokenCookie,
	setAccessTokenHeader
} from './auth/tokens';
import { requireAuth, fieldValidator } from 'plugins';

export const userRouter = new Hono().basePath('/users');

/** Login. */
userRouter.post(
	'/login',
	describeRoute({
		operationId: 'UserLoginOp',
		description:
			'Grants an access and refresh token on a correct username and password.',
		tags: ['user'],
		responses: {
			200: {
				description: 'The access token.',
				content: { 'application/json': { schema: resolver(type('string')) } }
			}
		},
	}),
	fieldValidator(UserLoginCommandSchema),
	async (ctx) => {
		const result = await commands.login(ctx.req.valid('json'), ctx.get('users'));
		await setRefreshTokenCookie(result.refreshToken, ctx);
		setAccessTokenHeader(result.accessToken, ctx);
		return ctx.text(result.accessToken, 200);
	}
);

/** Refresh. */
userRouter.post(
	'/refresh',
	describeRoute({
		operationId: 'UserRefreshOp',
		description: 'Grants an access and refresh token on a valid refresh token.',
		tags: ['user'],
		responses: {
			200: {
				description: 'The access token.',
				content: { 'application/json': { schema: resolver(type('string')) } }
			}
		}
	}),
	async (ctx) => {
		const refreshToken = await getRefreshTokenCookie(ctx);
		const result = await commands.refresh(refreshToken, ctx.get('users'));
		await setRefreshTokenCookie(result.refreshToken, ctx);
		setAccessTokenHeader(result.accessToken, ctx);
		return ctx.text(result.accessToken, 200);
	}
);

/** Create. */
userRouter.post(
	'/create',
	describeRoute({
		operationId: 'UserCreateOp',
		description: 'Creates a new user.',
		tags: ['user'],
		responses: {
			200: {
				description: 'Returned if the user is created successfully.',
				content: { 'text/plain': { schema: resolver(type('string')) } }
			}
		}
	}),
	fieldValidator(UserCreateCommandSchema),
	async (ctx) => {
		await commands.create(ctx.req.valid('json'), ctx.get('users'), ctx.get('email'));
		return ctx.text('User created', 200);
	}
);

/** Update. */
userRouter.post(
	'/update',
	describeRoute({
		operationId: 'UserUpdateOp',
		description: "Updates a user's username, email, or password.",
		tags: ['user'],
		responses: {
			200: {
				description: 'Returned if the user is updated successfully.',
				content: { 'text/plain': { schema: resolver(type('string')) } }
			}
		}
	}),
	fieldValidator(UserUpdateCommandSchema),
	async (ctx) => {
		const client = requireAuth(ctx.get('client'));
		await commands.update(
			ctx.req.valid('json'),
			client,
			ctx.get('users'),
			ctx.get('email')
		);
		return ctx.text('User updated', 200);
	}
);

/** Request email confirmation. */
userRouter.post(
	'/requestEmailConfirmation',
	describeRoute({
		operationId: 'UserRequestEmailConfirmationOp',
		description: 'Requests an email confirmation be sent to the email address.',
		tags: ['user'],
		responses: {
			200: {
				description: 'Returned if the confirmation is requested successfully.',
				content: { 'text/plain': { schema: resolver(type('string')) } }
			}
		}
	}),
	fieldValidator(UserRequestEmailConfirmationCommandSchema),
	async (ctx) => {
		await commands.requestEmailConfirmation(
			ctx.req.valid('json'),
			ctx.get('users'),
			ctx.get('email')
		);
		return ctx.text('Confirmation requested.', 200);
	}
);

/** Confirm email. */
userRouter.post(
	'/confirmEmail',
	describeRoute({
		operationId: 'UserConfirmEmailOp',
		description: 'Confirms an email confirmation and verifies the email.',
		tags: ['user'],
		responses: {
			200: {
				description: 'Returned if the email is verified successfully.',
				content: { 'text/plain': { schema: resolver(type('string')) } }
			}
		}
	}),
	fieldValidator(UserConfirmEmailConfirmationCommandSchema),
	async (ctx) => {
		await commands.confirmEmailConfirmation(ctx.req.valid('json'), ctx.get('users'));
		return ctx.text('Email confirmed.', 200);
	}
);

/** Request password reset. */
userRouter.post(
	'/requestPasswordReset',
	describeRoute({
		operationId: 'UserRequestPasswordResetOp',
		description: 'Requests a password reset confirmation be sent to the email.',
		tags: ['user'],
		responses: {
			200: {
				description: 'Returned if the password reset is requested successfully.',
				content: { 'text/plain': { schema: resolver(type('string')) } }
			}
		}
	}),
	fieldValidator(UserRequestPasswordResetCommandSchema),
	async (ctx) => {
		await commands.requestPasswordReset(
			ctx.req.valid('json'),
			ctx.get('users'),
			ctx.get('email')
		);
		return ctx.text('Password reset requested.', 200);
	}
);

/** Confirm password reset. */
userRouter.post(
	'/confirmPasswordReset',
	describeRoute({
		operationId: 'UserConfirmPasswordResetOp',
		description: 'Confirms a password reset and changes the user\'s password"',
		tags: ['user'],
		responses: {
			200: {
				description: 'Returned if the password is reset successfully.',
				content: { 'text/plain': { schema: resolver(type('string')) } }
			}
		}
	}),
	fieldValidator(UserConfirmPasswordResetCommandSchema),
	async (ctx) => {
		await commands.confirmPasswordReset(ctx.req.valid('json'), ctx.get('users'));
		return ctx.text('Password reset.', 200);
	}
);
