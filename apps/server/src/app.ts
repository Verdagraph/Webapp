import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import {
	registerDiContainer,
	registerAuth,
	registerRouters,
	registerErrorHandler,
	registerOpenapi,
	registerCors,
	registerCookies
} from './plugins/index.js';
import env from 'env.js';

export const buildApp = () => {
	const app = Fastify({ logger: true });

	/** Basic middlewares. */
	registerCors(app);
	registerCookies(app);

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

	return app;
};

const startServer = async () => {
	const app = buildApp();
	try {
		await app.listen({ port: env.APP_PORT, host: env.APP_HOST });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

startServer();
