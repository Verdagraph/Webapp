import type { FastifyInstance } from 'fastify';
import userRouter from '../users/controllers';

export const registerRouters = (app: FastifyInstance) => {
	app.register(userRouter, { prefix: 'users/' });
};
