import { UserConfirmPasswordResetCommand } from '@vdt-webapp/common';
import { decodePasswordResetToken } from 'users/auth/tokens';
import { ValidationError } from 'common/errors';
import { hashPassword } from 'users/auth/passwords';
import { UserRepository } from 'users/repository';

/**
 * Closes a password reset request.
 * @param command The request command.
 * @param users The user repository.
 */
const confirmPasswordReset = async (
	command: UserConfirmPasswordResetCommand,
	users: UserRepository
) => {
	/** Decode the token. */
	const token = await decodePasswordResetToken(command.token);
	if (token == null) {
		throw new ValidationError(
			'Failure while decoding password reset token - expired or malformed.',
			{ nonFormErrors: ['Invalid password reset token.'] }
		);
	}

	/** Retrieve the user from the token. */
	const user = await users.getAccountById(token.accountId);
	if (user == null) {
		throw new ValidationError(
			'Failure while decoding password reset token - user does not exist.',
			{ nonFormErrors: ['Invalid password reset token.'] }
		);
	}

	/** Ensure the user has a password reset request with the provided token. */
	if (user.passwordResetToken != command.token || user.id != command.userId) {
		throw new ValidationError(
			'Failure while decoding password reset token - token does not exist',
			{ nonFormErrors: ['Invalid password reset token.'] }
		);
	}

	/** Update the password. */
	const passwordHash = await hashPassword(command.password);
	await users.updatePassword(user.id, passwordHash);
};
export default confirmPasswordReset;
