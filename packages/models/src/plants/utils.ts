import { historySelect } from '../workspaces/utils.js';

export type LifespanSource = 'recorded' | 'expected';

/**
 * Wraps a value resolved from a plant's lifespan history
 * with the source lifespan it came from, so that callers
 * (e.g. update handlers) can target the correct history for mutations.
 */
export type Sourced<T, TLifespan> = {
	value: T;
	source: LifespanSource;
	lifespan: TLifespan;
};

/**
 * The minimal plant shape resolveActiveLocation/resolveActiveGeometry need:
 * a plant with an expected and recorded lifespan. Defined generically over
 * the lifespan shape so this stays usable with whatever resolved lifespan
 * type a caller has (e.g. the UI's ResolvedLifespan), without packages/models
 * depending on that UI-specific type.
 */
export type PlantWithLifespans<TLifespan> = {
	expectedLifespan: TLifespan | null;
	recordedLifespan: TLifespan | null;
};

/**
 * Resolves a value from a plant's lifespans using a selector function.
 * The recorded lifespan is checked first. If no value is found,
 * the expected lifespan is used as a fallback.
 * @param plant The plant whose lifespans to search.
 * @param selector A function that extracts a value from a lifespan,
 * returning null if the lifespan does not contain a match.
 * @returns The resolved value with its source lifespan, or null
 * if neither lifespan produced a match.
 */
function resolveFromLifespans<T, TLifespan>(
	plant: PlantWithLifespans<TLifespan>,
	selector: (lifespan: TLifespan) => T | null
): Sourced<T, TLifespan> | null {
	if (plant.recordedLifespan) {
		const value = selector(plant.recordedLifespan);
		if (value) {
			return { value, source: 'recorded', lifespan: plant.recordedLifespan };
		}
	}

	if (plant.expectedLifespan) {
		const value = selector(plant.expectedLifespan);
		if (value) {
			return { value, source: 'expected', lifespan: plant.expectedLifespan };
		}
	}

	return null;
}

/**
 * Resolves the active location for a plant at a given point in time.
 * A plant may have both a recorded and expected lifespan, each with
 * its own resolved location list. The recorded lifespan takes priority;
 * the expected lifespan is used as a fallback.
 * @param plant The plant to resolve the location for.
 * @param focusDate The point in time to resolve the location at.
 * @returns The location with its source lifespan, or null if no
 * location exists at the given time in either lifespan.
 */
export function resolveActiveLocation<
	TLifespan extends { locations: Array<{ date: Date }> }
>(
	plant: PlantWithLifespans<TLifespan>,
	focusDate: Date
): Sourced<TLifespan['locations'][number], TLifespan> | null {
	return resolveFromLifespans(plant, (lifespan) =>
		historySelect(lifespan.locations, focusDate, false)
	);
}

/**
 * Resolves the active geometry for a plant at a given point in time.
 * A plant may have both a recorded and expected lifespan, each with
 * its own resolved geometry list. The recorded lifespan takes priority;
 * the expected lifespan is used as a fallback.
 * @param plant The plant to resolve the geometry for.
 * @param focusDate The point in time to resolve the geometry at.
 * @returns The geometry with its source lifespan, or null if no
 * geometry exists at the given time in either lifespan.
 */
export function resolveActiveGeometry<
	TLifespan extends { geometries: Array<{ date: Date }> }
>(
	plant: PlantWithLifespans<TLifespan>,
	focusDate: Date
): Sourced<TLifespan['geometries'][number], TLifespan> | null {
	return resolveFromLifespans(plant, (lifespan) =>
		historySelect(lifespan.geometries, focusDate, false)
	);
}

/**
 * The minimal shape isDraftPlant needs. Defined structurally (rather than
 * importing the UI's ResolvedPlant type) so this stays usable from any
 * caller, not just the Svelte UI layer.
 */
export type DraftPlantLike = {
	draftBucketId: string | null | undefined;
	draftBucketCommitted: boolean | null;
};

/**
 * Determines whether a plant is still staged as a draft: it has a
 * draftBucketId and that bucket has not been committed. Committing a draft
 * bucket only flips the bucket's `committed` flag - it never clears the
 * plant's draftBucketId - so a plant with a committed draft bucket is no
 * longer a draft.
 */
export function isDraftPlant(plant: DraftPlantLike): boolean {
	return plant.draftBucketId != null && plant.draftBucketCommitted !== true;
}
