import { z as zod } from 'zod';
import {
	WorkspaceCreateCommand,
	PlantingAreaCreateCommand,
	GeometryCreateCommand,
	type Workspace,
	type Geometry
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

/** Creates a new planting area in a workspace. */
export const plantingAreaCreate = {
	schema: PlantingAreaCreateCommand,
	mutation: async (data: zod.infer<typeof PlantingAreaCreateCommand>) => {
		const { garden } = await requireRole(data.gardenId, 'ADMIN');

		/** Retrieve workspace. */
		const workspace = await triplit.fetchOne(
			triplit.query('workspaces').id(data.workspaceId).build()
		);
		if (workspace == null) {
			throw new AppError(`Failed to retrieve workspace ${data.workspaceId}`, {
				nonFormErrors: ['Failed to retrieve workspace.']
			});
		}

		await triplit.transact(async (transaction) => {
			/** Persist geometry. */
			let geometry: Omit<Geometry, 'id'> = {
				gardenId: garden.id,
				type: data.geometry.type,
				date: data.geometry.date,
				scaleFactor: data.geometry.scaleFactor,
				rotation: data.geometry.rotation
			};
			switch (data.geometry.type) {
				case 'RECTANGLE':
					geometry.rectangleAttributes = data.geometry.rectangleAttributes;
					break;
				case 'POLYGON':
					geometry.polygonAttributes = data.geometry.polygonAttributes;
					break;
				case 'ELLIPSE':
					geometry.ellipseAttributes = data.geometry.ellipseAttributes;
					break;
				case 'LINES':
					const coordinateIds: string[] = [];
					for (const point of data.geometry.linesAttributes.coordinates) {
						const coordinate = await transaction.insert('coordinates', {
							gardenId: garden.id,
							x: point.x,
							y: point.y
						});
						coordinateIds.push(coordinate.id);
					}
					geometry.linesAttributes = {
						coordinateIds: new Set(coordinateIds),
						coordinates: data.geometry.linesAttributes.coordinates,
						closed: data.geometry.linesAttributes.closed
					};
					break;
			}
			geometry = await transaction.insert('geometries', geometry);

			/** Persist locations. */
			const locationCoordinate = await transaction.insert('coordinates', {
				gardenId: garden.id,
				x: data.location.coordinate.x,
				y: data.location.coordinate.y
			});
			const location = await transaction.insert('locations', {
				gardenId: garden.id,
				workspaceId: workspace.id,
				coordinateId: locationCoordinate.id,
				date: data.geometry.date
			});
			const locationHistory = await transaction.insert('locationHistories', {
				gardenId: garden.id,
				locationIds: new Set([location.id])
			});

			/** Persist planting area. */
			await transaction.insert('plantingAreas', {
				gardenId: garden.id,
				name: data.name,
				description: data.description,
				geometryId: geometry.gardenId,
				locationHistoryId: locationHistory.id,
				grid: data.grid,
				depth: data.depth
			});
		});
	}
};
