import z from 'zod';
import { diContainer } from '@fastify/awilix';
import { UserRequestEmailConfirmationCommand } from '@vdt-webapp/common/src/user/mutations';
import { NotFoundError } from 'common/errors';

/**
 * Requests a new email confirmation.
 * @param command The request command.
 * @param container The service locator.
 */
const requestEmailConfirmation = async (
	command: z.infer<typeof UserRequestEmailConfirmationCommand>,
	container: typeof diContainer
) => {
	const users = container.resolve('userRepo');

	const user = await users.getAccountByUnverifiedEmail(command.email);
	if (user == null) {
		throw new NotFoundError('No unverified email exists', {
			fieldErrors: { email: ['This email does not exist or is already verified.'] }
		});
	}

	/**
	 * Emit the event which sends the email verification.
	 * TODO.
	 */
};
export default requestEmailConfirmation;
