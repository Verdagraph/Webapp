import type { FastifyInstance } from 'fastify';

import userRouter from '../users/controllers.js';

export const registerRouters = (app: FastifyInstance) => {
	app.register(userRouter, { prefix: 'users/' });
};
