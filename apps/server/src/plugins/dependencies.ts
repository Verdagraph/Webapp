import { diContainer } from '@fastify/awilix';
import { fastifyAwilixPlugin } from '@fastify/awilix';
import { Lifetime, asClass, asValue } from 'awilix';
import EmailSender from 'common/emails/sender.js';
import env from 'env.js';
import { FastifyInstance } from 'fastify';
import { type Db } from 'jazz-tools/backend';
import { createJazzSession } from 'jazz-tools/backend';
import { encodeServiceToken } from 'users/auth/tokens.js';
import { UserRepository } from 'users/repository.js';

import { UserAccount } from '@vdg-webapp/models';
import { jazzApp, permissions as jazzPermissions } from '@vdg-webapp/models/jazz';

/** Declares the types of dependencies available. */
declare module '@fastify/awilix' {
	interface Cradle {
		jazzCredentialsDb: Db;
		userRepo: UserRepository;
		emailSender: EmailSender;
	}
	interface RequestCradle {
		client: UserAccount | null;
	}
}

/**
 * The server's own Jazz session, logged in as a trusted service identity
 * (see encodeServiceToken). Used only to read and write the credential
 * tables that no end-user session is ever granted access to.
 */
const createJazzCredentialsDb = async (): Promise<Db> => {
	const session = await createJazzSession({
		appId: env.JAZZ_APP_ID,
		app: jazzApp,
		permissions: jazzPermissions,
		serverUrl: env.JAZZ_SERVER_URL,
		driver: { type: 'memory' }
	});
	await session.loginOrRegisterJWT({ getToken: encodeServiceToken });
	const client = session.getSnapshot().client;
	if (!client) {
		throw new Error('Failed to establish the Jazz service session.');
	}
	return client.db;
};

export const registerDiContainer = async (app: FastifyInstance) => {
	/** Register the plugin. */
	app.register(fastifyAwilixPlugin);

	/** Register all dependencies. */

	/** Jazz credentials database. */
	diContainer.register({
		jazzCredentialsDb: asValue(await createJazzCredentialsDb())
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
