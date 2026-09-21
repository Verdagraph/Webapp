import { AppError } from '../../errors.js';
import {
	type GeometryCreateCommand,
	type GeometryHistoryUpdateCommand,
	type GeometryUpdateCommand,
	type LocationCreateCommand,
	type LocationHistoryUpdateCommand,
	type LocationUpdateCommand,
	type PlantingAreaCreateCommand,
	type PlantingAreaUpdateCommand,
	type WorkspaceCreateCommand,
	type WorkspaceUpdateCommand
} from '../../workspaces/commands.js';
import { slugify } from '../../utils/index.js';
import { historySelectDay } from '../../workspaces/utils.js';
import { type ControllerContext } from '../controller.js';
import { type JazzGeometry, type JazzLocationHistory, type JazzWorkspace } from './schema.js';

/** Helpers. */

/**
 * Insert a geometry using an already-open transaction. Safe to batch with
 * other inserts in the same transaction: geometries' insert policy only
 * depends on the (pre-existing) garden, not on the coordinates inserted
 * here.
 */
function geometryCreate(
	gardenId: string,
	data: GeometryCreateCommand,
	ctx: ControllerContext,
	tx: any
): Omit<JazzGeometry, 'linesCoordinates'> {
	const coordinateIds: string[] = [];
	if (data.linesCoordinates && data.type === 'LINES') {
		for (const point of data.linesCoordinates) {
			const coordinate = tx.insert(ctx.jazz.coordinates, {
				gardenId,
				x: point.x,
				y: point.y
			});
			coordinateIds.push(coordinate.id);
		}
	}

	return tx.insert(ctx.jazz.geometries, {
		gardenId,
		name: data.name ?? undefined,
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
		linesCoordinateIds: coordinateIds,
		linesClosed: data.linesClosed
	});
}

/** Insert a location history using an already-open transaction. */
function locationHistoryCreate(
	data: LocationCreateCommand,
	ctx: ControllerContext,
	tx: any
): Omit<JazzLocationHistory, 'locations'> {
	const location = tx.insert(ctx.jazz.locations, {
		gardenId: data.gardenId,
		workspaceId: data.workspaceId,
		x: data.coordinate.x,
		y: data.coordinate.y,
		date: data.date
	});
	return tx.insert(ctx.jazz.locationHistories, {
		gardenId: data.gardenId,
		locationIds: [location.id],
		workspaceIds: [data.workspaceId]
	});
}

/** Commands. */

export async function geometryUpdate(
	id: string,
	data: GeometryUpdateCommand,
	ctx: ControllerContext
) {
	const geometry = await ctx.db.one(ctx.jazz.geometries.where({ id }));
	if (!geometry) {
		throw new AppError('Geometry does not exist.', {
			nonFormErrors: ['Failed to update object geometry.']
		});
	}

	if (data.delete) {
		ctx.db.delete(ctx.jazz.geometries, id);
		return;
	}

	await ctx.db.transaction(async (tx) => {
		/**
		 * The lines geometry update is trickier because the points are
		 * connected by ID. The new geometry may have the same number of
		 * points, or more or less: update existing coordinates, delete
		 * excess ones if the new list is shorter, and add new ones if it's
		 * longer.
		 */
		let existingCoordinateIds = [...geometry.linesCoordinateIds];
		if (data.linesCoordinates) {
			const newCoordinatesCount = data.linesCoordinates.length;

			const minLength = Math.min(existingCoordinateIds.length, newCoordinatesCount);
			for (let index = 0; index < minLength; index++) {
				const coordinateId = existingCoordinateIds[index];
				const point = data.linesCoordinates[index];
				tx.update(ctx.jazz.coordinates, coordinateId, { x: point.x, y: point.y });
			}

			if (existingCoordinateIds.length > newCoordinatesCount) {
				const coordinatesToDelete = existingCoordinateIds.slice(newCoordinatesCount);
				for (const coordinateId of coordinatesToDelete) {
					tx.delete(ctx.jazz.coordinates, coordinateId);
				}
				existingCoordinateIds = existingCoordinateIds.slice(0, newCoordinatesCount);
			}

			if (newCoordinatesCount > existingCoordinateIds.length) {
				const newPoints = data.linesCoordinates.slice(existingCoordinateIds.length);
				for (const point of newPoints) {
					const coordinate = tx.insert(ctx.jazz.coordinates, {
						gardenId: geometry.gardenId,
						x: point.x,
						y: point.y
					});
					existingCoordinateIds.push(coordinate.id);
				}
			}
		}

		tx.update(ctx.jazz.geometries, geometry.id, {
			...(data.name ? { name: data.name } : {}),
			...(data.type ? { type: data.type } : {}),
			...(data.date ? { date: data.date } : {}),
			...(data.scaleFactor ? { scaleFactor: data.scaleFactor } : {}),
			...(data.rotation ? { rotation: data.rotation } : {}),
			...(data.rectangleLength ? { rectangleLength: data.rectangleLength } : {}),
			...(data.rectangleWidth ? { rectangleWidth: data.rectangleWidth } : {}),
			...(data.polygonNumSides ? { polygonNumSides: data.polygonNumSides } : {}),
			...(data.polygonRadius ? { polygonRadius: data.polygonRadius } : {}),
			...(data.ellipseLength ? { ellipseLength: data.ellipseLength } : {}),
			...(data.ellipseWidth ? { ellipseWidth: data.ellipseWidth } : {}),
			...(data.linesCoordinates ? { linesCoordinateIds: existingCoordinateIds } : {}),
			...(data.linesClosed ? { linesClosed: data.linesClosed } : {})
		});
	});
}

/** Returns the geometries belonging to a geometry history, sorted by date. */
async function geometryHistoryGeometries(geometryIds: string[], ctx: ControllerContext) {
	const geometries = await ctx.db.all(ctx.jazz.geometries.where({ id: { in: geometryIds } }));
	return [...geometries].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);
}

export async function geometryHistoryExtend(
	id: string,
	date: Date,
	ctx: ControllerContext
) {
	const geometryHistory = await ctx.db.one(ctx.jazz.geometryHistories.where({ id }));
	if (!geometryHistory) {
		throw new AppError('Geometry history does not exist.', {
			nonFormErrors: ['Failed to update object geometry.']
		});
	}

	const sortedGeometries = await geometryHistoryGeometries(
		geometryHistory.geometryIds,
		ctx
	);
	const latestGeometry = sortedGeometries[sortedGeometries.length - 1];
	if (!latestGeometry) {
		throw new AppError('Geometry history has no geometries to extend.', {
			nonFormErrors: ['Failed to update object geometry.']
		});
	}

	const linesCoordinateRows =
		latestGeometry.type === 'LINES' && latestGeometry.linesCoordinateIds.length > 0
			? await ctx.db.all(
					ctx.jazz.coordinates.where({ id: { in: latestGeometry.linesCoordinateIds } })
				)
			: [];
	const nextGeometry: GeometryCreateCommand = {
		...latestGeometry,
		name: latestGeometry.name ?? null,
		date,
		linesCoordinates: linesCoordinateRows.map(({ x, y }) => ({ x, y }))
	};
	await ctx.db.transaction(async (tx) => {
		const geometry = geometryCreate(geometryHistory.gardenId, nextGeometry, ctx, tx);
		tx.update(ctx.jazz.geometryHistories, geometryHistory.id, {
			geometryIds: [...geometryHistory.geometryIds, geometry.id]
		});
	});
}

/**
 * Updates a geometry history with a new geometry. If a geometry already
 * exists in this history at the same day as the given date, that geometry
 * is updated. If not, a new geometry is created.
 */
export async function geometryHistoryUpdate(
	data: GeometryHistoryUpdateCommand,
	ctx: ControllerContext
) {
	const geometryHistory = await ctx.db.one(
		ctx.jazz.geometryHistories.where({ id: data.id })
	);
	if (!geometryHistory) {
		throw new AppError('Geometry history does not exist.', {
			nonFormErrors: ['Failed to update object geometry.']
		});
	}
	const geometries = await geometryHistoryGeometries(geometryHistory.geometryIds, ctx);

	const existingGeometry = historySelectDay(
		geometries.map((geometry) => ({ ...geometry, date: new Date(geometry.date) })),
		data.date
	);
	if (existingGeometry) {
		await geometryUpdate(existingGeometry.id, data.geometry, ctx);
	} else {
		await ctx.db.transaction(async (tx) => {
			const geometry = geometryCreate(geometryHistory.gardenId, data.geometry, ctx, tx);
			tx.update(ctx.jazz.geometryHistories, geometryHistory.id, {
				geometryIds: [...geometryHistory.geometryIds, geometry.id]
			});
		});
	}
}

/** Updates or deletes a single location. */
export async function locationUpdate(
	id: string,
	data: LocationUpdateCommand,
	ctx: ControllerContext
) {
	const location = await ctx.db.one(ctx.jazz.locations.where({ id }));
	if (!location) {
		throw new AppError('Location does not exist.', {
			nonFormErrors: ['Failed to update object location.']
		});
	}

	if (data.delete) {
		ctx.db.delete(ctx.jazz.locations, id);
		return;
	}
	ctx.db.update(ctx.jazz.locations, id, {
		...(data.coordinate ? { x: data.coordinate.x, y: data.coordinate.y } : {}),
		...(data.date ? { date: data.date } : {}),
		...(data.workspaceId ? { workspaceId: data.workspaceId } : {})
	});
}

/** Returns the locations belonging to a location history, sorted by date. */
async function locationHistoryLocations(locationIds: string[], ctx: ControllerContext) {
	const locations = await ctx.db.all(ctx.jazz.locations.where({ id: { in: locationIds } }));
	return [...locations].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);
}

/**
 * Updates a location history with a new position. If a location already
 * exists in this history at the same day as the given date, that location
 * is updated. If not, a new location is created.
 */
export async function locationHistoryUpdate(
	data: LocationHistoryUpdateCommand,
	ctx: ControllerContext
) {
	const locationHistory = await ctx.db.one(
		ctx.jazz.locationHistories.where({ id: data.id })
	);
	if (!locationHistory) {
		throw new AppError('Location history does not exist.', {
			nonFormErrors: ['Failed to update object location.']
		});
	}
	const locations = await locationHistoryLocations(locationHistory.locationIds, ctx);

	const existingLocation = historySelectDay(
		locations.map((location) => ({ ...location, date: new Date(location.date) })),
		data.date
	);
	if (existingLocation) {
		ctx.db.update(ctx.jazz.locations, existingLocation.id, {
			x: data.coordinate.x,
			y: data.coordinate.y
		});
	} else {
		await ctx.db.transaction(async (tx) => {
			const location = tx.insert(ctx.jazz.locations, {
				gardenId: locationHistory.gardenId,
				workspaceId: data.workspaceId,
				x: data.coordinate.x,
				y: data.coordinate.y,
				date: data.date
			});
			const workspaceIds = locationHistory.workspaceIds.includes(data.workspaceId)
				? locationHistory.workspaceIds
				: [...locationHistory.workspaceIds, data.workspaceId];
			tx.update(ctx.jazz.locationHistories, locationHistory.id, {
				locationIds: [...locationHistory.locationIds, location.id],
				workspaceIds
			});
		});
	}
}

export async function locationHistoryExtend(
	id: string,
	data: { date: Date },
	ctx: ControllerContext
) {
	const locationHistory = await ctx.db.one(ctx.jazz.locationHistories.where({ id }));
	if (!locationHistory) {
		throw new AppError('Location history does not exist.', {
			nonFormErrors: ['Failed to update object location.']
		});
	}
	const sortedLocations = await locationHistoryLocations(locationHistory.locationIds, ctx);

	const nearestLocation =
		historySelectDay(
			sortedLocations.map((location) => ({ ...location, date: new Date(location.date) })),
			data.date
		) ??
		sortedLocations[sortedLocations.length - 1] ?? {
			x: 0,
			y: 0,
			workspaceId: undefined as unknown as string
		};

	await ctx.db.transaction(async (tx) => {
		const location = tx.insert(ctx.jazz.locations, {
			gardenId: locationHistory.gardenId,
			workspaceId: nearestLocation.workspaceId,
			x: nearestLocation.x,
			y: nearestLocation.y,
			date: data.date
		});
		tx.update(ctx.jazz.locationHistories, id, {
			locationIds: [...locationHistory.locationIds, location.id]
		});
	});
}

/** Creates a new workspace in a garden. */
export async function workspaceCreate(
	data: WorkspaceCreateCommand,
	ctx: ControllerContext
): Promise<JazzWorkspace> {
	const { garden } = await ctx.requireRole(data.gardenId, 'WorkspaceCreate');

	const workspaceSlug = slugify(data.name);

	const existingWorkspace = await ctx.db.one(
		ctx.jazz.workspaces.where({ gardenId: garden.id, slug: workspaceSlug })
	);
	if (existingWorkspace) {
		throw new AppError('Workspace slug already exists.', {
			fieldErrors: { name: ['This workspace name already exists in this garden.'] }
		});
	}

	const write = ctx.db.insert(ctx.jazz.workspaces, {
		gardenId: garden.id,
		name: data.name,
		slug: workspaceSlug,
		description: data.description
	});
	return write.wait({ tier: 'edge' });
}

/** Updates a workspace in a garden. */
export async function workspaceUpdate(
	gardenSlug: string,
	id: string,
	data: WorkspaceUpdateCommand,
	ctx: ControllerContext
) {
	const { garden } = await ctx.requireRole(gardenSlug, 'WorkspaceUpdate');

	let newSlug: string | undefined;
	if (data.name) {
		newSlug = slugify(data.name);
		const existingWorkspace = await ctx.db.one(
			ctx.jazz.workspaces.where({ gardenId: garden.id, slug: newSlug })
		);
		if (existingWorkspace) {
			throw new AppError('Workspace slug already exists.', {
				fieldErrors: { name: ['This workspace name already exists in this garden.'] }
			});
		}
	}

	ctx.db.update(ctx.jazz.workspaces, id, {
		...(data.name && newSlug ? { name: data.name, slug: newSlug } : {}),
		...(data.description ? { description: data.description } : {})
	});
}

/** Creates a new planting area in a workspace. */
export async function plantingAreaCreate(
	data: PlantingAreaCreateCommand,
	ctx: ControllerContext
) {
	const { garden } = await ctx.requireRole(data.gardenId, 'PlantingAreaCreate');

	const workspace = await ctx.db.one(ctx.jazz.workspaces.where({ id: data.workspaceId }));
	if (workspace == null) {
		throw new AppError(`Failed to retrieve workspace ${data.workspaceId}`, {
			nonFormErrors: ['Failed to retrieve workspace.']
		});
	}

	await ctx.db.transaction(async (tx) => {
		const geometry = geometryCreate(garden.id, data.geometry, ctx, tx);
		const locationHistory = locationHistoryCreate(data.location, ctx, tx);

		tx.insert(ctx.jazz.plantingAreas, {
			gardenId: garden.id,
			name: data.name,
			description: data.description || '',
			geometryId: geometry.id,
			locationHistoryId: locationHistory.id,
			depth: data.depth
		});
	});
}

export async function plantingAreaUpdate(
	id: string,
	data: PlantingAreaUpdateCommand,
	ctx: ControllerContext
) {
	const plantingArea = await ctx.db.one(ctx.jazz.plantingAreas.where({ id }));
	if (plantingArea == null) {
		throw new AppError(`Failed to retrieve planting area ${id}`, {
			nonFormErrors: ['Failed to retrieve planting area.']
		});
	}

	ctx.db.update(ctx.jazz.plantingAreas, id, {
		...(data.name ? { name: data.name } : {}),
		...(data.description ? { description: data.description } : {}),
		...(data.depth ? { depth: data.depth } : {})
	});
}
