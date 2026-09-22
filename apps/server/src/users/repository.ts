import { InternalFailureException } from 'common/errors.js';
import { type Db } from 'jazz-tools/backend';

import { jazzApp } from '@vdg-webapp/models/jazz';
import { type User, type UserAccount, type UserProfile } from '@vdg-webapp/models';

/** Maps a Jazz accounts row to the shape callers expect. */
function toUserAccount(row: NonNullable<Awaited<ReturnType<Db['one']>>>): UserAccount {
	const account = row as {
		id: string;
		profileId: string;
		passwordHash: string;
		verifiedEmail?: string;
		unverifiedEmailAddress?: string;
		unverifiedEmailToken?: string;
		passwordResetToken?: string;
		isActive: boolean;
	};
	return {
		id: account.id,
		profileId: account.profileId,
		passwordHash: account.passwordHash,
		verifiedEmail: account.verifiedEmail ?? null,
		unverifiedEmail: {
			address: account.unverifiedEmailAddress ?? null,
			token: account.unverifiedEmailToken ?? null
		},
		passwordResetToken: account.passwordResetToken ?? null,
		isActive: account.isActive
	} as UserAccount;
}

/** Maps a Jazz accountProfiles row to the shape callers expect. */
function toUserProfile(row: NonNullable<Awaited<ReturnType<Db['one']>>>): UserProfile {
	const profile = row as { id: string; username: string; createdAt: Date | number };
	return {
		id: profile.id,
		username: profile.username,
		createdAt: new Date(profile.createdAt)
	} as UserProfile;
}

/** Database interface for the user objects. */
export class UserRepository {
	jazzCredentialsDb: Db;
	constructor({ jazzCredentialsDb }: { jazzCredentialsDb: Db }) {
		this.jazzCredentialsDb = jazzCredentialsDb;
	}

	/** Reads. */

	/**
	 * Retrieves a user account by ID.
	 * @param id The ID of the account.
	 * @returns The retrieved account, or null if none exists.
	 */
	getAccountById = async (id: string): Promise<UserAccount | null> => {
		const account = await this.jazzCredentialsDb.one(jazzApp.accounts.where({ id }));
		return account ? toUserAccount(account) : null;
	};

	/**
	 * Retrieves a user profile by ID.
	 * @param id The ID of the profile.
	 * @returns The retrieved profile, or null if none exists.
	 */
	getProfileByid = async (id: string): Promise<UserProfile | null> => {
		const profile = await this.jazzCredentialsDb.one(
			jazzApp.accountProfiles.where({ id })
		);
		return profile ? toUserProfile(profile) : null;
	};

	/**
	 * Retrieves a user account if one exists with the verified email address.
	 * @param email The email address.
	 * @returns The retrieved account, or null if none exists.
	 */
	getAccountByVerifiedEmail = async (email: string): Promise<UserAccount | null> => {
		const account = await this.jazzCredentialsDb.one(
			jazzApp.accounts.where({ verifiedEmail: email })
		);
		return account ? toUserAccount(account) : null;
	};

	/**
	 * Retrieves a user account if one exists with unverified email address.
	 * @param email The email address.
	 * @returns The retrieved account, or null if none exists.
	 */
	getAccountByUnverifiedEmail = async (email: string): Promise<UserAccount | null> => {
		const account = await this.jazzCredentialsDb.one(
			jazzApp.accounts.where({ unverifiedEmailAddress: email })
		);
		return account ? toUserAccount(account) : null;
	};

	/**
	 * Checks the database if an email address already exists.
	 * @param email The email address.
	 * @returns True if the email already exists.
	 */
	emailExists = async (email: string): Promise<boolean> => {
		const [verified, unverified] = await Promise.all([
			this.jazzCredentialsDb.one(jazzApp.accounts.where({ verifiedEmail: email })),
			this.jazzCredentialsDb.one(
				jazzApp.accounts.where({ unverifiedEmailAddress: email })
			)
		]);
		return verified != null || unverified != null;
	};

	/**
	 * Checks the database if a username already exists.
	 * @param username The username to check.
	 * @returns True if the username already exists.
	 */
	usernameExists = async (username: string): Promise<boolean> => {
		const profile = await this.jazzCredentialsDb.one(
			jazzApp.accountProfiles.where({ username })
		);
		return profile != null;
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
		const write = await this.jazzCredentialsDb.transaction(async (tx) => {
			const profile = tx.insert(jazzApp.accountProfiles, {
				username,
				createdAt: new Date()
			});
			const account = tx.insert(jazzApp.accounts, {
				profileId: profile.id,
				passwordHash,
				...(verificationRequired
					? { unverifiedEmailAddress: email }
					: { verifiedEmail: email })
			});
			return { profile, account };
		});
		const { profile, account } = await write.wait({ tier: 'edge' });
		return { account: toUserAccount(account), profile: toUserProfile(profile) };
	};

	/**
	 * Updates the user's username in the database.
	 * @param profileId The ID of the user's profile object.
	 * @param username The new username.
	 */
	updateUsername = async (profileId: string, username: string) => {
		this.jazzCredentialsDb.update(jazzApp.accountProfiles, profileId, { username });
	};

	/**
	 * Updates the user's password in the database.
	 * @param accountId The ID of the user's account object.
	 * @param passwordHash The new hashed password.
	 */
	updatePassword = async (accountId: string, passwordHash: string) => {
		this.jazzCredentialsDb.update(jazzApp.accounts, accountId, { passwordHash });
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
		if (verificationRequired) {
			this.jazzCredentialsDb.update(jazzApp.accounts, accountId, {
				unverifiedEmailAddress: email
			});
		} else {
			this.jazzCredentialsDb.update(jazzApp.accounts, accountId, { verifiedEmail: email });
		}
	};

	/**
	 * Adds an email confirmation token to a user's account.
	 * Assumes an unverified email exists on the user.
	 * @param accountId The ID of the user's account object.
	 * @param token The JWT confirmation token to add.
	 */
	addEmailVerificationToken = async (accountId: string, token: string) => {
		this.jazzCredentialsDb.update(jazzApp.accounts, accountId, {
			unverifiedEmailToken: token
		});
	};

	/**
	 * Moves the user's unverified email to the verified email attribute.
	 * @param accountId The ID of the user's account object.
	 */
	verifyEmail = async (accountId: string) => {
		const account = await this.jazzCredentialsDb.one(
			jazzApp.accounts.where({ id: accountId })
		);
		const newVerifiedEmail = account?.unverifiedEmailAddress;
		if (!newVerifiedEmail) {
			throw new InternalFailureException(
				'No unverified email on user when one was expected.'
			);
		}
		this.jazzCredentialsDb.update(jazzApp.accounts, accountId, {
			verifiedEmail: newVerifiedEmail,
			unverifiedEmailAddress: null,
			unverifiedEmailToken: null
		});
	};

	/**
	 * Adds a password reset token to a user's account.
	 * @param accountId The ID of the user's account object.
	 * @param token The JWT confirmation token to add.
	 */
	addPasswordResetToken = async (accountId: string, token: string) => {
		this.jazzCredentialsDb.update(jazzApp.accounts, accountId, {
			passwordResetToken: token
		});
	};
}
