import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { requireAuth } from 'plugins/auth.js';
import { setTag } from 'plugins/openapi.js';
import z from 'zod';

import {
	UserConfirmEmailConfirmationCommandSchema,
	UserConfirmPasswordResetCommandSchema,
	UserCreateCommandSchema,
	UserLoginCommandSchema,
	UserRequestEmailConfirmationCommandSchema,
	UserRequestPasswordResetCommandSchema,
	UserUpdateCommandSchema
} from '@vdg-webapp/models';

import {
	getRefreshTokenCookie,
	setAccessTokenHeader,
	setRefreshTokenCookie
} from './auth/tokens.js';
import {
	confirmEmailConfirmation,
	confirmPasswordReset,
	create,
	login,
	refresh,
	requestEmailConfirmation,
	requestPasswordReset,
	update
} from './commands/index.js';

export const userRouter = async (app: FastifyInstance) => {
	setTag(app, 'user');

	/** Login. */
	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: 'login',
		schema: {
			operationId: 'UserLoginOp',
			description:
				'Grants an access and refresh token on a correct username and password.',
			body: UserLoginCommandSchema,
			tags: ['user'],
			response: {
				200: z.string().describe('The access token.')
			}
		},
		handler: async (request, reply) => {
			const result = await login(request.body, app.diContainer);
			setRefreshTokenCookie(result.refreshToken, reply);
			setAccessTokenHeader(result.accessToken, reply);
			reply.code(200).send(result.accessToken);
		}
	});

	/** Refresh. */
	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: 'refresh',
		schema: {
			operationId: 'UserRefreshOp',
			description: 'Grants an access and refresh token on a valid refresh token.',
			response: {
				200: z.string().describe('The access token.')
			}
		},
		handler: async (request, reply) => {
			const refreshToken = getRefreshTokenCookie(request);
			const result = await refresh(refreshToken, app.diContainer);
			setRefreshTokenCookie(result.refreshToken, reply);
			setAccessTokenHeader(result.accessToken, reply);
			reply.code(200).send(result.accessToken);
		}
	});

	/** Create. */
	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: 'create',
		schema: {
			operationId: 'UserCreateOp',
			description: 'Creates a new user.',
			body: UserCreateCommandSchema,
			response: {
				200: z.string()
			}
		},
		handler: async (request, reply) => {
			await create(request.body, app.diContainer);
			reply.code(200).send('User created.');
		}
	});

	/** Update. */
	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: 'update',
		schema: {
			operationId: 'UserUpdateOp',
			description: "Updates a user's username, email, or password",
			body: UserUpdateCommandSchema,
			response: {
				200: z.string()
			}
		},
		handler: async (request, reply) => {
			const client = requireAuth(request.diScope.resolve('client'));
			await update(request.body, app.diContainer, client);
			reply.code(200).send('User updated.');
		}
	});

	/** Request email confirmation. */
	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: 'requestEmailConfirmationOp',
		schema: {
			operationId: 'UserRequestEmailConfirmationOp',
			description: 'Requests an email confirmation be sent to the email address.',
			body: UserRequestEmailConfirmationCommandSchema,
			response: {
				200: z.string()
			}
		},
		handler: async (request, reply) => {
			await requestEmailConfirmation(request.body, app.diContainer);
			reply.code(200).send('Confirmation requested.');
		}
	});

	/** Confirm email. */
	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: 'confirmEmail',
		schema: {
			operationId: 'UserConfirmEmailOp',
			description: 'Confirms an email confirmation and verifies the email.',
			body: UserConfirmEmailConfirmationCommandSchema,
			response: {
				200: z.string()
			}
		},
		handler: async (request, reply) => {
			await confirmEmailConfirmation(request.body, app.diContainer);
			reply.code(200).send('Email confirmed.');
		}
	});

	/** Request password reset. */
	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: 'requestPasswordReset',
		schema: {
			operationId: 'UserRequestPasswordResetOp',
			description: 'Requests a password reset confirmation be sent to the email.',
			body: UserRequestPasswordResetCommandSchema,
			response: {
				200: z.string()
			}
		},
		handler: async (request, reply) => {
			await requestPasswordReset(request.body, app.diContainer);
			reply.code(200).send('Password reset requested.');
		}
	});

	/** Confirm password reset. */
	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: 'confirmPasswordReset',
		schema: {
			operationId: 'UserConfirmPasswordResetOp',
			description: "Confirms a password reset and changes the user's password",
			body: UserConfirmPasswordResetCommandSchema,
			response: {
				200: z.string()
			}
		},
		handler: async (request, reply) => {
			await confirmPasswordReset(request.body, app.diContainer);
			reply.code(200).send('Password reset.');
		}
	});
};
export default userRouter;
