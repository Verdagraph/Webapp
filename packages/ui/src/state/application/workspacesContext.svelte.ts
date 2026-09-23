import { QuerySubscription, getDb } from 'jazz-tools/svelte';

import {
	type JazzGeometry,
	type JazzLocationHistory,
	type JazzPlantingArea,
	jazzApp
} from '@vdg-webapp/models/jazz';

import type { GardenContext } from './gardenContext.svelte';

export type ResolvedPlantingArea = JazzPlantingArea & {
	geometry:
		| (JazzGeometry & { linesCoordinates: Array<{ x: number; y: number }> })
		| null;
	locationHistory:
		| (JazzLocationHistory & { locations: Array<{ x: number; y: number; date: Date }> })
		| null;
};

/**
 * Holds context for the workspaces in a garden.
 */
export function createWorkspacesContext(garden: GardenContext) {
	const db = getDb();

	const workspacesQuery = new QuerySubscription(() =>
		garden.gardenId
			? jazzApp.workspaces.where({ gardenId: garden.gardenId })
			: undefined
	);
	const workspaces = $derived(workspacesQuery.current ?? []);

	const plantingAreasQuery = new QuerySubscription(() =>
		garden.gardenId
			? jazzApp.plantingAreas.where({ gardenId: garden.gardenId })
			: undefined
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
				const geometry = await db.one(
					jazzApp.geometries.where({ id: area.geometryId })
				);
				let linesCoordinates: Array<{ x: number; y: number }> = [];
				if (geometry?.type === 'LINES' && geometry.linesCoordinateIds.length > 0) {
					const coordinates = await db.all(
						jazzApp.coordinates.where({ id: { in: geometry.linesCoordinateIds } })
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
					jazzApp.locationHistories.where({ id: area.locationHistoryId })
				);
				const locations = locationHistory
					? await db.all(
							jazzApp.locations.where({ id: { in: locationHistory.locationIds } })
						)
					: [];

				return {
					...area,
					geometry: geometry ? { ...geometry, linesCoordinates } : null,
					locationHistory: locationHistory
						? {
								...locationHistory,
								locations: locations.map(({ x, y, date }) => ({
									x,
									y,
									date: new Date(date)
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
