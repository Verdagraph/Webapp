import { z as zod } from 'zod';
import {
	WorkspaceCreateCommand,
	PlantingAreaCreateCommand,
	type Workspace
} from '@vdt-webapp/common';
import { getClientOrError } from '$data/users/auth';
import { slugify } from '$lib/utils';
import triplit from '$data/triplit';
import { AppError } from '@vdt-webapp/common/src/errors';
import { exists } from '@triplit/client';
import { requireRole } from '$data/gardens/commands';

/** Creates a new workspace in a garden. */
export const workspaceCreate = {
	schema: WorkspaceCreateCommand,
	mutation: async function (
		data: zod.infer<typeof WorkspaceCreateCommand>
	): Promise<Workspace> {
		/** Retrieve client and authorize. */
		await requireRole(data.gardenId, 'ADMIN');

		/** Generate workspace slug from name. */
		const workspaceSlug = slugify(data.name);

		/** Validate garden-scoped unique workspace slug requirement. */
		const existingWorkspace = await triplit.fetchOne(
			triplit
				.query('workspaces')
				.where([
					['gardenId', '=', data.gardenId],
					['slug', '=', workspaceSlug]
				])
				.build()
		);
		if (existingWorkspace) {
			throw new AppError('Workspace slug already exists.', {
				fieldErrors: { name: ['This workspace name already exists in this garden.'] }
			});
		}

		/** Add the workspace */
		const result = await triplit.insert('workspaces', {
			gardenId: data.gardenId,
			name: data.name,
			slug: workspaceSlug,
			description: data.description
		});
		if (result.output == null) {
			throw new AppError('Failed to create workspace.', {
				nonFieldErrors: ['Failed to create workspace.']
			});
		}
		return result.output;
	}
};

/** Updates a workspace. */
/**
 * 
export const workspaceUpdate = {
	schema: zod.object({
		workspace_ref: zod.string().uuid(),
		name: workspaceFieldSchemas.workspace_name.optional(),
		description: workspaceFieldSchemas.workspace_description.optional()
	}),
	mutation: () => {
		return useMutation(function (data: WorkspaceUpdateCommand) {
			return workspaceUpdateCommandOp(data);
		});
	}
};
*/

/** Deletes a workspace. */
/**
 * 
export const workspaceDelete = {
	schema: zod.object({
		workspace_ref: zod.string().uuid()
	}),
	mutation: () => {
		return useMutation(function (data: WorkspaceDeleteCommand) {
			return workspaceDeleteCommandOp(data);
		});
	}
};

/** Creates a new planting area in a workspace. */
export const plantingAreaCreate = {
	schema: PlantingAreaCreateCommand,
	mutation: async (data: zod.infer<typeof PlantingAreaCreateCommand>) => {}
};

/** Updates a planting area. */
/**
 * 
export const plantingAreaUpdate = {
	schema: zod.object({
		workspace_ref: zod.string().uuid(),
		planting_area_id: zod.string().uuid(),
		name: workspaceFieldSchemas.planting_area_name.optional(),
		description: workspaceFieldSchemas.planting_area_description.optional()
	}),
	mutation: () => {
		return useMutation(function (data: PlantingAreaUpdateCommand) {
			return plantingAreaUpdateCommandOp(data);
		});
	}
};

*/
/** Deletes a planting area. */
/**
 * 
export const plantingAreaDelete = {
	schema: zod.object({
		workspace_ref: zod.string().uuid(),
		planting_area_id: zod.string().uuid()
	}),
	mutation: () => {
		return useMutation(function (data: PlantingAreaDeleteCommand) {
			return plantingAreaDeleteCommandOp(data);
		});
	}
};
*/
