import type { FastifyCookieOptions } from '@fastify/cookie';
import cookie from '@fastify/cookie';
import env from 'env.js';
import { FastifyInstance } from 'fastify';

export const registerCookies = (app: FastifyInstance) => {
	app.register(cookie, {
		secret: env.COOKIE_SECRET // for cookies signature
	} as FastifyCookieOptions);
};
