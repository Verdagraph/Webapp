import { fromDate, getLocalTimeZone } from '@internationalized/date';
import { mode } from 'mode-watcher';

import {
	type Cultivar,
	type PlantObservation,
	PlantObservationLabels,
	historyGetRange
} from '@vdg-webapp/models';

import { type ResolvedPlant } from '$state/application/plantsContext.svelte';
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
	plant: ResolvedPlant;
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
	if (!expectedRange) {
		return null;
	}
	const totalRange = expectedRange;
	if (recordedRange) {
		if (recordedRange.min.date < totalRange.min.date) {
			totalRange.min.date = recordedRange.min.date;
		}
		if (recordedRange.max.date > totalRange.max.date) {
			totalRange.max.date = recordedRange.max.date;
		}
	}
	const startDate = fromDate(totalRange.min.date, getLocalTimeZone());
	const endDate = fromDate(totalRange.max.date, getLocalTimeZone());

	const fillColor = value.cultivar.attributes?.color?.baseColor || defaultBaseColor;
	const borderColor =
		value.cultivar.attributes?.color?.outlineColor || defaultBorderColor;
	const itemColor = value.cultivar.attributes?.color?.textColor || defaultItemColor;

	const expectedLifespanInfoPoints: CalendarItemInfoPoint<{
		observation: PlantObservation;
	}>[] =
		value.plant.expectedLifespan.observations?.map((genericObservation) => {
			/**
			 * Observations resolve from Jazz as GenericObservation (untyped
			 * `data`); PlantObservation's discriminated union is a caller-side
			 * contract narrowed by `type`, same trust boundary the old
			 * Triplit-era Lifespan type asserted implicitly.
			 */
			const observation = genericObservation as PlantObservation;
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
		itemStyleCollapsed: 'rounded-none border-t-0',
		infoPoints: expectedLifespanInfoPoints
	};
	const recordedLifespanInfoPoints: CalendarItemInfoPoint<{
		observation: PlantObservation;
	}>[] =
		value.plant.recordedLifespan.observations?.map((genericObservation) => {
			const observation = genericObservation as PlantObservation;
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
		itemStyleCollapsed: 'rounded-t-none border-t-0',
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
		itemStyleExpanded: 'rounded-b-none'
	};
}
