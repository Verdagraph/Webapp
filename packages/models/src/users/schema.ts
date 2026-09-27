import { type TableRow, schema as s } from 'jazz-tools';

/**
 * Public username-lookup mirror, keyed by a Jazz-native account id. Every
 * other domain (garden membership, cultivar/collection ownership, draft
 * bucket creators, etc.) references users through this table's row ids via
 * `s.ref('users')`, so membership and ownership can be resolved without
 * touching credential data.
 *
 * Real auth data (password hash, email, tokens) lives in the separate
 * `credentials/` domain instead, which is never readable by an end-user
 * session - only a trusted server-minted service token can read/write it.
 * A row here is created once a user completes signup, keyed by the same id
 * their JWT carries as its subject.
 */
export const userSchema = {
	users: s.table({
		username: s.string()
	})
};
export type UserProfile = TableRow<typeof userSchema, 'users'>;

/** Minimal authenticated-user shape used by controllers. */
export type User = {
	profile: UserProfile;
};
