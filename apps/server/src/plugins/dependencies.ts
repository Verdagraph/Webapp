import { FastifyInstance } from 'fastify';
import { diContainer } from '@fastify/awilix';
import { HttpClient as TriplitHttpClient } from '@triplit/client';
import { asClass, asValue, Lifetime } from 'awilix';
import env from 'env';
import { UserRepository } from 'users/repository';
import { UserAccount } from '@vdg-webapp/models/src/users/schema';
import EmailSender from 'common/emails/sender';

import { fastifyAwilixPlugin } from '@fastify/awilix';

/** Declares the types of dependencies available. */
declare module '@fastify/awilix' {
	interface Cradle {
		triplit: TriplitHttpClient;
		userRepo: UserRepository;
		emailSender: EmailSender;
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

export const registerDiContainer = (app: FastifyInstance) => {
	/** Register the plugin. */
	app.register(fastifyAwilixPlugin);

	/** Register all dependencies. */

	/** Triplit database */
	diContainer.register({
		triplit: asValue(triplit)
	});

	/** Email. */
	diContainer.register({
		emailSender: asClass(EmailSender, {
			lifetime: Lifetime.SINGLETON
		})
	});

	/** Repos. */
	diContainer.register({
		userRepo: asClass(UserRepository, {
			lifetime: Lifetime.SINGLETON
		})
	});
};
