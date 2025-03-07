import { Hono } from 'hono';
import * as plugins from './plugins';
import env from 'env';

export const buildApp = () => {
	const app = new Hono();

	/** Basic middlewares. */
	plugins.registerCors(app);

	/** Dependency injection. */
	plugins.registerDependencies(app);

	/** Error handling. */
	plugins.registerErrorHandler(app);

	/** Authentication support. */
	plugins.registerAuth(app);

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
