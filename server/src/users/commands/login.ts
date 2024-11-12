import env from 'env';
import z from 'zod';
import { diContainer } from '@fastify/awilix';
import { UserLoginCommand } from '@vdt-webapp/common/src/user/mutations';
import { NotFoundError, AuthenticationError } from 'common/errors';

import { verifyPassword } from '../auth/passwords';
import { encodeAccessToken, encodeRefreshToken } from '../auth/tokens';

export type UserLoginResult = {
	/** The encoded access token. */
	accessToken: string;
	/** The encoded refresh token. */
	refreshToken: string;
};

/**
 * Authenticates the user and provides encoded JWT tokens.
 * @param command The login command.
 * @param container The service locator.
 * @returns The encoded access and refresh tokens and the access expiry time.
 */
const login = async (
	command: z.infer<typeof UserLoginCommand>,
	container: typeof diContainer
): Promise<UserLoginResult> => {
	const users = container.resolve('userRepo');

	/** Fetch the user from the database. */
	const user = await users.getAccountByVerifiedEmail(command.email);
	if (user == null) {
		throw new NotFoundError('User does not exist', {
			fieldErrors: { email: ['This email does not exist.'] }
		});
	}

	/** Verify the provided password. */
	if ((await verifyPassword(command.password, user.passwordHash)) == false) {
		throw new AuthenticationError('Incorrect password', {
			fieldErrors: { password: ['This password is incorrect.'] }
		});
	}

	/** Encode both access and refresh tokens. */
	const accessToken = await encodeAccessToken(user.id);
	const refreshToken = await encodeRefreshToken(user.id);

	return { accessToken, refreshToken };
};
export default login;
