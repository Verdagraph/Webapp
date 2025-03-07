import { Hono } from 'hono';
import { Dependency } from 'hono-simple-di';
import { HttpClient as TriplitHttpClient } from '@triplit/client';
import env from 'env';
import { UserRepository } from 'users/repository';
import EmailSender from 'common/emails/sender';
import { type UserAccount } from '@vdt-webapp/common';

/**
 * Sets the type inference for variables which are set to
 * Hono's context.
 * Currently this includes dependencies registered through DI
 * and the user retrieved through auth.
 */
declare module 'hono' {
	interface ContextVariableMap {
		triplit: TriplitHttpClient;
		users: UserRepository;
		email: EmailSender;

		client: UserAccount | null;
	}
}

export function registerDependencies(app: Hono) {
	/** Database. */
	const triplitClient = new Dependency(
		() =>
			new TriplitHttpClient({
				serverUrl: env.TRIPLIT_URL,
				token: env.TRIPLIT_SERVER_TOKEN
			})
	);

	/** Repositories. */
	const userRepo = new Dependency(
		async (c) => new UserRepository({ triplit: await triplitClient.resolve(c) })
	);

	/** Email. */
	const emailSender = new Dependency(() => new EmailSender());

	/** Register middlewares. */
	app.use(triplitClient.middleware('triplit'));
	app.use(userRepo.middleware('users'));
	app.use(emailSender.middleware('email'));
}
