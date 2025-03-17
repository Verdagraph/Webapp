import {
	historySelectDay,
	type TriplitTransaction,
	WorkspaceCreateCommandSchema,
	type WorkspaceCreateCommand,
	PlantingAreaCreateCommandSchema,
	type PlantingAreaCreateCommand,
	LocationCreateCommand,
	type Workspace,
	type Geometry,
	type LocationHistory,
	GeometryCreateCommand,
	GeometryUpdateCommand,
	type LocationHistoryUpdateCommand,
	PlantingAreaUpdateCommandSchema,
	type PlantingAreaUpdateCommand
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
export async function geometryCreate(
	gardenId: string,
	data: GeometryCreateCommand,
	transaction: TriplitTransaction
): Promise<Omit<Geometry, 'linesCoordinates'>> {
	const coordinateIds: string[] = [];
	if (data.linesCoordinates && data.type === 'LINES') {
		for (const point of data.linesCoordinates) {
			const coordinate = await transaction.insert('coordinates', {
				gardenId: gardenId,
				x: point.x,
				y: point.y
			});
			coordinateIds.push(coordinate.id);
		}
	}

	let geometry: Omit<Geometry, 'id' | 'linesCoordinates'> = {
		gardenId: gardenId,
		type: data.type,
		date: data.date,
		scaleFactor: data.scaleFactor,
		rotation: data.rotation,
		rectangleLength: data.rectangleLength,
		rectangleWidth: data.rectangleWidth,
		polygonNumSides: data.polygonNumSides,
		polygonRadius: data.polygonRadius,
		ellipseLength: data.ellipseLength,
		ellipseWidth: data.ellipseWidth,
		linesCoordinateIds: new Set(coordinateIds),
		linesClosed: data.linesClosed
	};

	return await transaction.insert('geometries', geometry);
}

/**
 * Given a geometry partial object, which is a geometry object
 * where all values (including those of the nested attribute objects)
 * are optional, add these updated to Triplit.
 * @param id The ID of the geometry to update.
 * @param newGeometry The attributes to update.
 */
export async function geometryUpdate(id: string, data: GeometryUpdateCommand) {
	const geometry = await triplit.fetchOne(triplit.query('geometries').Id(id));
	if (!geometry) {
		throw new AppError('Geometry does not exist.', {
			nonFormErrors: ['Failed to update object geometry.']
		});
	}
	console.log(data);

	await triplit.transact(async (transaction) => {
		/**
		 * The lines geometry update is a little trickier to handle
		 * because the points are connected via a relation.
		 * The new geometry may have the same number of points,
		 * or it may have more or less.
		 * The approach taken is to simply delete all associated
		 * coordinates and add new ones to reflect the new geometry.
		 * This is only necessary if the new geometry has specified
		 * a new list of coordinates.
		 */
		const coordinateIds: string[] = [];
		if (data.linesCoordinates) {
			/** Delete existing coordinates. */
			if (geometry.linesCoordinateIds) {
				for (const coordinateId of geometry.linesCoordinateIds) {
					await transaction.delete('coordinates', coordinateId);
				}
			}

			/** Add new coordinates. */
			for (const point of data.linesCoordinates) {
				const coordinate = await transaction.insert('coordinates', {
					gardenId: geometry.gardenId,
					x: point.x,
					y: point.y
				});
				coordinateIds.push(coordinate.id);
			}
		}

		console.log(coordinateIds);

		await transaction.update('geometries', geometry.id, (geometry) => {
			if (data.type) {
				geometry.type = data.type;
			}
			if (data.date) {
				geometry.date = data.date;
			}
			if (data.scaleFactor) {
				geometry.scaleFactor = data.scaleFactor;
			}
			if (data.rotation) {
				geometry.rotation = data.rotation;
			}
			if (data.rectangleLength) {
				geometry.rectangleLength = data.rectangleLength;
			}
			if (data.rectangleWidth) {
				geometry.rectangleWidth = data.rectangleWidth;
			}
			if (data.polygonNumSides) {
				geometry.polygonNumSides = data.polygonNumSides;
			}
			if (data.polygonRadius) {
				geometry.polygonRadius = data.polygonRadius;
			}
			if (data.ellipseLength) {
				geometry.ellipseLength = data.ellipseLength;
			}
			if (data.ellipseWidth) {
				geometry.ellipseWidth = data.ellipseWidth;
			}
			if (data.linesCoordinates) {
				geometry.linesCoordinateIds = new Set(coordinateIds);
			}
			if (data.linesClosed) {
				geometry.linesClosed = data.linesClosed;
			}
		});
	});
}

/**
 * Insert a new location history into the database.
 * @param data The location create command.
 * @param transaction The database transaction.
 * @returns The location history after insertion.
 */
export async function locationHistoryCreate(
	data: LocationCreateCommand,
	transaction: TriplitTransaction
): Promise<Omit<LocationHistory, 'locations'>> {
	const location = await transaction.insert('locations', {
		gardenId: data.gardenId,
		workspaceId: data.workspaceId,
		x: data.coordinate.x,
		y: data.coordinate.y,
		date: data.date
	});
	return await transaction.insert('locationHistories', {
		gardenId: data.gardenId,
		locationIds: new Set([location.id]),
		workspaceIds: new Set([data.workspaceId])
	});
}

/**
 * Updates a location history with a new position.
 * If a position already exists in this location history
 * at the same day at the given date, that location is updated.
 * If not, a new location is created.
 * @param data The history update command.
 */
export async function locationHistoryUpdate(data: LocationHistoryUpdateCommand) {
	const locationHistory = await triplit.fetchOne(
		triplit.query('locationHistories').Id(data.id).Include('locations')
	);
	if (!locationHistory) {
		throw new AppError('Location history does not exist.', {
			nonFormErrors: ['Failed to update object location.']
		});
	}

	/** If a location already exists at the given day, update it. */
	const existingLocation = historySelectDay(locationHistory.locations, data.date);
	if (existingLocation) {
		await triplit.update('locations', existingLocation.id, (location) => {
			location.x = data.coordinate.x;
			location.y = data.coordinate.y;
		});

		/** If no location exists, create a new one. */
	} else {
		await triplit.transact(async (transaction) => {
			const location = await transaction.insert('locations', {
				gardenId: locationHistory.gardenId,
				workspaceId: data.workspaceId,
				x: data.coordinate.x,
				y: data.coordinate.y,
				date: data.date
			});
			await triplit.update(
				'locationHistories',
				locationHistory.id,
				(locationHistory) => {
					locationHistory.locationIds.add(location.id);
					if (!locationHistory.workspaceIds.has(data.workspaceId)) {
						locationHistory.workspaceIds.add(data.workspaceId);
					}
				}
			);
		});
	}
}

/** Creates a new workspace in a garden. */
export const workspaceCreate = {
	schema: WorkspaceCreateCommandSchema,
	mutation: async function (data: WorkspaceCreateCommand): Promise<Workspace> {
		/** Retrieve client and authorize. */
		await requireRole(data.gardenId, 'WorkspaceCreate');

		/** Generate workspace slug from name. */
		const workspaceSlug = slugify(data.name);

		/** Validate garden-scoped unique workspace slug requirement. */
		const existingWorkspace = await triplit.fetchOne(
			triplit.query('workspaces').Where([
				['gardenId', '=', data.gardenId],
				['slug', '=', workspaceSlug]
			])
		);
		if (existingWorkspace) {
			throw new AppError('Workspace slug already exists.', {
				fieldErrors: { name: ['This workspace name already exists in this garden.'] }
			});
		}

		/** Add the workspace */
		return await triplit.insert('workspaces', {
			gardenId: data.gardenId,
			name: data.name,
			slug: workspaceSlug,
			description: data.description
		});
	}
};

/** Creates a new planting area in a workspace. */
export const plantingAreaCreate = {
	schema: PlantingAreaCreateCommandSchema,
	mutation: async (data: PlantingAreaCreateCommand) => {
		const { garden } = await requireRole(data.gardenId, 'PlantingAreaCreate');

		/** Retrieve workspace. */
		const workspace = await triplit.fetchOne(
			triplit.query('workspaces').Id(data.workspaceId)
		);
		if (workspace == null) {
			throw new AppError(`Failed to retrieve workspace ${data.workspaceId}`, {
				nonFormErrors: ['Failed to retrieve workspace.']
			});
		}

		await triplit.transact(async (transaction) => {
			/** Persist geometry. */
			const geometry = await geometryCreate(data.gardenId, data.geometry, transaction);

			/** Persist locations. */
			const locationHistory = await locationHistoryCreate(data.location, transaction);

			/** Persist planting area. */
			await transaction.insert('plantingAreas', {
				gardenId: garden.id,
				name: data.name,
				description: data.description || '',
				geometryId: geometry.id,
				locationHistoryId: locationHistory.id,
				depth: data.depth
			});
		});
	}
};

export const plantingAreaUpdate = {
	schema: PlantingAreaUpdateCommandSchema,
	mutation: async function (id: string, data: PlantingAreaUpdateCommand) {}
};
