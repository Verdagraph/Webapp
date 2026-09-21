import { type PolicyContext, schema as s } from 'jazz-tools';

import { gardenAdminOnly, gardenAdminOrEditor, gardenReadable } from '../shared/gardenScopedPolicies.js';
import type { JazzApp } from '../schema.js';

type WorkspacePolicyContext = PolicyContext<JazzApp>;

export function constructWorkspacePermissions(app: JazzApp) {
	return s.definePermissions(app, (ctx) => {
		constructWorkspacesPolicy(ctx);
	});
}

export function constructWorkspacesPolicy(ctx: WorkspacePolicyContext) {
	const { policy } = ctx;

	policy.coordinates.allowRead.where(gardenReadable(ctx));
	policy.coordinates.allowInsert.where(gardenAdminOrEditor(ctx));
	policy.coordinates.allowUpdate.where(gardenAdminOrEditor(ctx));
	policy.coordinates.allowDelete.where(gardenAdminOrEditor(ctx));

	policy.geometries.allowRead.where(gardenReadable(ctx));
	policy.geometries.allowInsert.where(gardenAdminOrEditor(ctx));
	policy.geometries.allowUpdate.where(gardenAdminOrEditor(ctx));
	policy.geometries.allowDelete.where(gardenAdminOrEditor(ctx));

	policy.geometryHistories.allowRead.where(gardenReadable(ctx));
	policy.geometryHistories.allowInsert.where(gardenAdminOrEditor(ctx));
	policy.geometryHistories.allowUpdate.where(gardenAdminOrEditor(ctx));
	policy.geometryHistories.allowDelete.where(gardenAdminOrEditor(ctx));

	policy.locations.allowRead.where(gardenReadable(ctx));
	policy.locations.allowInsert.where(gardenAdminOrEditor(ctx));
	policy.locations.allowUpdate.where(gardenAdminOrEditor(ctx));
	policy.locations.allowDelete.where(gardenAdminOrEditor(ctx));

	policy.locationHistories.allowRead.where(gardenReadable(ctx));
	policy.locationHistories.allowInsert.where(gardenAdminOrEditor(ctx));
	policy.locationHistories.allowUpdate.where(gardenAdminOrEditor(ctx));
	policy.locationHistories.allowDelete.where(gardenAdminOrEditor(ctx));

	policy.plantingAreas.allowRead.where(gardenReadable(ctx));
	policy.plantingAreas.allowInsert.where(gardenAdminOnly(ctx));
	policy.plantingAreas.allowUpdate.where(gardenAdminOnly(ctx));
	policy.plantingAreas.allowDelete.where(gardenAdminOnly(ctx));

	policy.workspaces.allowRead.where(gardenReadable(ctx));
	policy.workspaces.allowInsert.where(gardenAdminOnly(ctx));
	policy.workspaces.allowUpdate.where(gardenAdminOnly(ctx));
	policy.workspaces.allowDelete.where(gardenAdminOnly(ctx));
}
