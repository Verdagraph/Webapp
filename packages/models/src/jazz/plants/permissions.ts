import { type PolicyContext, schema as s } from 'jazz-tools';

import type { JazzApp } from '../schema.js';
import { gardenAdminOrEditor, gardenReadable } from '../shared/gardenScopedPolicies.js';

type PlantPolicyContext = PolicyContext<JazzApp>;

export function constructPlantPermissions(app: JazzApp) {
	return s.definePermissions(app, (ctx) => {
		constructPlantsPolicy(ctx);
	});
}

export function constructPlantsPolicy(ctx: PlantPolicyContext) {
	const { policy } = ctx;

	policy.lifespans.allowRead.where(gardenReadable(ctx));
	policy.lifespans.allowInsert.where(gardenAdminOrEditor(ctx));
	policy.lifespans.allowUpdate.where(gardenAdminOrEditor(ctx));
	policy.lifespans.allowDelete.where(gardenAdminOrEditor(ctx));

	policy.plants.allowRead.where(gardenReadable(ctx));
	policy.plants.allowInsert.where(gardenAdminOrEditor(ctx));
	policy.plants.allowUpdate.where(gardenAdminOrEditor(ctx));
	policy.plants.allowDelete.where(gardenAdminOrEditor(ctx));

	policy.plantGroups.allowRead.where(gardenReadable(ctx));
	policy.plantGroups.allowInsert.where(gardenAdminOrEditor(ctx));
	policy.plantGroups.allowUpdate.where(gardenAdminOrEditor(ctx));
	policy.plantGroups.allowDelete.where(gardenAdminOrEditor(ctx));

	policy.draftBuckets.allowRead.where(gardenReadable(ctx));
	policy.draftBuckets.allowInsert.where(gardenAdminOrEditor(ctx));
	policy.draftBuckets.allowUpdate.where(gardenAdminOrEditor(ctx));
	policy.draftBuckets.allowDelete.where(gardenAdminOrEditor(ctx));
}
