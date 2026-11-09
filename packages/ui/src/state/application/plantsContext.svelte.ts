import { useQuery } from '@triplit/svelte';

import { type ControllerContext, type Cultivar } from '@vdg-webapp/models';

import type { CultivarContext } from './cultivarContext.svelte';
import type { GardenContext } from './gardenContext.svelte';
import type { TimelineContext } from './timelineContext.svelte';

/**
 * Holds context for a garden's plants.
 */
export function createPlantsContext(
	controller: ControllerContext,
	timeline: TimelineContext,
	garden: GardenContext,
	cultivars: CultivarContext
) {
	/** Queries all plants in the garden and within the selected timeline. */
	const plantsQuery = $derived(
		useQuery(
			controller.triplit,
			controller.triplit
				.query('plants')
				.Where('gardenId', '=', garden.id)
				//.Where('beginDate', '>=', timeline.beginSelection)
				//.Where('endDate', '<=', timeline.endSelection)
				.Include('expectedLifespan', (rel) =>
					rel('expectedLifespan')
						.Include('geometryHistory', (rel) =>
							rel('geometryHistory').Include('geometries', (rel) =>
								rel('geometries').Include('linesCoordinates')
							)
						)
						.Include('locationHistory', (rel) =>
							rel('locationHistory').Include('locations')
						)
						.Include('observations')
				)
				.Include('recordedLifespan', (rel) =>
					rel('recordedLifespan')
						.Include('geometryHistory', (rel) =>
							rel('geometryHistory').Include('geometries', (rel) =>
								rel('geometries').Include('linesCoordinates')
							)
						)
						.Include('locationHistory', (rel) =>
							rel('locationHistory').Include('locations')
						)
						.Include('observations')
				)
				.Include('draftBucket')
		)
	);
	const plants = $derived(plantsQuery.results ?? []);
	/** The set of cultivar names used by all plants in the garden. */
	const plantsCultivarNames = $derived(
		plantsQuery.results?.map((plant) => plant.cultivarName) ?? []
	);
	/**
	 * Retrieves a cultivar from a cultivar name.
	 * @param cultivarName The name to retrieve.
	 * @returns The matched cultivar with all attributes.
	 */
	function getCultivar(cultivarName: string): Cultivar | null {
		return cultivars.getCultivar(cultivarName);
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
