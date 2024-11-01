import env from 'env';
import z from 'zod';
import { diContainer } from '@fastify/awilix';
import { UserCreateCommand } from '@vdt-webapp/common/src/user/mutations';
import { ValidationError } from 'common/errors';
import { hashPassword } from '../auth/passwords';

/**
 * Creates a new user in the database.
 * @param command The create command.
 * @param container The service locator.
 */
const create = async (
	command: z.infer<typeof UserCreateCommand>,
	container: typeof diContainer
) => {
	const users = container.resolve('userRepo');

	/** Validate command against existing database state. */
	const emailExists = await users.emailExists(command.email);
	if (emailExists) {
		throw new ValidationError('Email exists', {
			fieldErrors: { email: ['This email is already registered.'] }
		});
	}
	const usernameExists = await users.usernameExists(command.username);
	if (usernameExists) {
		throw new ValidationError('Username exists', {
			fieldErrors: { username: ['This username is taken.'] }
		});
	}

	/** Hash password. */
	const passwordHash = await hashPassword(command.password1);

	/** Create the objects. */
	await users.create(
		command.username,
		passwordHash,
		command.email,
		env.EMAIL_VERIFICATION_REQUIRED
	);

	/** Emit the event which sends the email verification. */
	if (env.EMAIL_VERIFICATION_REQUIRED) {
		/**
		 * TODO.
		 */
	}
};
export default create;
