import { fromDate, getLocalTimeZone } from '@internationalized/date';
import { mode } from 'mode-watcher';

import {
	type CultivarPlantingWindow,
	type DateRange,
	getBoundingDateRange
} from '@vdg-webapp/models';

import { getColor } from '$utils';

import type { CalendarItem } from '../types';

const defaultBaseColor = getColor('grass', 6, mode.current);
const defaultBorderColor = getColor('grass', 11, mode.current);
const defaultItemColor = getColor('grass', 8, mode.current);

function toDateValues(range: DateRange) {
	return {
		startDate: fromDate(range.start, getLocalTimeZone()),
		endDate: fromDate(range.end, getLocalTimeZone())
	};
}

/**
 * Builds the calendar items for a cultivar's planting windows within one environment.
 * The cultivar row spans all of its windows, with one child bar per window.
 */
function cultivarPlantingWindowCalendarItem(
	plantingWindow: CultivarPlantingWindow
): CalendarItem | null {
	const totalRange = getBoundingDateRange(
		plantingWindow.windows.map((window) => window.range)
	);
	if (!totalRange) {
		return null;
	}

	const { cultivar, environment } = plantingWindow;
	const fillColor = cultivar.attributes.color?.baseColor || defaultBaseColor;
	const borderColor = cultivar.attributes.color?.outlineColor || defaultBorderColor;
	const itemColor = cultivar.attributes.color?.textColor || defaultItemColor;
	const rowId = `${environment.id}|${cultivar.id}`;

	const windowItems: CalendarItem[] = plantingWindow.windows.map((window, index) => ({
		id: `${rowId}|window[${index}]`,
		label: `Window ${index + 1}`,
		labelOnly: false,
		description: `${Math.round(window.suitability * 100)}% suitable`,
		...toDateValues(window.range),
		fillColor,
		borderColor,
		itemColor,
		bottomMargin: 4
	}));

	return {
		id: rowId,
		label: cultivar.name || cultivar.abbreviation,
		labelOnly: true,
		description: '',
		...toDateValues(totalRange),
		fillColor,
		borderColor,
		itemColor,
		bottomMargin: 4,
		bottomMarginChild: 0,
		itemStyleExpanded: 'rounded-b-none',
		children: windowItems
	};
}

/**
 * Builds the planting window rows: Environment > Cultivar > Window.
 * @param plantingWindows Planting windows for every environment and cultivar combination.
 */
export function plantingWindowCalendarItems(
	plantingWindows: CultivarPlantingWindow[]
): CalendarItem[] {
	const windowsByEnvironment = Map.groupBy(
		plantingWindows,
		(plantingWindow) => plantingWindow.environment.id
	);

	return [...windowsByEnvironment.values()]
		.map((environmentWindows) => {
			const cultivarItems = environmentWindows
				.map(cultivarPlantingWindowCalendarItem)
				.filter((item) => item !== null);
			const totalRange = getBoundingDateRange(
				environmentWindows.flatMap((plantingWindow) =>
					plantingWindow.windows.map((window) => window.range)
				)
			);
			if (!totalRange) {
				return null;
			}
			const environment = environmentWindows[0].environment;
			return {
				id: environment.id,
				label: environment.name,
				labelOnly: true,
				description: '',
				...toDateValues(totalRange),
				fillColor: defaultBaseColor,
				borderColor: defaultBorderColor,
				itemColor: defaultItemColor,
				bottomMargin: 4,
				bottomMarginChild: 0,
				itemStyleExpanded: 'rounded-b-none',
				children: cultivarItems
			} satisfies CalendarItem;
		})
		.filter((item) => item !== null);
}
