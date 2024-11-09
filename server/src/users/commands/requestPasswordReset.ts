import z from 'zod';
import { diContainer } from '@fastify/awilix';
import { UserRequestPasswordResetCommand } from '@vdt-webapp/common/src/user/mutations';
import { NotFoundError } from 'common/errors';

import { encodePasswordResetToken } from 'users/auth/tokens';
import env from 'env';
/**
 * Requests a new password reset.
 * @param command The request command.
 * @param container The service locator.
 */
const requestPasswordReset = async (
	command: z.infer<typeof UserRequestPasswordResetCommand>,
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
