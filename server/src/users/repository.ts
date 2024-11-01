import { HttpClient as TriplitHttpClient, or } from '@triplit/client';
import { UserAccount } from '@vdt-webapp/common/src/user/schema';
import { InternalFailureException } from 'common/errors';

/** Database interface for the user objects. */
export class UserRepository {
	triplit: TriplitHttpClient;
	constructor(triplit: TriplitHttpClient) {
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
	 * Retrieves a user account if one exists with the verified email address.
	 * @param email The email address.
	 * @returns The retrieved account, or null if none exists.
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
	 */
	create = async (
		username: string,
		passwordHash: string,
		email: string,
		verificationRequired: boolean
	) => {
		const profile = await this.triplit.insert('profiles', { username });
		const account: Partial<UserAccount> = {
			profileId: profile.id,
			passwordHash: passwordHash
		};
		if (verificationRequired) {
			account.unverifiedEmail = { address: email, token: null };
		} else {
			account.verifiedEmail = email;
		}
		await this.triplit.insert('accounts', account);
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
}
