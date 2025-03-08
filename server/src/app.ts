import { Hono } from 'hono';
import * as plugins from './plugins';

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
	plugins.registerOpenapi(app);

	/** Register routes */
	plugins.registerRouters(app);

	return app;
};
