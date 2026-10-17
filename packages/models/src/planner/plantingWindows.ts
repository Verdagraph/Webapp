import {
	AppError,
	type Cultivar,
	type DateRange,
	type Environment,
	rangesOverlap
} from '@vdg-webapp/models';

export type PlantingWindow = {
	range: DateRange;
	/**
	 * A number from 0-1, where 0 indicates a plant should not be planted under any circumstances
	 * and a 1 indicates the optimal conditions for planting.
	 */
	suitability: number;
};

export type CultivarPlantingWindow = {
	cultivar: Cultivar;
	environment: Environment;
	/**
	 * All suitability outside of defined ranges is set to 0.
	 * Overlap of ranges is invalid.
	 */
	windows: Array<PlantingWindow>;
};

type PlantingWindowGenerationStrategy = 'frostDates' | 'meanWeeklyTemp';

export function calculatePlantingWindow(
	cultivar: Cultivar,
	environment: Environment,
	range: DateRange,
	strategy: PlantingWindowGenerationStrategy
): CultivarPlantingWindow {
	switch (strategy) {
		case 'frostDates':
			return calculatePlantingWindowFrostDates(cultivar, environment, range);
		case 'meanWeeklyTemp':
			return calculatePlantingWindowMeanWeeklyTemp(cultivar, environment, range);
		default:
			throw new AppError(
				'Unknown value of PlantingWindowGenerationStrategy within calculatePlantingWindow',
				{ nonFormErrors: ['Failed to generate a planting window.'] }
			);
	}
}

/**
 * Builds the window around one year's occurrence of a frost date.
 * Offsets are days relative to the frost date and may be zero or negative.
 * @param frostDate The environment's frost date. Only its month and day are used, it is not modified.
 * @param year The year to place the frost date in.
 * @param windowOpen Days from the frost date to the start of the window.
 * @param windowClose Days from the frost date to the end of the window.
 */
function frostDateWindowRange(
	frostDate: Date,
	year: number,
	windowOpen: number,
	windowClose: number
): DateRange {
	const month = frostDate.getMonth();
	const day = frostDate.getDate();
	return {
		start: new Date(year, month, day + windowOpen),
		end: new Date(year, month, day + windowClose)
	};
}

/**
 * Calculates the planting windows around the first and last frost date.
 * A window is only produced when the environment has the matching frost date
 * and the cultivar defines both its open and close offsets.
 * @param cultivar The cultivar to generate the windows with.
 * @param environment The environment to generate the windows with.
 * @param range The resulting windows are guaranteed to intersect with this range.
 * @returns A planting window around the first and last frost date for all years contained in the range.
 */
function calculatePlantingWindowFrostDates(
	cultivar: Cultivar,
	environment: Environment,
	range: DateRange
): CultivarPlantingWindow {
	const windows: PlantingWindow[] = [];

	const frostWindows = cultivar.attributes.frostDatePlantingWindows;
	const frostDates = environment.attributes.frostDates;

	const frostDateAndOffsets = [
		{
			frostDate: frostDates?.firstFrostDate,
			windowOpen: frostWindows?.firstFrostWindowOpen,
			windowClose: frostWindows?.firstFrostWindowClose
		},
		{
			frostDate: frostDates?.lastFrostDate,
			windowOpen: frostWindows?.lastFrostWindowOpen,
			windowClose: frostWindows?.lastFrostWindowClose
		}
	];

	/**
	 * Offsets can push a window into the adjacent year, so one extra year is
	 * checked on each side. Non-overlapping windows are filtered out below.
	 */
	const startYear = range.start.getFullYear() - 1;
	const endYear = range.end.getFullYear() + 1;

	for (let year = startYear; year <= endYear; year++) {
		for (const { frostDate, windowOpen, windowClose } of frostDateAndOffsets) {
			if (frostDate == null || windowOpen == null || windowClose == null) {
				continue;
			}
			const windowRange = frostDateWindowRange(
				frostDate,
				year,
				windowOpen,
				windowClose
			);
			if (rangesOverlap(range, windowRange)) {
				windows.push({ range: windowRange, suitability: 1 });
			}
		}
	}

	return {
		cultivar,
		environment,
		windows
	};
}

function calculatePlantingWindowMeanWeeklyTemp(
	cultivar: Cultivar,
	environment: Environment,
	range: DateRange
): CultivarPlantingWindow {
	return {
		cultivar,
		environment,
		windows: []
	};
}
