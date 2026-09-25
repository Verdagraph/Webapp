import { QuerySubscription, getDb } from 'jazz-tools/svelte';

import {
	type Geometry,
	type Location,
	type LocationHistory,
	type PlantingArea,
	app
} from '@vdg-webapp/models';

import type { GardenContext } from './gardenContext.svelte';

/**
 * A geometry with its lines' coordinates resolved (Jazz has no
 * relation-include, so linesCoordinateIds must be resolved to actual
 * coordinates by hand). Shared by every consumer of a resolved geometry
 * (planting areas, plant lifespans).
 */
export type ResolvedGeometry = Geometry & {
	linesCoordinates: Array<{ x: number; y: number }>;
};

/** A location with its date normalized to an actual Date instance. */
export type ResolvedLocation = Omit<Location, 'date'> & { date: Date };

/**
 * A location history with its locations resolved. Shared by every consumer
 * of a resolved location history (planting areas, plant lifespans).
 */
export type ResolvedLocationHistory = LocationHistory & {
	locations: ResolvedLocation[];
};

export type ResolvedPlantingArea = PlantingArea & {
	geometry: ResolvedGeometry | null;
	locationHistory: ResolvedLocationHistory | null;
};

/**
 * Holds context for the workspaces in a garden.
 */
export function createWorkspacesContext(garden: GardenContext) {
	const db = getDb();

	const workspacesQuery = new QuerySubscription(() =>
		garden.gardenId ? app.workspaces.where({ gardenId: garden.gardenId }) : undefined
	);
	const workspaces = $derived(workspacesQuery.current ?? []);

	const plantingAreasQuery = new QuerySubscription(() =>
		garden.gardenId ? app.plantingAreas.where({ gardenId: garden.gardenId }) : undefined
	);
	const rawPlantingAreas = $derived(plantingAreasQuery.current ?? []);

	/**
	 * Jazz has no relation-include like Triplit's `.Include(...)`, so each
	 * planting area's geometry and location history are resolved manually
	 * whenever the raw row set changes.
	 */
	let plantingAreas: ResolvedPlantingArea[] = $state([]);
	$effect(() => {
		const areas = rawPlantingAreas;
		if (areas.length === 0) {
			plantingAreas = [];
			return;
		}

		Promise.all(
			areas.map(async (area): Promise<ResolvedPlantingArea> => {
				const geometry = await db.one(app.geometries.where({ id: area.geometryId }));
				let linesCoordinates: Array<{ x: number; y: number }> = [];
				if (geometry?.type === 'LINES' && geometry.linesCoordinateIds.length > 0) {
					const coordinates = await db.all(
						app.coordinates.where({ id: { in: geometry.linesCoordinateIds } })
					);
					const coordinatesById = new Map(
						coordinates.map((coordinate) => [coordinate.id, coordinate])
					);
					linesCoordinates = geometry.linesCoordinateIds
						.map((id) => coordinatesById.get(id))
						.filter((coordinate): coordinate is NonNullable<typeof coordinate> =>
							Boolean(coordinate)
						)
						.map(({ x, y }) => ({ x, y }));
				}

				const locationHistory = await db.one(
					app.locationHistories.where({ id: area.locationHistoryId })
				);
				const locations = locationHistory
					? await db.all(
							app.locations.where({ id: { in: locationHistory.locationIds } })
						)
					: [];

				return {
					...area,
					geometry: geometry ? { ...geometry, linesCoordinates } : null,
					locationHistory: locationHistory
						? {
								...locationHistory,
								locations: locations.map((location) => ({
									...location,
									date: new Date(location.date)
								}))
							}
						: null
				};
			})
		).then((resolved) => {
			plantingAreas = resolved;
		});
	});

	return {
		get workspaces() {
			return workspaces;
		},
		get plantingAreas() {
			return plantingAreas;
		}
	};
}
export type WorkspacesContext = ReturnType<typeof createWorkspacesContext>;
