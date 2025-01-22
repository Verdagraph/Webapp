import { z as zod } from 'zod';
import {
	WorkspaceCreateCommand,
	PlantingAreaCreateCommand,
	LocationCreateCommand,
	type Workspace,
	type Geometry,
	type Location,
	type LocationHistory,
	GeometryCreateCommand,
	TriplitTransaction
} from '@vdt-webapp/common';
import { slugify } from '$lib/utils';
import triplit from '$data/triplit';
import { AppError } from '@vdt-webapp/common/src/errors';
import { requireRole } from '$data/gardens/commands';

/** Helpers. */

/**
 * Insert a geometry into the database.
 * @param gardenId The ID of the garden.
 * @param data The geometry create command.
 * @param transaction The database transaction.
 * @returns The geometry after insertion.
 */
export async function insertGeometry(
	gardenId: string,
	data: zod.infer<typeof GeometryCreateCommand>,
	transaction: TriplitTransaction
): Promise<Geometry> {
	let geometry: Omit<Geometry, 'id'> = {
		gardenId: gardenId,
		type: data.type,
		date: data.date,
		scaleFactor: data.scaleFactor,
		rotation: data.rotation
	};
	switch (data.type) {
		case 'RECTANGLE':
			geometry.rectangleAttributes = data.rectangleAttributes;
			break;
		case 'POLYGON':
			geometry.polygonAttributes = data.polygonAttributes;
			break;
		case 'ELLIPSE':
			geometry.ellipseAttributes = data.ellipseAttributes;
			break;
		case 'LINES': {
			const coordinateIds: string[] = [];
			for (const point of data.linesAttributes.coordinates) {
				const coordinate = await transaction.insert('coordinates', {
					gardenId: gardenId,
					x: point.x,
					y: point.y
				});
				coordinateIds.push(coordinate.id);
			}
			geometry.linesAttributes = {
				coordinateIds: new Set(coordinateIds),
				coordinates: data.linesAttributes.coordinates,
				closed: data.linesAttributes.closed
			};
			break;
		}
	}
	return await transaction.insert('geometries', geometry);
}

/**
 * Insert a new location history into the database.
 * @param gardenId The ID of the garden.
 * @param data The location create command.
 * @param transaction The database transaction.
 * @returns The location history after insertion.
 */
export async function insertNewLocationHistory(
	gardenId: string,
	workspaceId: string,
	data: zod.infer<typeof LocationCreateCommand>,
	transaction: TriplitTransaction
): Promise<LocationHistory> {
	const location = await transaction.insert('locations', {
		gardenId: gardenId,
		workspaceId: workspaceId,
		x: data.coordinate.x,
		y: data.coordinate.y,
		date: data.date
	});
	return await transaction.insert('locationHistories', {
		gardenId: gardenId,
		locationIds: new Set([location.id]),
		workspaceIds: new Set([workspaceId])
	});
}

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
			const geometry = await insertGeometry(data.gardenId, data.geometry, transaction);

			/** Persist locations. */
			const locationHistory = await insertNewLocationHistory(
				garden.id,
				workspace.id,
				data.location,
				transaction
			);

			/** Persist planting area. */
			await transaction.insert('plantingAreas', {
				gardenId: garden.id,
				name: data.name,
				description: data.description,
				geometryId: geometry.id,
				locationHistoryId: locationHistory.id,
				grid: data.grid,
				depth: data.depth
			});

			console.log('completed?');
		});
	}
};

export async function plantingAreaTranslate(id: string, newLocation: Location) {}
