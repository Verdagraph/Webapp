import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import {
	UserCreateCommand,
	UserLoginCommand
} from '@vdt-webapp/common/src/user/mutations';
import { userLogin } from './ops';

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
		handler: async (
			request: FastifyRequest<{
				Body: typeof UserLoginCommand;
			}>,
			reply: FastifyReply
		) => {
			const result = await userLogin(request.body);
		}
	});
};
export default userRouter;
