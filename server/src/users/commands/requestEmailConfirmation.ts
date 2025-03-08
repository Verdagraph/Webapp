import { UserRequestEmailConfirmationCommand } from '@vdt-webapp/common';
import { InternalFailureException, NotFoundError } from 'common/errors';
import { encodeEmailConfirmationToken } from 'users/auth/tokens';
import env from 'env';
import { UserRepository } from 'users/repository';
import EmailSender from 'common/emails/sender';

/**
 * Requests a new email confirmation.
 * @param command The request command.
 * @param users The user repository.
 * @param emailSender The email sending class.
 */
const requestEmailConfirmation = async (
	command: UserRequestEmailConfirmationCommand,
	users: UserRepository,
	emailSender: EmailSender
) => {
	/** Retrieve user. */
	const account = await users.getAccountByUnverifiedEmail(command.email);
	if (account == null) {
		throw new NotFoundError('No unverified email exists', {
			fieldErrors: { email: ['This email does not exist or is already verified.'] }
		});
	}
	const profile = await users.getProfileByid(account.profileId);
	if (profile == null) {
		throw new InternalFailureException('No profile found on account.');
	}

	/** Create the verification token. */
	const token = await encodeEmailConfirmationToken(account.id);

	/** Add the verification token to the database. */
	await users.addEmailVerificationToken(account.id, token);

	/** Emit the event which sends the email verification. */
	await emailSender.sendEmailConfirmationEmail(
		command.email,
		profile.username,
		env.CLIENT_BASE_URL,
		env.CLIENT_BASE_URL + `/register/verify/${token}`
	);
};
export default requestEmailConfirmation;
