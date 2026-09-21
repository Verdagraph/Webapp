import { type TableRow, schema as s } from 'jazz-tools';

/**
 * Placeholder users table. Real user/auth data stays on the existing
 * Triplit-backed `accounts`/`profiles` collections until that migration
 * lands; this table only exists so garden membership lookups by username
 * have something to query against inside the Jazz schema.
 */
export const usersStub = {
	users: s.table({
		username: s.string()
	})
};
export type JazzUserProfile = TableRow<typeof usersStub, 'users'>;

/** Minimal authenticated-user shape used by Jazz controllers. */
export type JazzUser = {
	profile: JazzUserProfile;
};
