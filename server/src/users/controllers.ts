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
} from '@vdt-webapp/common/src/user/mutations';
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
import { requireAuth } from 'auth';

export const userRouter = async (app: FastifyInstance) => {
	/** Login. */
	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: 'login',
		schema: {
			body: UserLoginCommand,
			response: {
				200: z.string()
			}
		},
		handler: async (request, reply) => {
			const result = await login(request.body, app.diContainer);
			setRefreshTokenCookie(result.refreshToken, reply);
			setAccessTokenHeader(result.accessToken, reply);
			reply.code(200).send('Login successful.');
		}
	});

	/** Refresh. */
	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: 'refresh',
		schema: {
			response: {
				200: z.string()
			}
		},
		handler: async (request, reply) => {
			const refreshToken = getRefreshTokenCookie(request);
			const result = await refresh(refreshToken, app.diContainer);
			setRefreshTokenCookie(result.refreshToken, reply);
			setAccessTokenHeader(result.accessToken, reply);
			reply.code(200).send('Refresh successful.');
		}
	});

	/** Create. */
	app.withTypeProvider<ZodTypeProvider>().route({
		method: 'POST',
		url: 'create',
		schema: {
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
		url: 'requestEmailConfirmation',
		schema: {
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
