import z from 'zod';
import { diContainer } from '@fastify/awilix';
import { UserConfirmEmailConfirmationCommand } from '@vdt-webapp/common/src/user/mutations';
import { decodeEmailConfirmationToken } from 'users/auth/tokens';
import { ValidationError } from 'common/errors';

/**
 * Closes an email confirmation request.
 * @param command The request command.
 * @param container The service locator.
 */
const confirmEmailConfirmation = async (
	command: z.infer<typeof UserConfirmEmailConfirmationCommand>,
	container: typeof diContainer
) => {
	const users = container.resolve('userRepo');

	/** Decode the token. */
	const token = await decodeEmailConfirmationToken(command.token);
	if (token == null) {
		throw new ValidationError(
			'Failure while decoding email confirmation token - expired or malformed.',
			{ nonFormErrrors: ['Invalid email confirmation token.'] }
		);
	}

	/** Retrieve the user from the token. */
	const user = await users.getAccountById(token.uid);
	if (user == null) {
		throw new ValidationError(
			'Failure while decoding email confirmation token - user does not exist.',
			{ nonFormErrrors: ['Invalid email confirmation token.'] }
		);
	}

	/** Ensure the user has an unverified email with the encoded token. */
	if (user.unverifiedEmail.token != command.token) {
		throw new ValidationError(
			'Failure while decoding email confirmation token - token does not exist',
			{ nonFormErrrors: ['Invalid email confirmation token.'] }
		);
	}

	/** Verify the email. */
	await users.verifyEmail(user.id);
};
export default confirmEmailConfirmation;
