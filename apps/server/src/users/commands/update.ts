import { diContainer } from '@fastify/awilix';
import { ValidationError } from 'common/errors.js';
import { AuthenticationError } from 'common/errors.js';
import env from 'env.js';

import { type UserAccount, type UserUpdateCommand } from '@vdg-webapp/models';

import { hashPassword, verifyPassword } from '../auth/passwords.js';

/**
 * Updates an existing user in the database.
 * @param command The update command.
 * @param container The service locator.
 */
const update = async (
	command: UserUpdateCommand,
	container: typeof diContainer,
	client: UserAccount
) => {
	const users = container.resolve('userRepo');

	/** Validate command against existing database state. */
	if (command.newEmail) {
		const emailExists = await users.emailExists(command.newEmail);
		if (emailExists) {
			throw new ValidationError('Email exists', {
				fieldErrors: { email: ['This email is already registered.'] }
			});
		}
	}
	if (command.newUsername) {
		const usernameExists = await users.usernameExists(command.newUsername);
		if (usernameExists) {
			throw new ValidationError('Username exists', {
				fieldErrors: { username: ['This username is taken.'] }
			});
		}
	}

	/** Verify the provided password. */
	if ((await verifyPassword(command.password, client.passwordHash)) == false) {
		throw new AuthenticationError('Incorrect password', {
			fieldErrors: { password: ['This password is incorrect.'] }
		});
	}

	/** Update the email. */
	if (command.newEmail) {
		await users.updateEmail(
			client.id,
			command.newEmail,
			env.EMAIL_VERIFICATION_REQUIRED
		);

		/** Emit the event which sends the email verification. */
		if (env.EMAIL_VERIFICATION_REQUIRED) {
			/**
			 * TODO.
			 */
		}
	}

	/** Update the username. */
	if (command.newUsername) {
		await users.updateUsername(client.profileId, command.newUsername);
	}

	/** Update the password. */
	if (command.newPassword1) {
		const passwordHash = await hashPassword(command.newPassword1);
		await users.updatePassword(client.id, passwordHash);
	}
};
export default update;
