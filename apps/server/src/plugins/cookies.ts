import { FastifyInstance } from 'fastify';
import type { FastifyCookieOptions } from '@fastify/cookie';
import cookie from '@fastify/cookie';
import env from 'env.js';

export const registerCookies = (app: FastifyInstance) => {
	app.register(cookie, {
		secret: env.COOKIE_SECRET // for cookies signature
	} as FastifyCookieOptions);
};
