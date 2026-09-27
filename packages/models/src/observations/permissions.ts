import { type PolicyContext, schema as s } from 'jazz-tools';

import type { AppSchema } from '../schema.js';
import { gardenAdminOrEditor, gardenReadable } from '../shared/gardenScopedPolicies.js';

type ObservationPolicyContext = PolicyContext<AppSchema>;

export function constructObservationPermissions(app: AppSchema) {
	return s.definePermissions(app, (ctx) => {
		constructObservationsPolicy(ctx);
	});
}

export function constructObservationsPolicy(ctx: ObservationPolicyContext) {
	const { policy } = ctx;
	policy.observations.allowRead.where(gardenReadable(ctx));
	policy.observations.allowInsert.where(gardenAdminOrEditor(ctx));
	policy.observations.allowUpdate.where(gardenAdminOrEditor(ctx));
	policy.observations.allowDelete.where(gardenAdminOrEditor(ctx));
}
