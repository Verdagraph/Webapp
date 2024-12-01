import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import {
	UserLoginCommand,
	UserCreateCommand,
	UserUpdateCommand,
	UserRequestEmailConfirmationCommand,
	UserConfirmEmailConfirmationCommand,
	UserRequestPasswordResetCommand,
	UserConfirmPasswordResetCommand
} from '@vdt-webapp/common';
import { setTag } from 'plugins/openapi';
import {
	login,
	refresh,
	create,
	update,
	requestEmailConfirmation,
	confirmEmailConfirmation,
	requestPasswordReset,
	confirmPasswordReset
} from './commands';
import {
	setRefreshTokenCookie,
	getRefreshTokenCookie,
	setAccessTokenHeader
} from './auth/tokens';
import { requireAuth } from 'plugins/auth';

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
			body: UserLoginCommand,
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
			body: UserCreateCommand,
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
			body: UserUpdateCommand,
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
			body: UserRequestEmailConfirmationCommand,
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
			body: UserConfirmEmailConfirmationCommand,
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
			body: UserRequestPasswordResetCommand,
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
			body: UserConfirmPasswordResetCommand,
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
