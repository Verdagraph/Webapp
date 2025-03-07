import type { Hono } from 'hono';
import { cors } from 'hono/cors';
import env from 'env';

export function registerCors(app: Hono) {
	app.use(
		cors({
			origin: env.CLIENT_BASE_URL,
			credentials: true,
			allowMethods: ['GET', 'POST', 'OPTIONS'],
			allowHeaders: ['Content-Type', 'Authorization', 'Set-Cookie', 'Cookie'],
			exposeHeaders: ['Set-Cookie', 'Authorization']
		})
	);
}
