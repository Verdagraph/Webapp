import { fromDate, getLocalTimeZone } from '@internationalized/date';
import { mode } from 'mode-watcher';

import {
	type Cultivar,
	type PlantsCreateCommand,
	historyGetRange
} from '@vdg-webapp/models';

import { getColor } from '$utils';

import { type CalendarItem } from '../types';

type StampPlant = PlantsCreateCommand['plants'][number];

const defaultBaseColor = getColor('grass', 6, mode.current);
const defaultBorderColor = getColor('grass', 11, mode.current);
const defaultItemColor = getColor('grass', 8, mode.current);

/**
 * Builds a preview CalendarItem for a not-yet-saved stamp staged in the Add
 * Plants form - the temporal counterpart to CreatePlantContainer.svelte's
 * live preview on the spatial Layout canvas. An unsubmitted stamp has no
 * Lifespan/observations yet (those only exist once Create is submitted), so
 * this reads its date range directly off the staged geometry/location
 * history instead of historyGetRange(lifespan.observations) the way
 * plantCalendarItem does for a saved Plant.
 */
export function createPlantStampCalendarItem(value: {
	plantIndex: number;
	plant: StampPlant;
	cultivar: Cultivar | null;
}): CalendarItem | null {
	const datedEntries = [
		...(value.plant.geometryHistory?.geometries ?? []),
		...(value.plant.locationHistory?.locations ?? [])
	];
	const range = historyGetRange(datedEntries);
	if (!range) {
		return null;
	}

	const startDate = fromDate(range.min.date, getLocalTimeZone());
	const endDate = fromDate(range.max.date, getLocalTimeZone());

	const fillColor = value.cultivar?.attributes.color?.baseColor || defaultBaseColor;
	const borderColor =
		value.cultivar?.attributes.color?.outlineColor || defaultBorderColor;
	const itemColor = value.cultivar?.attributes.color?.textColor || defaultItemColor;

	return {
		id: `stamp-${value.plantIndex}`,
		label: value.plant.cultivarName || 'New Plant',
		labelOnly: false,
		description: 'Staged, not yet saved',
		startDate,
		endDate,
		fillColor,
		borderColor,
		itemColor,
		bottomMargin: 4,
		itemStyleCollapsed: 'border-dashed',
		itemStyleExpanded: 'border-dashed'
	};
}
