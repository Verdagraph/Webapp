import { type TableRow, schema as s } from 'jazz-tools';

/**
 * Credential storage, ported from Triplit's `accounts`/`profiles`
 * collections. Distinct from the `users` table in `../users.ts`, which
 * mirrors public profile data keyed by a Jazz-native account id once
 * someone has completed a Jazz login; these tables exist before that -
 * signup assigns their own id, used as the JWT subject from the start -
 * and are never readable by any end-user session (see permissions.ts).
 */
export const usersCredentialSchema = {
	accountProfiles: s.table({
		/** Username. Unique and used within the app to search for users. */
		username: s.string(),
		/**
		 * Kept as a real field rather than relying on Jazz's built-in
		 * $createdAt: that provenance column isn't exposed on plain query
		 * results, only usable within queries/ordering/permissions. Must be
		 * supplied explicitly at insert time.
		 */
		createdAt: s.timestamp()
	}),
	accounts: s.table({
		/** The associated profile. */
		profileId: s.ref('accountProfiles'),
		/** Hashed password. */
		passwordHash: s.string(),
		/** Primary email address. Only set once verified. */
		verifiedEmail: s.string().optional(),
		/**
		 * Pending email change, kept separate from verifiedEmail to avoid
		 * replacing it before confirmation.
		 */
		unverifiedEmailAddress: s.string().optional(),
		/** JWT confirmation token sent to the user for email verification. */
		unverifiedEmailToken: s.string().optional(),
		/** JWT confirmation token used to confirm a password reset. */
		passwordResetToken: s.string().optional(),
		/** Set to false for inactive users. */
		isActive: s.boolean().default(true)
	})
};

export type AccountProfile = TableRow<typeof usersCredentialSchema, 'accountProfiles'>;
export type Account = TableRow<typeof usersCredentialSchema, 'accounts'>;
