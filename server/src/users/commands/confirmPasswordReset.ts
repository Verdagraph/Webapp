import z from 'zod';
import { diContainer } from '@fastify/awilix';
import { UserConfirmPasswordResetCommand } from '@vdt-webapp/common/src/user/mutations';
import { decodePasswordResetToken } from 'users/auth/tokens';
import { ValidationError } from 'common/errors';
import { hashPassword } from 'users/auth/passwords';

/**
 * Closes a password reset request.
 * @param command The request command.
 * @param container The service locator.
 */
const confirmPasswordReset = async (
	command: z.infer<typeof UserConfirmPasswordResetCommand>,
	container: typeof diContainer
) => {
	const users = container.resolve('userRepo');

	/** Decode the token. */
	const token = await decodePasswordResetToken(command.token);
	if (token == null) {
		throw new ValidationError(
			'Failure while decoding password reset token - expired or malformed.',
			{ nonFormErrrors: ['Invalid password reset token.'] }
		);
	}

	/** Retrieve the user from the token. */
	const user = await users.getAccountById(token.uid);
	if (user == null) {
		throw new ValidationError(
			'Failure while decoding password reset token - user does not exist.',
			{ nonFormErrrors: ['Invalid password reset token.'] }
		);
	}

	/** Ensure the user has a password reset request with the provided token. */
	if (user.passwordResetToken != command.token && user.id == command.userId) {
		throw new ValidationError(
			'Failure while decoding password reset token - token does not exist',
			{ nonFormErrrors: ['Invalid password reset token.'] }
		);
	}

	/** Update the password. */
	const passwordHash = await hashPassword(command.password1);
	await users.updatePassword(user.id, passwordHash);
};
export default confirmPasswordReset;
