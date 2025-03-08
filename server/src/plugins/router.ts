import { type Hono } from 'hono';
import { userRouter } from 'users';

export const registerRouters = (app: Hono) => {
	app.route('/', userRouter);
};
