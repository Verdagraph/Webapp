import { z as zod } from 'zod';
import {
	WorkspaceCreateCommand,
	PlantingAreaCreateCommand,
	PlantingAreaUpdateCommand,
	LocationCreateCommand,
	type Workspace,
	type Geometry,
	type Location,
	type LocationHistory,
	GeometryCreateCommand,
	TriplitTransaction,
	historySelectDay,
	type Position,
	GeometryPartial
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

/** TODO: Add validation using the zod schemas to this function.
 */

/**
 * Given a geometry partial object, which is a geometry object
 * where all values (including those of the nested attribute objects)
 * are optional, add these updated to Triplit.
 * @param geometryId The ID of the geometry to update.
 * @param newGeometry The attributes to update.
 */
export async function geometryUpdate(geometryId: string, newGeometry: GeometryPartial) {
	const geometry = await triplit.fetchOne(
		triplit.query('geometries').id(geometryId).build()
	);
	if (!geometry) {
		throw new AppError('Geometry does not exist.', {
			nonFormErrors: ['Failed to update object geometry.']
		});
	}

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
		let newCoordinateIds: Set<string> | null = null;
		if (newGeometry.type === 'LINES') {
			if (
				newGeometry.linesAttributes?.coordinates &&
				geometry.linesAttributes?.coordinateIds
			) {
				for (const coordinateId of geometry.linesAttributes.coordinateIds) {
					await transaction.delete('coordinates', coordinateId);
				}
			}

			if (newGeometry.linesAttributes?.coordinates) {
				newCoordinateIds = new Set();
				for (const newCoordinate of newGeometry.linesAttributes.coordinates) {
					const coordinate = await transaction.insert('coordinates', {
						gardenId: geometry.gardenId,
						x: newCoordinate.x,
						y: newCoordinate.y
					});
					newCoordinateIds.add(coordinate.id);
				}
			}
		}

		await transaction.update('geometries', geometryId, (geometry) => {
			if (newGeometry.type) {
				geometry.type = newGeometry.type;
			}
			if (newGeometry.date) {
				geometry.date = newGeometry.date;
			}
			if (newGeometry.scaleFactor) {
				geometry.scaleFactor = newGeometry.scaleFactor;
			}
			if (newGeometry.rotation) {
				geometry.rotation = newGeometry.rotation;
			}

			switch (newGeometry.type) {
				case 'RECTANGLE':
					if (!geometry.rectangleAttributes) {
						geometry.rectangleAttributes = { length: 1, width: 1 };
					}

					if (newGeometry.rectangleAttributes) {
						if (newGeometry.rectangleAttributes.length) {
							geometry.rectangleAttributes.length =
								newGeometry.rectangleAttributes.length;
						}
						if (newGeometry.rectangleAttributes.width) {
							geometry.rectangleAttributes.width =
								newGeometry.rectangleAttributes.width;
						}
					}
					break;

				case 'POLYGON':
					if (!geometry.polygonAttributes) {
						geometry.polygonAttributes = { radius: 1, numSides: 3 };
					}

					if (newGeometry.polygonAttributes) {
						if (newGeometry.polygonAttributes.numSides) {
							geometry.polygonAttributes.numSides =
								newGeometry.polygonAttributes.numSides;
						}
						if (newGeometry.polygonAttributes.radius) {
							geometry.polygonAttributes.radius = newGeometry.polygonAttributes.radius;
						}
					}
					break;

				case 'ELLIPSE':
					if (!geometry.ellipseAttributes) {
						geometry.ellipseAttributes = { lengthDiameter: 1, widthDiameter: 1 };
					}

					if (newGeometry.ellipseAttributes) {
						if (newGeometry.ellipseAttributes.lengthDiameter) {
							geometry.ellipseAttributes.lengthDiameter =
								newGeometry.ellipseAttributes.lengthDiameter;
						}
						if (newGeometry.ellipseAttributes.widthDiameter) {
							geometry.ellipseAttributes.widthDiameter =
								newGeometry.ellipseAttributes.widthDiameter;
						}
					}
					break;

				case 'LINES': {
					if (!geometry.linesAttributes) {
						geometry.linesAttributes = {
							coordinateIds: new Set(),
							closed: true,
							coordinates: []
						};
					}

					if (newGeometry.linesAttributes?.closed) {
						geometry.linesAttributes.closed = newGeometry.linesAttributes.closed;
					}
					if (newCoordinateIds) {
						geometry.linesAttributes.coordinateIds = newCoordinateIds;
					}

					break;
				}
			}
		});
	});
}

/**
 * Insert a new location history into the database.
 * @param gardenId The ID of the garden.
 * @param data The location create command.
 * @param transaction The database transaction.
 * @returns The location history after insertion.
 */
export async function locationHistoryCreate(
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

/**
 * Updates a location history with a new position.
 * If a position already exists in this location history
 * at the same day at the given date, that location is updated.
 * If not, a new location is created.
 * @param locationHistoryId The ID of the history to update.
 * @param workspaceId The workspace the new position is in.
 * @param newPosition The new posistion.
 * @param date The date the new position is being set at.
 */
export async function locationHistoryUpdate(
	locationHistoryId: string,
	workspaceId: string,
	newPosition: Position,
	date: Date
) {
	const locationHistory = await triplit.fetchOne(
		triplit
			.query('locationHistories')
			.id(locationHistoryId)
			.include('locations')
			.build()
	);
	if (!locationHistory) {
		throw new AppError('Location history does not exist.', {
			nonFormErrors: ['Failed to update object location.']
		});
	}

	/** If a location already exists at the given day, update it. */
	const existingLocation = historySelectDay(locationHistory.locations, date);
	if (existingLocation) {
		await triplit.update('locations', existingLocation.id, (location) => {
			location.x = newPosition.x;
			location.y = newPosition.y;
		});

		/** If no location exists, create a new one. */
	} else {
		await triplit.transact(async (transaction) => {
			const location = await transaction.insert('locations', {
				gardenId: locationHistory.gardenId,
				workspaceId: workspaceId,
				x: newPosition.x,
				y: newPosition.y,
				date: date
			});
			await triplit.update(
				'locationHistories',
				locationHistory.id,
				(locationHistory) => {
					locationHistory.locationIds.add(location.id);
					if (!locationHistory.workspaceIds.has(workspaceId)) {
						locationHistory.workspaceIds.add(workspaceId);
					}
				}
			);
		});
	}
}

/** Creates a new workspace in a garden. */
export const workspaceCreate = {
	schema: WorkspaceCreateCommand,
	mutation: async function (
		data: zod.infer<typeof WorkspaceCreateCommand>
	): Promise<Workspace> {
		/** Retrieve client and authorize. */
		await requireRole(data.gardenId, 'WorkspaceCreate');

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
		const { garden } = await requireRole(data.gardenId, 'PlantingAreaCreate');

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
			const geometry = await geometryCreate(data.gardenId, data.geometry, transaction);

			/** Persist locations. */
			const locationHistory = await locationHistoryCreate(
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
		});
	}
};

export const plantingAreaUpdate = {
	schema: PlantingAreaUpdateCommand,
	mutation: async function (data: zod.infer<typeof PlantingAreaUpdateCommand>) {
		
	}
}

function validateZodField(data: unknown, schema: zod.ZodType): string[] | undefined {
	const parseResult = schema.safeParse(data)
	if (parseResult.success) {
		return
	}

	return parseResult.error.issues.map(error => error.message)
}