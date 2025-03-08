import { AuthenticationError } from 'common/errors';

import {
	decodeRefreshToken,
	encodeAccessToken,
	encodeRefreshToken
} from '../auth/tokens';
import type { UserLoginResult } from './login';
import { UserRepository } from 'users/repository';

const refresh = async (
	oldRefreshToken: string | false | undefined,
	users: UserRepository
): Promise<UserLoginResult> => {
	/** If no refresh token was provided, false authentication. */
	if (!oldRefreshToken) {
		throw new AuthenticationError('No refresh credential.', {
			nonFormErrors: ['Authentication expired. Please login again.']
		});
	}

	/** Decode the provided token. */
	const decodedToken = await decodeRefreshToken(oldRefreshToken);
	if (decodedToken == null) {
		throw new AuthenticationError('Malformed refresh credential.', {
			nonFormErrors: ['Authentication expired. Please login again.']
		});
	}

	/** Fetch the user represented by the token. */
	const userAccount = await users.getAccountById(decodedToken.accountId);
	if (userAccount == null) {
		throw new AuthenticationError('No refresh credential.', {
			nonFormErrors: ['Authentication expired. Please login again.']
		});
	}
	const userProfile = await users.getProfileByid(userAccount.profileId);
	if (userProfile == null) {
		throw new AuthenticationError('No refresh credential.', {
			nonFormErrors: ['Authentication expired. Please login again.']
		});
	}

	/**
	 * Validate token.
	 * TODO: When a token denylist is added, check that here.
	 * Also add the used token to the denylist.
	 * Eventually, add a logout endpoint to do this as well.
	 */

	/** Encode both new access and refresh tokens. */
	const accessToken = await encodeAccessToken(
		userAccount.id,
		userProfile.id,
		userProfile.username
	);
	const refreshToken = await encodeRefreshToken(userAccount.id);

	return {
		accessToken,
		refreshToken
	};
};
export default refresh;
