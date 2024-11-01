import z from 'zod';
import { diContainer } from '@fastify/awilix';
import { UserRequestPasswordResetCommand } from '@vdt-webapp/common/src/user/mutations';
import { NotFoundError } from 'common/errors';

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

	const user = await users.getAccountByVerifiedEmail(command.email);
	if (user == null) {
		throw new NotFoundError('No email exists', {
			fieldErrors: { email: ['This email does not exist or is not verified.'] }
		});
	}

	/**
	 * Emit the event which sends the password reset request.
	 * TODO.
	 */
};
export default requestPasswordReset;
