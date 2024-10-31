import { FastifyInstance } from 'fastify';
import { diContainer } from '@fastify/awilix';
import { HttpClient as TriplitHttpClient } from '@triplit/client';
import { asValue } from 'awilix';
import env from 'env';

const { fastifyAwilixPlugin } = require('@fastify/awilix');

/** Declares the types of dependencies available. */
declare module '@fastify/awilix' {
	interface Cradle {
		triplit: TriplitHttpClient;
	}
	interface RequestCradle {}
}

/** Global dependencies. */
const triplit = new TriplitHttpClient({
	serverUrl: env.TRIPLIT_URL,
	token: env.TRIPLIT_SERVER_TOKEN
});

const registerDiContainer = (app: FastifyInstance) => {
	/** Register the plugin. */
	app.register(fastifyAwilixPlugin);

	/** Register all dependencies. */
	diContainer.register({
		triplit: asValue(triplit)
	});
};
export default registerDiContainer;
