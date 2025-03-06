import { type } from 'arktype';

/** Field specifications. */
export const cultivarSowToGermSchema = type('number >= 0').configure({
	details: 'The expected amount of days from starting a seed to its germination.'
});
export const cultivarGermToTransplantSchema = type('number >= 0').configure({
	details:
		'The expected amount of days from the germination of a seed to when it will be ready for transplant. \
            For cultivars which are not able to be transplanted, this value is unused.'
});
export const cultivarGermToFirstHarvestSchema = type('number >= 0').configure({
	details:
		'The expected amount of days the germination of a seed to when it will be ready for a harvest.'
});
export const cultivarFirstToLastHarvestSchema = type('number >= 0').configure({
	details:
		'The expected amount of days the first and last harvest of a plant. \
            For plants which only have one harvest, this value is zero.'
});

/** Update command. */
export const AnnualLifecycleUpdateCommandSchema = type({
	sowToGerm: cultivarSowToGermSchema.optional(),
	germToTransplant: cultivarGermToTransplantSchema.optional(),
	germToFirstHarvest: cultivarGermToFirstHarvestSchema.optional(),
	firstToLastHarvest: cultivarFirstToLastHarvestSchema.optional()
}).configure({
	details:
		'The annual lifecycle defines the length of the stages of life for annual plants.'
});
export type AnnualLifecycleUpdateCommand =
	typeof AnnualLifecycleUpdateCommandSchema.infer;
