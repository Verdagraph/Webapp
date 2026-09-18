import {
	type AnnualLifeCycleProfileLike,
	type ExpectedGeometryProfileLike
} from '../cultivars/index.js';
import {
	type GeometryCreateCommand,
	GeometryCreateCommandSchema,
	type GeometryType,
	type LocationCreateCommand,
	type Position
} from '../workspaces/index.js';
import { type Origin } from './schema.js';

/**
 * Named "Annual" deliberately: this chain models the single linear
 * seed-to-expiry lifecycle. A perennial's dormancy cycling is a different,
 * recurring, calendar-date-driven shape - it needs its own type when that
 * work happens, rather than extending this enum and implying the linear
 * chain already covers it.
 */
export const AnnualLifecycleMilestoneOptions = [
	'SEED',
	'GERMINATION',
	'TRANSPLANT',
	'FIRST_HARVEST',
	'LAST_HARVEST',
	'EXPIRY'
] as const;
export type AnnualLifecycleMilestone = (typeof AnnualLifecycleMilestoneOptions)[number];

export const AnnualLifecycleMilestoneLabels: Record<AnnualLifecycleMilestone, string> = {
	SEED: 'Seed',
	GERMINATION: 'Germination',
	TRANSPLANT: 'Transplant',
	FIRST_HARVEST: 'First Harvest',
	LAST_HARVEST: 'Last Harvest',
	EXPIRY: 'Expiry'
};

/**
 * Which milestones exist for a given Origin, in chain order. Transplant
 * origins skip a dedicated Germination entry - the plant isn't in its final
 * tracked workspace (and has no distinct size field) until transplant.
 */
export function annualMilestonesForOrigin(origin: Origin): AnnualLifecycleMilestone[] {
	switch (origin) {
		case 'DIRECT_SEED':
			return ['SEED', 'GERMINATION', 'FIRST_HARVEST', 'LAST_HARVEST', 'EXPIRY'];
		case 'SEED_TO_TRANSPLANT':
			return ['SEED', 'TRANSPLANT', 'FIRST_HARVEST', 'LAST_HARVEST', 'EXPIRY'];
		case 'SEEDLING_TO_TRANSPLANT':
			return ['TRANSPLANT', 'FIRST_HARVEST', 'LAST_HARVEST', 'EXPIRY'];
	}
}

/**
 * Each milestone's day-offset relative to an implicit Germination = day 0
 * reference point, regardless of whether Germination itself is one of this
 * origin's tracked milestones. `germToTransplant`/`germToFirstHarvest` are
 * both measured from germination, so anchoring every milestone to that same
 * reference point keeps a transplant's germination-to-first-harvest span
 * intact no matter when in that span the transplant happens.
 */
function daysFromGermination(lifeCycle: AnnualLifeCycleProfileLike | null | undefined) {
	const sowToGerm = lifeCycle?.sowToGerm ?? 0;
	const germToTransplant = lifeCycle?.germToTransplant ?? 0;
	const germToFirstHarvest = lifeCycle?.germToFirstHarvest ?? 0;
	const firstToLastHarvest = lifeCycle?.firstToLastHarvest ?? 0;
	const lastHarvestToExpiry = lifeCycle?.lastHarvestToExpiry ?? 0;

	const byMilestone: Record<AnnualLifecycleMilestone, number> = {
		SEED: -sowToGerm,
		GERMINATION: 0,
		TRANSPLANT: germToTransplant,
		FIRST_HARVEST: germToFirstHarvest,
		LAST_HARVEST: germToFirstHarvest + firstToLastHarvest,
		EXPIRY: germToFirstHarvest + firstToLastHarvest + lastHarvestToExpiry
	};
	return byMilestone;
}

export function addDays(date: Date, days: number): Date {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

/** The ExpectedGeometryProfile size field a milestone is sized from. */
function sizeForMilestone(
	profile: ExpectedGeometryProfileLike | null | undefined,
	milestone: AnnualLifecycleMilestone
): number | null | undefined {
	switch (milestone) {
		case 'SEED':
			return profile?.seedSize;
		case 'GERMINATION':
		case 'TRANSPLANT':
			return profile?.seedlingSize;
		case 'FIRST_HARVEST':
			return profile?.firstHarvestSize;
		case 'LAST_HARVEST':
			return profile?.lastHarvestSize;
		case 'EXPIRY':
			return profile?.expirySize;
	}
}

/** Applies a size (meters) to whichever dimension(s) a geometry type uses. */
function sizeOverrides(
	geometryType: GeometryType,
	size: number
): Partial<GeometryCreateCommand> {
	switch (geometryType) {
		case 'ELLIPSE':
			return { ellipseLength: size, ellipseWidth: size };
		case 'RECTANGLE':
			return { rectangleLength: size, rectangleWidth: size };
		case 'POLYGON':
			return { polygonRadius: size };
		case 'LINES':
			return {};
	}
}

/**
 * Derives the next history entry from the previous one, overriding only
 * what actually changes between milestones (date, size) - avoids every
 * caller having to hand-retype every other field just to move one forward.
 */
function deriveGeometry(
	previous: GeometryCreateCommand,
	overrides: Partial<GeometryCreateCommand>
): GeometryCreateCommand {
	return { ...previous, scaleFactor: 1, ...overrides };
}

/**
 * Generates a Plant's whole expected geometry history and a single anchored
 * location, driven by the Cultivar's per-milestone size/duration profiles.
 * `anchorMilestone`'s date is pinned to `anchorDate` (the currently focused
 * timeline day); every other milestone's date is computed backward/forward
 * from that pin, so scrubbing the timeline while placing a plant can
 * represent "as of today, this plant is already at X stage" rather than
 * always assuming today is the seed date.
 */
export function generateExpectedHistories(params: {
	expectedGeometryProfile: ExpectedGeometryProfileLike | null | undefined;
	annualLifecycleProfile: AnnualLifeCycleProfileLike | null | undefined;
	origin: Origin;
	anchorMilestone: AnnualLifecycleMilestone;
	anchorDate: Date;
	gardenId: string;
	workspaceId: string;
	coordinate: Position;
}): { geometries: GeometryCreateCommand[]; location: LocationCreateCommand } {
	const milestones = annualMilestonesForOrigin(params.origin);
	const offsets = daysFromGermination(params.annualLifecycleProfile);
	const anchorOffset = offsets[params.anchorMilestone];
	const geometryType = params.expectedGeometryProfile?.geometryType ?? 'RECTANGLE';

	const geometries: GeometryCreateCommand[] = [];
	for (const milestone of milestones) {
		const date = addDays(params.anchorDate, offsets[milestone] - anchorOffset);
		const size = sizeForMilestone(params.expectedGeometryProfile, milestone) ?? 1;
		const overrides: Partial<GeometryCreateCommand> = {
			name: AnnualLifecycleMilestoneLabels[milestone],
			date,
			...sizeOverrides(geometryType, size)
		};

		const previous = geometries[geometries.length - 1];
		geometries.push(
			previous
				? deriveGeometry(previous, overrides)
				: deriveGeometry(
						GeometryCreateCommandSchema.parse({ date, type: geometryType }),
						overrides
					)
		);
	}

	const location: LocationCreateCommand = {
		gardenId: params.gardenId,
		workspaceId: params.workspaceId,
		coordinate: params.coordinate,
		date: params.anchorDate
	};

	return { geometries, location };
}
