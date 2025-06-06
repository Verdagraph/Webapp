import { diContainer } from '@fastify/awilix';
import { ValidationError } from 'common/errors.js';
import { decodeEmailConfirmationToken } from 'users/auth/tokens.js';

import { type UserConfirmEmailConfirmationCommand } from '@vdg-webapp/models';

/**
 * Closes an email confirmation request.
 * @param command The request command.
 * @param container The service locator.
 */
const confirmEmailConfirmation = async (
	command: UserConfirmEmailConfirmationCommand,
	container: typeof diContainer
) => {
	const users = container.resolve('userRepo');

	/** Decode the token. */
	const token = await decodeEmailConfirmationToken(command.token);
	if (token == null) {
		throw new ValidationError(
			'Failure while decoding email confirmation token - expired or malformed.',
			{ nonFormErrors: ['Invalid email confirmation token.'] }
		);
	}

	/** Retrieve the user from the token. */
	const user = await users.getAccountById(token.accountId);
	if (user == null) {
		throw new ValidationError(
			'Failure while decoding email confirmation token - user does not exist.',
			{ nonFormErrors: ['Invalid email confirmation token.'] }
		);
	}

	/** Ensure the user has an unverified email with the encoded token. */
	if (user.unverifiedEmail.token != command.token) {
		throw new ValidationError(
			'Failure while decoding email confirmation token - token does not exist',
			{ nonFormErrors: ['Invalid email confirmation token.'] }
		);
	}

	/** Verify the email. */
	await users.verifyEmail(user.id);
};
export default confirmEmailConfirmation;
