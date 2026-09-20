import { type TableRow, schema as s } from 'jazz-tools';

/**
 * Placeholder users table for the Jazz spike.
 * Real user/auth data stays on the existing Triplit-backed `accounts`/`profiles`
 * collections; this table only exists so garden membership lookups by username
 * have something to query against inside the Jazz schema during the spike.
 */
export const usersStub = {
	users: s.table({
		username: s.string()
	})
};
export type JazzUserProfile = TableRow<typeof usersStub, 'users'>;

/** Minimal authenticated-user shape used by Jazz controllers during the spike. */
export type JazzUser = {
	profile: JazzUserProfile;
};
