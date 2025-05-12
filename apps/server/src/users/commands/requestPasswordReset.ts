import { diContainer } from '@fastify/awilix';
import { NotFoundError } from 'common/errors.js';
import env from 'env.js';
import { encodePasswordResetToken } from 'users/auth/tokens.js';

import { type UserRequestPasswordResetCommand } from '@vdg-webapp/models';

/**
 * Requests a new password reset.
 * @param command The request command.
 * @param container The service locator.
 */
const requestPasswordReset = async (
	command: UserRequestPasswordResetCommand,
	container: typeof diContainer
) => {
	const users = container.resolve('userRepo');
	const emailSender = container.resolve('emailSender');

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
