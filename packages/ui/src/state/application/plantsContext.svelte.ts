import { QuerySubscription, getDb } from 'jazz-tools/svelte';

import {
	type Commands,
	type Cultivar,
	type GenericObservation,
	type Lifespan,
	type Plant,
	app,
	resolveCultivar
} from '@vdg-webapp/models';

import type { GardenContext } from './gardenContext.svelte';
import type { TimelineContext } from './timelineContext.svelte';
import {
	type ResolvedGeometry,
	type ResolvedLocation
} from './workspacesContext.svelte';

export type { ResolvedGeometry };

/**
 * A lifespan with its geometry/location histories resolved to flat arrays
 * (geometryHistoryId/locationHistoryId are kept, carried over from
 * Lifespan, for callers that need to target the history for mutation,
 * e.g. the geometry/location history "extend" commands).
 */
export type ResolvedLifespan = Lifespan & {
	geometries: ResolvedGeometry[];
	locations: ResolvedLocation[];
	observations: GenericObservation[];
};
export type ResolvedPlant = Plant & {
	expectedLifespan: ResolvedLifespan | null;
	recordedLifespan: ResolvedLifespan | null;
	/**
	 * Whether the plant's draft bucket (if any) has been committed. Null when
	 * the plant has no draftBucketId. See isDraftPlant in
	 * '@vdg-webapp/models' for the draft/official determination this
	 * feeds into.
	 */
	draftBucketCommitted: boolean | null;
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
		garden.gardenId ? app.plants.where({ gardenId: garden.gardenId }) : undefined
	);
	const rawPlants = $derived(plantsQuery.current ?? []);

	/**
	 * Jazz has no relation-include like Triplit's `.Include(...)`, so a
	 * plant's expected/recorded lifespans - and each lifespan's geometry
	 * history, location history, and observations - are resolved manually.
	 */
	async function resolveLifespan(lifespanId: string): Promise<ResolvedLifespan | null> {
		const lifespan = await db.one(app.lifespans.where({ id: lifespanId }));
		if (!lifespan) return null;

		let geometries: ResolvedGeometry[] = [];
		if (lifespan.geometryHistoryId) {
			const geometryHistory = await db.one(
				app.geometryHistories.where({ id: lifespan.geometryHistoryId })
			);
			if (geometryHistory && geometryHistory.geometryIds.length > 0) {
				const rows = await db.all(
					app.geometries.where({ id: { in: geometryHistory.geometryIds } })
				);
				geometries = await Promise.all(
					rows.map(async (geometry): Promise<ResolvedGeometry> => {
						let linesCoordinates: Array<{ x: number; y: number }> = [];
						if (geometry.type === 'LINES' && geometry.linesCoordinateIds.length > 0) {
							const coordinates = await db.all(
								app.coordinates.where({
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

		let locations: ResolvedLocation[] = [];
		if (lifespan.locationHistoryId) {
			const locationHistory = await db.one(
				app.locationHistories.where({ id: lifespan.locationHistoryId })
			);
			if (locationHistory && locationHistory.locationIds.length > 0) {
				const rows = await db.all(
					app.locations.where({ id: { in: locationHistory.locationIds } })
				);
				locations = rows.map((location) => ({
					...location,
					date: new Date(location.date)
				}));
			}
		}

		const observations = await db.all(
			app.observations.where({ entityIds: { contains: lifespanId } })
		);

		return { ...lifespan, geometries, locations, observations };
	}

	async function resolvePlant(plant: Plant): Promise<ResolvedPlant> {
		const [expectedLifespan, recordedLifespan, draftBucketCommitted] =
			await Promise.all([
				resolveLifespan(plant.expectedLifespanId),
				resolveLifespan(plant.recordedLifespanId),
				resolveDraftBucketCommitted(plant.draftBucketId)
			]);
		return { ...plant, expectedLifespan, recordedLifespan, draftBucketCommitted };
	}

	/**
	 * Resolves whether a plant's draft bucket has been committed. Returns
	 * null when the plant has no draft bucket.
	 */
	async function resolveDraftBucketCommitted(
		draftBucketId: string | null | undefined
	): Promise<boolean | null> {
		if (!draftBucketId) return null;
		const draftBucket = await db.one(app.draftBuckets.where({ id: draftBucketId }));
		return draftBucket?.committed ?? null;
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
	let plantsCultivarMap: Map<string, Cultivar> = $state(new Map());
	$effect(() => {
		(async () => {
			const gardenId = garden.gardenId;
			const names = Array.from(new Set(plantsCultivarNames));
			if (names.length === 0 || !gardenId) {
				plantsCultivarMap = new Map<string, Cultivar>();
				return;
			}

			const results = await Promise.all(
				names.map((name) => resolveCultivar(gardenId, name, commands))
			);

			const entries = names.reduce<Array<[string, Cultivar]>>((acc, name, i) => {
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
	function getCultivar(cultivarName: string): Cultivar | null {
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
