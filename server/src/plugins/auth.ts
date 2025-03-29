import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { getAccessTokenHeader, decodeAccessToken } from 'users/auth/tokens';
import { AuthenticationError } from 'common/errors';
import { asValue } from 'awilix';
import { UserAccount } from '@vdg-webapp/common/src/users/schema';

/**
 * Given a request, parse the request api key stored in the header
 * and retrieve the user correlating to the token from the DB.
 * If the user does not exist, do not raise an exception. Instead,
 * return the user as null. This allows
 * routes to be open to non-authenticated users but return different
 * content when authenticated users access it.
 */
export const registerAuth = (app: FastifyInstance) => {
	app.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
		/** Retrieve the access token. */
		const encodedAccessToken = getAccessTokenHeader(request);
		if (encodedAccessToken == null) {
			request.diScope.register({ client: asValue(null) });
			return;
		}

		/** Decode the token. */
		const token = await decodeAccessToken(encodedAccessToken);
		if (token == null) {
			request.diScope.register({ client: asValue(null) });
			return;
		}

		/** Retrieve the user the token represents. */
		const users = app.diContainer.resolve('userRepo');
		const user = await users.getAccountById(token.uid);

		/** Add the user to the request dependencies. */
		request.diScope.register({ client: asValue(user) });
	});
};

/**
 * Throws an exception if no user was provided by the authentication middleware.
 * @param user The user provided by the authentication middleware.
 * @returns The user if it is not null.
 */
export const requireAuth = (user: UserAccount | null): UserAccount => {
	if (user == null) {
		throw new AuthenticationError('Malformed access credential', {
			nonFormErrors: ['Authentication expired. Please login again.']
		});
	}
	return user;
};
