import { type CultivarAttributes } from '../../cultivars/index.js';
import {
	type GeometryCreateCommand,
	GeometryCreateCommandSchema,
	type LocationCreateCommand
} from '../../workspaces/index.js';
import { type Origin } from '../schema.js';
import { addDays, deriveGeometry, dimensionOverridesForSize } from './common.js';

/**
 * Named "Annual" deliberately: this chain models the single linear
 * seed-to-expiry lifecycle. A perennial's dormancy cycling is a different,
 * recurring, calendar-date-driven shape - it needs its own type when that
 * work happens (see perennial.ts), rather than extending this enum and
 * implying the linear chain already covers it.
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

export const AnnualLifecycleMilestoneLabels: Record<AnnualLifecycleMilestone, string> =
	{
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
 *
 * SEEDLING_TO_TRANSPLANT (bought/started as a seedling, never tracked as a
 * seed in this garden) never reads GERMINATION's `0` - it's computed here
 * regardless since this function doesn't know which origin is calling it,
 * but `annualMilestonesForOrigin` never includes GERMINATION for that
 * origin, so it's simply unused, not a source of wrong dates. What DOES
 * matter for that origin: TRANSPLANT's offset is `germToTransplant`, and
 * FIRST_HARVEST's offset is `germToFirstHarvest` - the gap between them
 * (`germToFirstHarvest - germToTransplant`) is what actually determines how
 * long after transplant the first harvest lands. Both fields need real
 * values on the Cultivar for that gap to be meaningful; a missing one
 * defaults to 0 like every other duration here, which won't crash but will
 * silently produce a shorter-than-intended (or, if germToTransplant is the
 * one missing, equal-to-germToFirstHarvest) span rather than an error - a
 * Cultivar meant to be used as SEEDLING_TO_TRANSPLANT should have both set.
 */
function daysFromGermination(lifeCycle: CultivarAttributes['annualLifeCycle']) {
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

/**
 * The ExpectedGeometryProfile size field a milestone is sized from. Seed and
 * Germination both read `seedSize` - Germination is just-emerged, still
 * seed-scale, not yet the more-grown "ready for transplant" size that
 * `seedlingSize` represents. `seedlingSize` is reserved for Transplant,
 * which is the only milestone it applies to; a DIRECT_SEED plant (which
 * never has a Transplant milestone) never reads `seedlingSize` at all -
 * that's intentional, not a gap, since it has no equivalent moment.
 */
function sizeForMilestone(
	profile: CultivarAttributes['expectedGeometry'],
	milestone: AnnualLifecycleMilestone
): number | null | undefined {
	switch (milestone) {
		case 'SEED':
		case 'GERMINATION':
			return profile?.seedSize;
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
	expectedGeometryProfile: CultivarAttributes['expectedGeometry'];
	annualLifecycleProfile: CultivarAttributes['annualLifeCycle'];
	origin: Origin;
	anchorMilestone: AnnualLifecycleMilestone;
	anchorDate: Date;
	gardenId: string;
	workspaceId: string;
	coordinate: { x: number; y: number };
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
			...dimensionOverridesForSize(geometryType, size)
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

	const location = generateAnnualLocation(params);

	return { geometries, location };
}

/**
 * A single location entry, dated at the anchor. This is the one piece of
 * `generateExpectedHistories` that's deliberately behind the milestone
 * chain: a real transplant-origin plant lives in TWO places (a seed/nursery
 * workspace, then a different final workspace), but placing it today only
 * ever captures one.
 *
 * Planned extension (not built yet - tracked as a follow-up task): give this
 * function an optional second `{ workspaceId, coordinate }` for the
 * transplant destination. When present and `origin` has a TRANSPLANT
 * milestone, return two entries instead of one - the seed placement dated
 * at the SEED milestone, the transplant placement dated at the TRANSPLANT
 * milestone - instead of collapsing the whole plant onto whichever single
 * spot the anchor happens to land on. Pulled out as its own function now,
 * ahead of actually needing it, so that change is additive here rather than
 * a rewrite of `generateExpectedHistories` itself.
 */
function generateAnnualLocation(params: {
	anchorDate: Date;
	gardenId: string;
	workspaceId: string;
	coordinate: { x: number; y: number };
}): LocationCreateCommand {
	return {
		gardenId: params.gardenId,
		workspaceId: params.workspaceId,
		coordinate: params.coordinate,
		date: params.anchorDate
	};
}
