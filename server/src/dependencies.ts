import { FastifyInstance } from 'fastify';
import { diContainer } from '@fastify/awilix';
import { HttpClient as TriplitHttpClient } from '@triplit/client';
import { asClass, asValue, Lifetime } from 'awilix';
import env from 'env';
import { UserRepository } from 'users/repository';
import { UserAccount } from '@vdt-webapp/common/src/user/schema';

const { fastifyAwilixPlugin } = require('@fastify/awilix');

/** Declares the types of dependencies available. */
declare module '@fastify/awilix' {
	interface Cradle {
		triplit: TriplitHttpClient;
		userRepo: UserRepository;
	}
	interface RequestCradle {
		client: UserAccount | null;
	}
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

	/** Triplit database */
	diContainer.register({
		triplit: asValue(triplit)
	});

	/** Repos. */
	diContainer.register({
		userRepo: asClass(UserRepository, {
			lifetime: Lifetime.SINGLETON
		})
	});
};
export default registerDiContainer;
