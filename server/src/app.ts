import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import registerRouters from './router';
import registerErrorHandler from './errors';

/** Server settings. */
// const port = Number(process.env.SERVER_PORT) || 5001;
// const host = String(process.env.SERVER_HOST) || 'localhost';

const startServer = async () => {
	const app = Fastify({ logger: true });

	/** Register middlewares. */
	registerErrorHandler(app);
	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

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
