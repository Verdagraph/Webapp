import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import type { FastifyCookieOptions } from '@fastify/cookie';
import cookie from '@fastify/cookie';
import registerDiContainer from './dependencies';
import registerAuth from 'auth';
import registerRouters from './router';
import registerErrorHandler from './errors';
import registerOpenapi from './openapi';
import env from 'env';

/** Server settings. */
// const port = Number(process.env.SERVER_PORT) || 5001;
// const host = String(process.env.SERVER_HOST) || 'localhost';

const startServer = async () => {
	const app = Fastify({ logger: true });

	/** Dependency injection. */
	registerDiContainer(app);

	/** Error handling. */
	registerErrorHandler(app);

	/** Authentication support. */
	registerAuth(app);

	/** ZOD request body handling. */
	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	/** OpenAPI schema. */
	registerOpenapi(app);

	/** Register routes */
	registerRouters(app);

	try {
		await app.listen();
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

startServer();

// For Fastify CLI swagger generation
export default function (fastifyInstance: any) {
	const app = Fastify({ logger: true });

	/** Cookie plugin. */
	app.register(cookie, {
		secret: env.COOKIE_SECRET // for cookies signature
	} as FastifyCookieOptions);

	/** Register middlewares. */
	registerErrorHandler(app);
	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);
	registerOpenapi(app);

	/** Register routes */
	registerRouters(app);
}
