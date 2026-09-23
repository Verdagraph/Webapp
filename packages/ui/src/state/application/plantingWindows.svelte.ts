import {
	type ControllerContext,
	type Cultivar,
	type CultivarPlantingWindow,
	type Environment
} from '@vdg-webapp/models';
import { calculatePlantingWindow } from '@vdg-webapp/models';

import type { CultivarContext } from './cultivarContext.svelte';
import type { EnvironmentContext } from './environmentContext.svelte';
import type { GardenContext } from './gardenContext.svelte';
import type { TimelineContext } from './timelineContext.svelte';

/**
 * Holds context for a set of planting windows generated from the garden's cultivars
 */
export function createPlantingWindowsContext(
	controller: ControllerContext,
	timeline: TimelineContext,
	garden: GardenContext,
	cultivars: CultivarContext,
	environments: EnvironmentContext
) {
	const frostDatesPlantingWindows = $derived.by(() => {
		const windows: CultivarPlantingWindow[] = [];
		for (const environment of environments.environments) {
			for (const cultivar of cultivars.cultivars) {
				windows.push(
					calculatePlantingWindow(
						/**
						 * calculatePlantingWindow's attribute-profile shape predates
						 * the Jazz migration; cultivarContext now resolves
						 * JazzCultivar rows instead, which are structurally
						 * compatible for this pure computation.
						 */
						cultivar as unknown as Cultivar,
						environment as unknown as Environment,
						{ start: timeline.beginSelection, end: timeline.endSelection },
						'frostDates'
					)
				);
			}
		}
	});

	return {
		get frostDatesPlantingWindows() {
			return frostDatesPlantingWindows;
		}
	};
}
export type PlantingWindowsContext = ReturnType<typeof createPlantingWindowsContext>;
