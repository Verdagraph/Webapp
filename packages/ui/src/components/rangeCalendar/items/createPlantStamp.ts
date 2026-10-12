import { fromDate, getLocalTimeZone } from '@internationalized/date';
import { mode } from 'mode-watcher';

import {
	type Cultivar,
	PlantObservationLabels,
	type PlantsCreateCommand,
	historyGetRange
} from '@vdg-webapp/models';

import { getColor } from '$utils';

import { type CalendarItem, type CalendarItemInfoPoint } from '../types';

type StampPlant = PlantsCreateCommand['plants'][number];

const defaultBaseColor = getColor('grass', 6, mode.current);
const defaultBorderColor = getColor('grass', 11, mode.current);
const defaultItemColor = getColor('grass', 8, mode.current);

/**
 * Builds a preview CalendarItem for a not-yet-saved stamp staged in the Add
 * Plants form - the temporal counterpart to CreatePlantContainer.svelte's
 * live preview on the spatial Layout canvas. Modeled the same way
 * plantCalendarItem models a saved Plant's expectedLifespan: the date range
 * and info points come from the stamp's `expectedObservations` (the same
 * milestone observations that will be persisted verbatim on Create - see
 * generateExpectedHistories/stampSeeding.svelte.ts, which keeps them in sync
 * with every cultivar/origin/anchor change and drag/translate), widened by
 * the staged geometry/location dates the way a saved Plant's range is
 * widened by its beginDate/endDate. No popups on these info points though -
 * unlike a saved observation, there's no persisted id yet to edit or delete.
 */
export function createPlantStampCalendarItem(value: {
	plantIndex: number;
	plant: StampPlant;
	cultivar: Cultivar | null;
}): CalendarItem | null {
	const observationRange = historyGetRange(value.plant.expectedObservations);
	const geometryRange = historyGetRange([
		...(value.plant.geometryHistory?.geometries ?? []),
		...(value.plant.locationHistory?.locations ?? [])
	]);
	if (!observationRange && !geometryRange) {
		return null;
	}

	let minDate = observationRange?.min.date ?? geometryRange!.min.date;
	let maxDate = observationRange?.max.date ?? geometryRange!.max.date;
	if (geometryRange) {
		if (geometryRange.min.date < minDate) {
			minDate = geometryRange.min.date;
		}
		if (geometryRange.max.date > maxDate) {
			maxDate = geometryRange.max.date;
		}
	}

	const startDate = fromDate(minDate, getLocalTimeZone());
	const endDate = fromDate(maxDate, getLocalTimeZone());

	const fillColor = value.cultivar?.attributes.color?.baseColor || defaultBaseColor;
	const borderColor =
		value.cultivar?.attributes.color?.outlineColor || defaultBorderColor;
	const itemColor = value.cultivar?.attributes.color?.textColor || defaultItemColor;

	const infoPoints: CalendarItemInfoPoint[] = value.plant.expectedObservations.map(
		(observation) => ({
			label: PlantObservationLabels[observation.type] ?? 'Unknown Observation',
			date: fromDate(observation.date, getLocalTimeZone())
		})
	);

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
		itemStyleExpanded: 'border-dashed',
		infoPoints
	};
}
