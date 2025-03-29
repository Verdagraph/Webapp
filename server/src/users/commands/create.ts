import env from 'env';
import { diContainer } from '@fastify/awilix';
import { type UserCreateCommand } from '@vdg-webapp/common';
import { ValidationError } from 'common/errors';
import { hashPassword } from '../auth/passwords';
import { encodeEmailConfirmationToken } from '../auth/tokens';

/**
 * Creates a new user in the database.
 * @param command The create command.
 * @param container The service locator.
 */
const create = async (command: UserCreateCommand, container: typeof diContainer) => {
	const users = container.resolve('userRepo');
	const emailSender = container.resolve('emailSender');

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
	const result = await users.create(
		command.username,
		passwordHash,
		command.email,
		env.EMAIL_VERIFICATION_REQUIRED
	);

	/** Return if no verification is required. */
	if (!env.EMAIL_VERIFICATION_REQUIRED) {
		return;
	}

	/** Create the verification token. */
	const token = await encodeEmailConfirmationToken(result.account.id);

	/** Add the verification token to the database. */
	await users.addEmailVerificationToken(result.account.id, token);

	/** Emit the event which sends the email verification. */
	await emailSender.sendEmailConfirmationEmail(
		command.email,
		command.username,
		env.CLIENT_BASE_URL,
		env.CLIENT_BASE_URL + `/register/verify/${token}`
	);
};
export default create;
