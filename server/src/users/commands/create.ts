import env from 'env';
import { UserCreateCommand } from '@vdt-webapp/common';
import { ValidationError } from 'common/errors';
import { hashPassword } from '../auth/passwords';
import { encodeEmailConfirmationToken } from '../auth/tokens';
import { UserRepository } from 'users/repository';
import EmailSender from 'common/emails/sender';

/**
 * Creates a new user in the database.
 * @param command The create command.
 * @param users The user repository.
 * @param emailSender The email sending class.
 */
const create = async (
	command: UserCreateCommand,
	users: UserRepository,
	emailSender: EmailSender
) => {
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
	const passwordHash = await hashPassword(command.password);

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
