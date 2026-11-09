import {
	AppError,
	type Cultivar,
	type DateRange,
	type Environment,
	type Origin,
	daysToFirstHarvest,
	rangesOverlap
} from '@vdg-webapp/models';

/** The ways of starting a plant that have a window, as named in the cultivar's sowing windows. */
export const SowingMethodOptions = [
	'directSeed',
	'indoorStart',
	'transplantOut'
] as const;
export type SowingMethod = (typeof SowingMethodOptions)[number];

export const SowingMethodLabels: Record<SowingMethod, string> = {
	directSeed: 'Direct sow',
	indoorStart: 'Start indoors',
	transplantOut: 'Plant out'
};

/** The origin a plant has when it is started with each method. */
const OriginOfSowingMethod: Record<SowingMethod, Origin> = {
	directSeed: 'DIRECT_SEED',
	indoorStart: 'SEED_TO_TRANSPLANT',
	transplantOut: 'SEEDLING_TO_TRANSPLANT'
};

export type PlantingWindow = {
	range: DateRange;
	/**
	 * A number from 0-1, where 0 indicates a plant should not be planted under any circumstances
	 * and a 1 indicates the optimal conditions for planting.
	 */
	suitability: number;
	/** How the plant is started in this window. */
	method: SowingMethod;
	/** The frost date the window was measured from. */
	frost: 'lastFrost' | 'firstFrost';
};

export type CultivarPlantingWindow = {
	cultivar: Cultivar;
	environment: Environment;
	/**
	 * All suitability outside of defined ranges is set to 0.
	 * Windows of the same method do not overlap, but windows of different methods may,
	 * for example sowing indoors while the ground is still too cold to plant out.
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
 * A date a number of days from one year's occurrence of a frost date.
 * Offsets are days relative to the frost date and may be zero or negative.
 * @param frostDate The environment's frost date. Only its month and day are used, it is not modified.
 * @param year The year to place the frost date in.
 * @param offset Days from the frost date.
 */
function frostDateOffset(frostDate: Date, year: number, offset: number): Date {
	return new Date(year, frostDate.getMonth(), frostDate.getDate() + offset);
}

/**
 * Where a window with no close ends, so that a plant can still be harvested.
 * A fall window ends at the first frost. A spring window of a warm or hot season cultivar ends
 * early enough to reach its first harvest before the first frost. Any other spring window ends at
 * the first frost, since a cool season cultivar may be harvested into frost. With no first frost
 * date, it ends at the end of the year.
 * @param cultivar The cultivar the window is for.
 * @param method How the plant is started.
 * @param frost The frost date the window opens from.
 * @param firstFrostDate The environment's first frost date.
 * @param year The year of the frost date the window opens from.
 */
function openEndedClose(
	cultivar: Cultivar,
	method: SowingMethod,
	frost: 'lastFrost' | 'firstFrost',
	firstFrostDate: Date | null | undefined,
	year: number
): Date {
	if (!firstFrostDate) {
		return new Date(year, 11, 31);
	}
	const seasonType = cultivar.attributes.classification?.seasonType;
	const needsWarmth = seasonType === 'WARM' || seasonType === 'HOT';
	const leadDays =
		frost === 'lastFrost' && needsWarmth
			? daysToFirstHarvest(
					cultivar.attributes.annualLifeCycle,
					cultivar.attributes.origin,
					OriginOfSowingMethod[method]
				)
			: 0;
	return frostDateOffset(firstFrostDate, year, -leadDays);
}

/**
 * Calculates the planting windows around the first and last frost date from the cultivar's
 * sowing windows. A window is only produced when the environment has the frost date the window is
 * measured from. A window with no close ends where a plant can still be harvested (see openEndedClose).
 * @param cultivar The cultivar to generate the windows with.
 * @param environment The environment to generate the windows with.
 * @param range The resulting windows are guaranteed to intersect with this range.
 * @returns The windows of all years contained in the range, earliest first.
 */
function calculatePlantingWindowFrostDates(
	cultivar: Cultivar,
	environment: Environment,
	range: DateRange
): CultivarPlantingWindow {
	const windows: PlantingWindow[] = [];

	const sowingWindows = cultivar.attributes.sowingWindows;
	const frostDates = environment.attributes.frostDates;
	const frostDateOf = {
		lastFrost: frostDates?.lastFrostDate,
		firstFrost: frostDates?.firstFrostDate
	} as const;

	/**
	 * Offsets can push a window into the adjacent year, so one extra year is
	 * checked on each side. Non-overlapping windows are filtered out below.
	 */
	const startYear = range.start.getFullYear() - 1;
	const endYear = range.end.getFullYear() + 1;

	for (let year = startYear; year <= endYear; year++) {
		for (const method of SowingMethodOptions) {
			for (const frost of ['lastFrost', 'firstFrost'] as const) {
				const window = sowingWindows?.[method]?.[frost];
				const frostDate = frostDateOf[frost];
				if (window == null || window.open == null || frostDate == null) {
					continue;
				}
				const start = frostDateOffset(frostDate, year, window.open);
				const end =
					window.close != null
						? frostDateOffset(frostDate, year, window.close)
						: openEndedClose(cultivar, method, frost, frostDateOf.firstFrost, year);
				if (end < start) {
					continue;
				}
				const windowRange = { start, end };
				if (rangesOverlap(range, windowRange)) {
					windows.push({ range: windowRange, suitability: 1, method, frost });
				}
			}
		}
	}
	windows.sort((a, b) => a.range.start.getTime() - b.range.start.getTime());

	return { cultivar, environment, windows };
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
