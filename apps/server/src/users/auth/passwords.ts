import * as argon2 from 'argon2';
import { InternalFailureException } from 'common/errors.js';

/**
 * Hashes a password.
 * @param password The plaintext password to hash.
 * @returns The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
	try {
		return await argon2.hash(password);
	} catch {
		throw new InternalFailureException();
	}
};

/**
 * Compares a plaintext password with a stored hashed password.
 * @param pasword The plaintext password.
 * @param hashedPassword The stored hashed password.
 * @returns True if the plaintext password is correct.
 */
export const verifyPassword = async (
	pasword: string,
	hashedPassword: string
): Promise<boolean> => {
	try {
		return await argon2.verify(hashedPassword, pasword);
	} catch {
		throw new InternalFailureException();
	}
};
