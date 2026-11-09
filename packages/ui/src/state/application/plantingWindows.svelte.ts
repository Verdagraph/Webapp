import {
	type ControllerContext,
	type Cultivar,
	type CultivarPlantingWindow,
	allCultivarNames,
	normalizeCultivarName
} from '@vdg-webapp/models';
import { calculatePlantingWindow } from '@vdg-webapp/models';

import type { CultivarContext } from './cultivarContext.svelte';
import type { EnvironmentContext } from './environmentContext.svelte';
import type { GardenContext } from './gardenContext.svelte';
import type { PlantsContext } from './plantsContext.svelte';
import type { TimelineContext } from './timelineContext.svelte';

/** Whether a cultivar defines a sowing window of its own (not one inherited from a parent). */
function definesSowingWindows(cultivar: {
	attributes: Cultivar['attributes'];
}): boolean {
	return Object.values(cultivar.attributes.sowingWindows ?? {}).some(
		(frostWindows) =>
			frostWindows?.lastFrost != null || frostWindows?.firstFrost != null
	);
}

/**
 * Holds context for a set of planting windows generated from the garden's cultivars
 */
export function createPlantingWindowsContext(
	controller: ControllerContext,
	timeline: TimelineContext,
	garden: GardenContext,
	cultivars: CultivarContext,
	environments: EnvironmentContext,
	plants: PlantsContext
) {
	/**
	 * The cultivars which get planting windows. A variety shares its crop's windows, so listing every
	 * variety would repeat each crop's row dozens of times. For now a cultivar is shown if it defines
	 * windows itself, which is normally a crop, or if the garden has a plant of it.
	 * TODO: replace with the garden's chosen cultivars once they can be chosen
	 * (see design/cultivars/cultivars-in-play.md).
	 */
	const shownCultivars = $derived.by(() => {
		const definingWindows = new Set(
			cultivars.storedCultivars
				.filter(definesSowingWindows)
				.map((cultivar) => normalizeCultivarName(cultivar.name))
		);
		const planted = new Set(plants.plantsCultivarNames.map(normalizeCultivarName));
		return [...cultivars.cultivars].filter(
			(cultivar) =>
				definingWindows.has(normalizeCultivarName(cultivar.name)) ||
				allCultivarNames(cultivar).some((name) =>
					planted.has(normalizeCultivarName(name))
				)
		);
	});

	const frostDatesPlantingWindows = $derived.by(() => {
		const windows: CultivarPlantingWindow[] = [];
		for (const environment of environments.environments) {
			for (const cultivar of shownCultivars) {
				const cultivarPlantingWindow = calculatePlantingWindow(
					cultivar,
					environment,
					{ start: timeline.beginSelection, end: timeline.endSelection },
					'frostDates'
				);
				if (cultivarPlantingWindow.windows.length > 0) {
					windows.push(cultivarPlantingWindow);
				}
			}
		}
		return windows;
	});

	return {
		get frostDatesPlantingWindows() {
			return frostDatesPlantingWindows;
		}
	};
}
export type PlantingWindowsContext = ReturnType<typeof createPlantingWindowsContext>;
