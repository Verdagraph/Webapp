import { type PolicyContext, schema as s } from 'jazz-tools';

import type { AppSchema } from '../schema.js';
import { gardenAdminOrEditor, gardenReadable } from '../shared/gardenScopedPolicies.js';

type EnvironmentPolicyContext = PolicyContext<AppSchema>;

export function constructEnvironmentPermissions(app: AppSchema) {
	return s.definePermissions(app, (ctx) => {
		constructEnvironmentsPolicy(ctx);
	});
}

export function constructEnvironmentsPolicy(ctx: EnvironmentPolicyContext) {
	const { policy } = ctx;
	policy.environments.allowRead.where(gardenReadable(ctx));
	policy.environments.allowInsert.where(gardenAdminOrEditor(ctx));
	policy.environments.allowUpdate.where(gardenAdminOrEditor(ctx));
	policy.environments.allowDelete.where(gardenAdminOrEditor(ctx));
}
