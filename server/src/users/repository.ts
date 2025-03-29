import { HttpClient as TriplitHttpClient, or } from '@triplit/client';
import { type User, type UserAccount, type UserProfile } from '@vdg-webapp/common';
import { InternalFailureException } from 'common/errors';

/** Database interface for the user objects. */
export class UserRepository {
	triplit: TriplitHttpClient;
	constructor({ triplit }: { triplit: TriplitHttpClient }) {
		this.triplit = triplit;
	}

	/** Reads. */

	/**
	 * Retrieves a user account by ID.
	 * @param id The ID of the account.
	 * @returns The retrieved account, or null if none exists.
	 */
	getAccountById = async (id: string): Promise<UserAccount | null> => {
		const user = await this.triplit.fetchById('accounts', id);
		return (user as UserAccount) || null;
	};

	/**
	 * Retrieves a user profile by ID.
	 * @param id The ID of the profile.
	 * @returns The retrieved profile, or null if none exists.
	 */
	getProfileByid = async (id: string): Promise<UserProfile | null> => {
		const user = await this.triplit.fetchById('profiles', id);
		return (user as UserProfile) || null;
	};

	/**
	 * Retrieves a user account if one exists with the verified email address.
	 * @param email The email address.y
	 * @returns The retrieved account, or null if none exists. The profile is included.
	 */
	getAccountByVerifiedEmail = async (email: string): Promise<UserAccount | null> => {
		const user = await this.triplit.fetchOne({
			collectionName: 'accounts',
			where: [['verifiedEmail', '=', email]]
		});
		return (user as UserAccount) || null;
	};

	/**
	 * Retrieves a user account if one exists with unverified email address.
	 * @param email The email address.
	 * @returns The retrieved account, or null if none exists.
	 */
	getAccountByUnverifiedEmail = async (email: string): Promise<UserAccount | null> => {
		const user = await this.triplit.fetchOne({
			collectionName: 'accounts',
			where: [['unverifiedEmail.address', '=', email]]
		});
		return (user as UserAccount) || null;
	};

	/**
	 * Checks the database if an email address already exists.
	 * @param email The email address.
	 * @returns True if the email already exists.
	 */
	emailExists = async (email: string): Promise<boolean> => {
		const user = await this.triplit.fetch({
			collectionName: 'accounts',
			where: [
				or([
					['verifiedEmail', '=', email],
					['unverifiedEmail.address', '=', email]
				])
			]
		});
		return !(user == null);
	};

	/**
	 * Checks the database if a username already exists.
	 * @param username The username to check.
	 * @returns True if the username already exists.
	 */
	usernameExists = async (username: string): Promise<boolean> => {
		const user = await this.triplit.fetch({
			collectionName: 'profiles',
			where: [['username', '=', username]]
		});
		return !(user == null);
	};

	/** Writes. */

	/**
	 * Inserts a new profile and account into the database.
	 * @param username The username.
	 * @param passwordHash The hashed password.
	 * @param email The email address.
	 * @param verificationRequired If true, the email will be set
	 * to unverified. If false, the email begins verified.
	 * @returns The created user account.
	 */
	create = async (
		username: string,
		passwordHash: string,
		email: string,
		verificationRequired: boolean
	): Promise<User> => {
		const profile = await this.triplit.insert('profiles', { username });
		const partialAccount: Partial<UserAccount> = {
			profileId: profile.id,
			passwordHash: passwordHash
		};
		if (verificationRequired) {
			partialAccount.unverifiedEmail = { address: email, token: null };
		} else {
			partialAccount.verifiedEmail = email;
		}
		const account = await this.triplit.insert('accounts', partialAccount);
		return { account, profile } as User;
	};

	/**
	 * Updates the user's username in the database.
	 * @param profileId The ID of the user's profile object.
	 * @param username The new username.
	 */
	updateUsername = async (profileId: string, username: string) => {
		await this.triplit.update('profiles', profileId, async (profile) => {
			profile.username = username;
		});
	};

	/**
	 * Updates the user's password in the database.
	 * @param accountId The ID of the user's account object.
	 * @param passwordHash The new hashed password.
	 */
	updatePassword = async (accountId: string, passwordHash: string) => {
		await this.triplit.update('accounts', accountId, async (account) => {
			account.passwordHash = passwordHash;
		});
	};

	/**
	 * Updates the user's email in the database.
	 * @param accountId The ID of the user's account object.
	 * @param email The new email address.
	 * @param verificationRequired If true, the email will be set
	 * to unverified. If false, the email begins verified.
	 */
	updateEmail = async (
		accountId: string,
		email: string,
		verificationRequired: boolean
	) => {
		await this.triplit.update('accounts', accountId, async (account) => {
			if (verificationRequired) {
				account.unverifiedEmail = { address: email, confirmationKey: null };
			} else {
				account.verifiedEmail = email;
			}
		});
	};

	/**
	 * Adds an email confirmation token to a user's account.
	 * Assumes an unverified email exists on the user.
	 * @param accountId The ID of the user's account object.
	 * @param token The JWT confirmation token to add.
	 */
	addEmailVerificationToken = async (accountId: string, token: string) => {
		await this.triplit.update('accounts', accountId, async (account) => {
			account.unverifiedEmail.token = token;
		});
	};

	/**
	 * Moves the user's unverified email to the verified email attribute.
	 * @param accountId The ID of the user's account object.
	 */
	verifyEmail = async (accountId: string) => {
		await this.triplit.update('accounts', accountId, async (account) => {
			const newVerifiedEmail = account.unverifiedEmail.address;
			if (!newVerifiedEmail) {
				throw new InternalFailureException(
					'No unverified email on user when one was expected.'
				);
			}
			account.verifiedEmail = newVerifiedEmail;
			account.unverifiedEmail.address = null;
			account.unverifiedEmail.token = null;
		});
	};

	/**
	 * Adds a password reset token to a user's account.
	 * @param accountId The ID of the user's account object.
	 * @param token The JWT confirmation token to add.
	 */
	addPasswordResetToken = async (accountId: string, token: string) => {
		await this.triplit.update('accounts', accountId, async (account) => {
			account.passwordResetToken = token;
		});
	};
}
