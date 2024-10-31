import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { UserLoginCommand } from '@vdt-webapp/common/src/user/mutations';
import { userLogin, userRefresh } from './ops';
import {
	setRefreshTokenCookie,
	getRefreshTokenCookie,
	setAccessTokenHeader
} from './auth/tokens';

export const userRouter = async (app: FastifyInstance) => {
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
			const result = await userLogin(request.body, app.diContainer);
			setRefreshTokenCookie(result.refreshToken, reply);
			setAccessTokenHeader(result.accessToken, reply);
			reply.code(200).send('Login successful.');
		}
	});
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
			const result = await userRefresh(refreshToken, app.diContainer);
			setRefreshTokenCookie(result.refreshToken, reply);
			setAccessTokenHeader(result.accessToken, reply);
			reply.code(200).send('Refresh successful.');
		}
	});
};
export default userRouter;
