import { fromDate, getLocalTimeZone } from '@internationalized/date';
import { mode } from 'mode-watcher';

import {
	type Cultivar,
	type Plant,
	type PlantObservation,
	PlantObservationLabels,
	historyGetRange,
	isDraftPlant
} from '@vdg-webapp/models';

import { getColor } from '$utils';

import {
	type CalendarItem,
	type CalendarItemInfoPoint,
	createInfoPoint
} from '../types';
import { PlantObservationPopupContentComponents } from './infoPoints/observations/index';

const defaultBaseColor = getColor('grass', 6, mode.current);
const defaultBorderColor = getColor('grass', 11, mode.current);
const defaultItemColor = getColor('grass', 8, mode.current);

export function plantCalendarItem(value: {
	plant: Plant;
	cultivar: Cultivar | null;
}): CalendarItem | null {
	if (
		!value.plant.expectedLifespan ||
		!value.plant.recordedLifespan ||
		!value.cultivar
	) {
		return null;
	}

	const expectedRange = historyGetRange(value.plant.expectedLifespan.observations);
	const recordedRange = historyGetRange(value.plant.recordedLifespan.observations);

	/**
	 * Widened by beginDate/endDate - a denormalized cache of the Plant's
	 * earliest/latest date across its observations and geometry/location
	 * history (see PlantController#createSingle). Folding it in keeps the
	 * bar covering the Plant's full extent even if the two ever drift, and
	 * lets a Plant with no observations at all still render.
	 */
	let minDate = value.plant.beginDate;
	let maxDate = value.plant.endDate;
	if (expectedRange) {
		if (expectedRange.min.date < minDate) {
			minDate = expectedRange.min.date;
		}
		if (expectedRange.max.date > maxDate) {
			maxDate = expectedRange.max.date;
		}
	}
	if (recordedRange) {
		if (recordedRange.min.date < minDate) {
			minDate = recordedRange.min.date;
		}
		if (recordedRange.max.date > maxDate) {
			maxDate = recordedRange.max.date;
		}
	}

	const startDate = fromDate(minDate, getLocalTimeZone());
	const endDate = fromDate(maxDate, getLocalTimeZone());

	const fillColor = value.cultivar.attributes.color?.baseColor || defaultBaseColor;
	const borderColor =
		value.cultivar.attributes.color?.outlineColor || defaultBorderColor;
	const itemColor = value.cultivar.attributes.color?.textColor || defaultItemColor;

	/**
	 * A plant still sitting in an open, uncommitted DraftBucket renders
	 * faded/dashed rather than solid, matching the equivalent ghost styling
	 * on the Layout canvas (see EditablePlantContainer.svelte) - the same
	 * per-bucket visibility toggle (draftBucketsState.svelte.ts) governs
	 * whether it reaches this function at all.
	 */
	const ghostStyle = isDraftPlant(value.plant) ? 'opacity-50 border-dashed' : '';

	const expectedLifespanInfoPoints: CalendarItemInfoPoint<{
		observation: PlantObservation;
	}>[] =
		value.plant.expectedLifespan.observations?.map((observation) => {
			const label = PlantObservationLabels[observation.type] ?? 'Unknown Observation';
			return createInfoPoint({
				label: label,
				date: fromDate(observation.date, getLocalTimeZone()),
				popup: PlantObservationPopupContentComponents[observation.type] ?? undefined,
				popupProps: {
					observation
				}
			});
		}) ?? [];
	const expectedLifespanItem: CalendarItem = {
		id: value.plant.expectedLifespan.id,
		label: 'Expected',
		labelOnly: false,
		description: '',
		startDate,
		endDate,
		fillColor,
		borderColor,
		itemColor,
		bottomMargin: 0,
		itemStyleCollapsed: `rounded-none border-t-0 ${ghostStyle}`.trim(),
		infoPoints: expectedLifespanInfoPoints
	};
	const recordedLifespanInfoPoints: CalendarItemInfoPoint<{
		observation: PlantObservation;
	}>[] =
		value.plant.recordedLifespan.observations?.map((observation) => {
			return {
				label: PlantObservationLabels[observation.type] ?? 'Unknown Observation',
				date: fromDate(observation.date, getLocalTimeZone())
				//popup: ObservationInfopoint
			};
		}) ?? [];
	const recordedLifespanItem: CalendarItem = {
		id: value.plant.recordedLifespan.id,
		label: 'Recorded',
		labelOnly: false,
		description: '',
		startDate,
		endDate,
		fillColor,
		borderColor,
		itemColor,
		bottomMargin: 4,
		itemStyleCollapsed: `rounded-t-none border-t-0 ${ghostStyle}`.trim(),
		infoPoints: recordedLifespanInfoPoints
	};

	return {
		id: value.plant.id,
		label: value.plant.cultivarName,
		labelOnly: true,
		description: '',
		children: [expectedLifespanItem, recordedLifespanItem],
		startDate,
		endDate,
		fillColor,
		borderColor,
		itemColor,
		bottomMargin: 4,
		bottomMarginChild: 0,
		itemStyleCollapsed: ghostStyle || undefined,
		itemStyleExpanded: `rounded-b-none ${ghostStyle}`.trim()
	};
}
