import { type Hono } from 'hono';
import { createMiddleware } from 'hono/factory';
import { getAccessTokenHeader, decodeAccessToken } from 'users/auth/tokens';
import { AuthenticationError } from 'common/errors';
import { UserAccount } from '@vdt-webapp/common';

/**
 * Given a request, parse the request api key stored in the header
 * and retrieve the user correlating to the token from the DB.
 * If the user does not exist, do not raise an exception. Instead,
 * return the user as null. This allows
 * routes to be open to non-authenticated users but return different
 * content when authenticated users access it.
 */
const authMiddleware = createMiddleware<{
	Variables: {
		client: UserAccount | null;
	};
}>(async (ctx, next) => {
	/** Retrieve the access token. */
	const encodedAccessToken = getAccessTokenHeader(ctx);
	if (encodedAccessToken == null) {
		ctx.set('client', null);
		await next();
		return
	}

	/** Decode the token. */
	const token = await decodeAccessToken(encodedAccessToken);
	if (token == null) {
		ctx.set('client', null);
		await next();
		return
	}

	/** Retrieve the user the token represents. */
	const users = ctx.get('users');
	const user = await users.getAccountById(token.accountId);

	/** Add the user to the request dependencies. */
	ctx.set('client', user);

	/** Proceed with the request cycle. */
	await next();
});

export function registerAuth(app: Hono) {
	app.use(authMiddleware);
}

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
