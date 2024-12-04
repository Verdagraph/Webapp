import jwt, { JwtPayload } from 'jsonwebtoken';
import { InternalFailureException } from 'common/errors';
import env from 'env';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ACCESS_TOKEN_EXPIRY_S } from '@vdt-webapp/common/src/settings';

const ACCESS_HEADER_KEY = 'Authorization'
const REFRESH_COOKIE_KEY = 'refresh'

/** The payload information carried by access tokens. */
type AccessTokenPayload = {
	/** The type of role the user has access to. */
	type: string;
	/** The ID of the user's account. */
	accountId: string;
	/** The ID of the user's profile. */
	profileId: string;
	/** The username of the user. */
	username: string;
};

/** The payload information carried by refresh tokens. */
type RefreshTokenPayload = {
	/** The ID of the user's account. */
	accountId: string;
};

/** The payload information carried by email confirmation tokens. */
type EmailConfirmationTokenPayload = {
	/** The ID of the user's account. */
	accountId: string;
};

/** The payload information carried by password reset tokens. */
type PasswordResetTokenPayload = {
	/** The ID of the user's account. */
	accountId: string;
};

/**
 * Encodes an access JWT token for a user.
 * @param accountId The account ID of the user to encode.
 * @param profileId The profile ID of the user to encode.
 * @param username The username of the user to encode.
 * @returns The encoded token.
 */
export const encodeAccessToken = (accountId: string, profileId: string, username: string): Promise<string> => {
	const payload: AccessTokenPayload = { type: 'user', accountId, profileId, username };
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			env.ACCESS_TOKEN_SECRET,
			{ expiresIn: ACCESS_TOKEN_EXPIRY_S },
			(error, token) => {
				if (error || !token) {
					reject(new InternalFailureException());
				} else resolve(token);
			}
		);
	});
};

/**
 * Encodes a refresh JWT token for a user.
 * @param accountId The ID of the user's account to encode.
 * @returns The encoded token.
 */
export const encodeRefreshToken = (accountId: string): Promise<string> => {
	const payload: RefreshTokenPayload = { accountId };
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			env.REFRESH_TOKEN_SECRET,
			{ expiresIn: env.REFRESH_TOKEN_EXPIRY_S },
			(error, token) => {
				if (error || !token) {
					reject(new InternalFailureException());
				} else resolve(token);
			}
		);
	});
};

/**
 * Encodes an email verification JWT token for a user.
 * @param accountId The ID of the user's account to encode.
 * @returns The encoded token.
 */
export const encodeEmailConfirmationToken = (accountId: string): Promise<string> => {
	const payload: EmailConfirmationTokenPayload = { accountId };
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			env.EMAIL_CONFIRMATION_TOKEN_SECRET,
			{ expiresIn: env.EMAIL_CONFIRMATION_TOKEN_EXPIRY_S },
			(error, token) => {
				if (error || !token) {
					reject(new InternalFailureException());
				} else resolve(token);
			}
		);
	});
};

/**
 * Encodes a password reset JWT token for a user.
 * @param accountId The ID of the user's account to encode.
 * @returns The encoded token.
 */
export const encodePasswordResetToken = (accountId: string): Promise<string> => {
	const payload: PasswordResetTokenPayload = { accountId };
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			env.PASSWORD_RESET_TOKEN_SECRET,
			{ expiresIn: env.PASSWORD_RESET_TOKEN_EXPIRY_S },
			(error, token) => {
				if (error || !token) {
					reject(new InternalFailureException());
				} else resolve(token);
			}
		);
	});
};

/**
 * Decodes an access token.
 * @param token The encoded access token.
 * @returns The payload of the token if it was sucessfully verified, otherwise null.
 */
export const decodeAccessToken = (token: string): Promise<AccessTokenPayload | null> => {
	return new Promise((resolve) => {
		jwt.verify(token, env.ACCESS_TOKEN_SECRET, (error, payload) => {
			if (error) {
				resolve(null);
			} else resolve(payload as AccessTokenPayload );
		});
	});
};

/**
 * Decodes a refresh token.
 * @param token The encoded refresh token.
 * @returns The payload of the token if it was sucessfully verified, otherwise null.
 */
export const decodeRefreshToken = (
	token: string
): Promise<RefreshTokenPayload | null> => {
	return new Promise((resolve) => {
		jwt.verify(token, env.REFRESH_TOKEN_SECRET, (error, payload) => {
			if (error) {
				resolve(null);
			} else resolve(payload as RefreshTokenPayload);
		});
	});
};

/**
 * Decodes an email confirmation token.
 * @param token The encoded email confirmation token.
 * @returns The payload of the token if it was sucessfully verified, otherwise null.
 */
export const decodeEmailConfirmationToken = (
	token: string
): Promise<EmailConfirmationTokenPayload | null> => {
	return new Promise((resolve) => {
		jwt.verify(token, env.REFRESH_TOKEN_SECRET, (error, payload) => {
			if (error) {
				resolve(null);
			} else resolve(payload as EmailConfirmationTokenPayload);
		});
	});
};

/**
 * Decodes a password reset token.
 * @param token The encoded password reset token.
 * @returns The payload of the token if it was sucessfully verified, otherwise null.
 */
export const decodePasswordResetToken = (
	token: string
): Promise<PasswordResetTokenPayload | null> => {
	return new Promise((resolve) => {
		jwt.verify(token, env.PASSWORD_RESET_TOKEN_SECRET, (error, payload) => {
			if (error) {
				resolve(null);
			} else resolve(payload as PasswordResetTokenPayload);
		});
	});
};

/**
 * Sets an encoded refresh token on the appropriate HTTP-only response cookie.
 * @param token The encoded refresh token.
 * @param reply Fastify reply object.
 */
export const setRefreshTokenCookie = (token: string, reply: FastifyReply) => {
	reply.cookie(REFRESH_COOKIE_KEY, token, {
		secure: env.USING_HTTPS,
		httpOnly: true,
		sameSite: env.CLIENT_SAMESITE
	});
};

/**
 * Retrieves the refresh token value from the request cookies.
 * @param request Fastify request object.
 * @returns The refresh token value, or null if none exists.
 */
export const getRefreshTokenCookie = (request: FastifyRequest): string | null => {
	return request.cookies[REFRESH_COOKIE_KEY] || null;
};

/**
 * Sets an encoded access token on the appropriate response header.
 * @param token The encoded access token.
 * @param reply Fastify reply object.
 */
export const setAccessTokenHeader = (token: string, reply: FastifyReply) => {
	reply.header(ACCESS_HEADER_KEY, token);
};

/**
 * Retrieves the access JWT from the request object.
 * @param request Fastify request object.
 * @returns The access token JWT or null.
 */
export const getAccessTokenHeader = (request: FastifyRequest): string | null => {
	const header = request.headers[ACCESS_HEADER_KEY];
	if (Array.isArray(header)) {
		return header[0];
	} else {
		return header || null;
	}
};
