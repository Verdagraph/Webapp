import { UserRequestPasswordResetCommand } from '@vdt-webapp/common/src';
import { NotFoundError } from 'common/errors';

import { encodePasswordResetToken } from 'users/auth/tokens';
import env from 'env';
import { UserRepository } from 'users/repository';
import EmailSender from 'common/emails/sender';
/**
 * Requests a new password reset.
 * @param command The request command.
 * @param users The user repository.
 * @param emailSender The email sending class.
 */
const requestPasswordReset = async (
	command: UserRequestPasswordResetCommand,
	users: UserRepository,
	emailSender: EmailSender
) => {
	const user = await users.getAccountByVerifiedEmail(command.email);
	if (user == null) {
		throw new NotFoundError('No email exists', {
			fieldErrors: { email: ['This email does not exist or is not verified.'] }
		});
	}

	/** Create the token. */
	const token = await encodePasswordResetToken(user.id);

	/** Add the token to the database. */
	await users.addPasswordResetToken(user.id, token);

	/** Emit the event which sends the email verification. */
	await emailSender.sendPasswordResetEmail(
		command.email,
		env.CLIENT_BASE_URL + `/login/reset-password/${user.id}/${token}`
	);
};
export default requestPasswordReset;
