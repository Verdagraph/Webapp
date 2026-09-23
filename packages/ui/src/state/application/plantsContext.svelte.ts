import { QuerySubscription, getDb } from 'jazz-tools/svelte';

import {
	type Commands,
	type JazzCultivar,
	type JazzGenericObservation,
	type JazzPlant,
	jazzApp,
	resolveCultivar
} from '@vdg-webapp/models/jazz';

import type { GardenContext } from './gardenContext.svelte';
import type { TimelineContext } from './timelineContext.svelte';

type ResolvedGeometry = {
	id: string;
	type: string;
	date: Date | number;
	linesCoordinates: Array<{ x: number; y: number }>;
};
type ResolvedLifespan = {
	id: string;
	origin: string;
	geometries: ResolvedGeometry[];
	locations: Array<{ x: number; y: number; date: Date }>;
	observations: JazzGenericObservation[];
};
export type ResolvedPlant = JazzPlant & {
	expectedLifespan: ResolvedLifespan | null;
	recordedLifespan: ResolvedLifespan | null;
};

/**
 * Holds context for a garden's plants.
 */
export function createPlantsContext(
	commands: Commands,
	_timeline: TimelineContext,
	garden: GardenContext
) {
	const db = getDb();

	/** Queries all plants in the garden. */
	const plantsQuery = new QuerySubscription(() =>
		garden.gardenId ? jazzApp.plants.where({ gardenId: garden.gardenId }) : undefined
	);
	const rawPlants = $derived(plantsQuery.current ?? []);

	/**
	 * Jazz has no relation-include like Triplit's `.Include(...)`, so a
	 * plant's expected/recorded lifespans - and each lifespan's geometry
	 * history, location history, and observations - are resolved manually.
	 */
	async function resolveLifespan(lifespanId: string): Promise<ResolvedLifespan | null> {
		const lifespan = await db.one(jazzApp.lifespans.where({ id: lifespanId }));
		if (!lifespan) return null;

		let geometries: ResolvedGeometry[] = [];
		if (lifespan.geometryHistoryId) {
			const geometryHistory = await db.one(
				jazzApp.geometryHistories.where({ id: lifespan.geometryHistoryId })
			);
			if (geometryHistory && geometryHistory.geometryIds.length > 0) {
				const rows = await db.all(
					jazzApp.geometries.where({ id: { in: geometryHistory.geometryIds } })
				);
				geometries = await Promise.all(
					rows.map(async (geometry): Promise<ResolvedGeometry> => {
						let linesCoordinates: Array<{ x: number; y: number }> = [];
						if (geometry.type === 'LINES' && geometry.linesCoordinateIds.length > 0) {
							const coordinates = await db.all(
								jazzApp.coordinates.where({
									id: { in: geometry.linesCoordinateIds }
								})
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
						return { ...geometry, linesCoordinates };
					})
				);
			}
		}

		let locations: Array<{ x: number; y: number; date: Date }> = [];
		if (lifespan.locationHistoryId) {
			const locationHistory = await db.one(
				jazzApp.locationHistories.where({ id: lifespan.locationHistoryId })
			);
			if (locationHistory && locationHistory.locationIds.length > 0) {
				const rows = await db.all(
					jazzApp.locations.where({ id: { in: locationHistory.locationIds } })
				);
				locations = rows.map(({ x, y, date }) => ({ x, y, date: new Date(date) }));
			}
		}

		const observations = await db.all(
			jazzApp.observations.where({ entityIds: { contains: lifespanId } })
		);

		return { ...lifespan, geometries, locations, observations };
	}

	async function resolvePlant(plant: JazzPlant): Promise<ResolvedPlant> {
		const [expectedLifespan, recordedLifespan] = await Promise.all([
			resolveLifespan(plant.expectedLifespanId),
			resolveLifespan(plant.recordedLifespanId)
		]);
		return { ...plant, expectedLifespan, recordedLifespan };
	}

	let plants: ResolvedPlant[] = $state([]);
	$effect(() => {
		const current = rawPlants;
		if (current.length === 0) {
			plants = [];
			return;
		}
		Promise.all(current.map(resolvePlant)).then((resolved) => {
			plants = resolved;
		});
	});

	/** The set of cultivar names used by all plants in the garden. */
	const plantsCultivarNames = $derived(plants.map((plant) => plant.cultivarName));

	/**
	 * Constructs a map of cultivar names used by plants in the garden to the
	 * full cultivar object and attributes.
	 */
	let plantsCultivarMap: Map<string, JazzCultivar> = $state(new Map());
	$effect(() => {
		(async () => {
			const gardenId = garden.gardenId;
			const names = Array.from(new Set(plantsCultivarNames));
			if (names.length === 0 || !gardenId) {
				plantsCultivarMap = new Map<string, JazzCultivar>();
				return;
			}

			const results = await Promise.all(
				names.map((name) => resolveCultivar(gardenId, name, commands))
			);

			const entries = names.reduce<Array<[string, JazzCultivar]>>((acc, name, i) => {
				const cultivar = results[i];
				if (cultivar) acc.push([name, cultivar]);
				return acc;
			}, []);
			plantsCultivarMap = new Map(entries);
		})();
	});

	/**
	 * Retrieves a cultivar from a cultivar name.
	 * @param cultivarName The name to retrieve.
	 * @returns The matched cultivar with all attributes.
	 */
	function getCultivar(cultivarName: string): JazzCultivar | null {
		return plantsCultivarMap.get(cultivarName) ?? null;
	}

	return {
		get plants() {
			return plants;
		},
		get plantsCultivarNames() {
			return plantsCultivarNames;
		},
		getCultivar
	};
}
export type PlantsContext = ReturnType<typeof createPlantsContext>;
