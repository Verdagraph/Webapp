import { type PolicyContext, schema as s } from 'jazz-tools';

import type { AppSchema } from '../schema.js';

type UsersCredentialPolicyContext = PolicyContext<AppSchema>;

export function constructUsersCredentialPermissions(app: AppSchema) {
	return s.definePermissions(app, (ctx) => {
		constructUsersCredentialPolicy(ctx);
	});
}

/**
 * Credential tables are never readable or writable by an end-user session,
 * however authenticated - only a session whose JWT carries a `role: service`
 * claim, minted by the server itself for this purpose (see
 * apps/server/src/users/auth/tokens.ts). A client's own account/profile view
 * is served through the REST API, not a direct Jazz query.
 */
export function constructUsersCredentialPolicy(ctx: UsersCredentialPolicyContext) {
	const { policy, session } = ctx;

	const isTrustedService = session.where({ 'claims.role': 'service' });

	policy.accountProfiles.allowRead.where(isTrustedService);
	policy.accountProfiles.allowInsert.where(isTrustedService);
	policy.accountProfiles.allowUpdate.where(isTrustedService);
	policy.accountProfiles.allowDelete.where(isTrustedService);

	policy.accounts.allowRead.where(isTrustedService);
	policy.accounts.allowInsert.where(isTrustedService);
	policy.accounts.allowUpdate.where(isTrustedService);
	policy.accounts.allowDelete.where(isTrustedService);
}
