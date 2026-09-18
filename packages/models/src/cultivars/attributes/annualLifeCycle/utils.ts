/**
 * The subset of a Cultivar's AnnualLifeCycleProfile needed to generate an
 * expected geometry/location history. Fields are nullable, not just
 * optional, matching how Triplit's S.Optional resolves in its generated
 * entity types.
 */
export type AnnualLifeCycleProfileLike = {
	sowToGerm?: number | null;
	germToTransplant?: number | null;
	germToFirstHarvest?: number | null;
	firstToLastHarvest?: number | null;
	lastHarvestToExpiry?: number | null;
};
