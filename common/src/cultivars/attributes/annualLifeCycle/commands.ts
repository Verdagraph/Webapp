import { z } from 'zod';

/** Field specifications. */
export const cultivarSowToGermSchema = z
	.number()
	.min(0, 'May not be negative.')
	.describe('The expected amount of days from starting a seed to its germination.');
export const cultivarGermToTransplantSchema = z
	.number()
	.min(0, 'May not be negative.')
	.describe(
		'The expected amount of days from the germination of a seed to when it will be ready for transplant. \
            For cultivars which are not able to be transplanted, this value is unused.'
	);
export const cultivarGermToFirstHarvestSchema = z
	.number()
	.min(0, 'May not be negative.')
	.describe(
		'The expected amount of days the germination of a seed to when it will be ready for a harvest.'
	);
export const cultivarFirstToLastHarvestSchema = z
	.number()
	.min(0, 'May not be negative.')
	.describe(
		'The expected amount of days the first and last harvest of a plant. \
            For plants which only have one harvest, this value is zero.'
	);

/** Update command. */
export const AnnualLifecycleUpdateCommandSchema = z
	.object({
		sowToGerm: cultivarSowToGermSchema.optional(),
		germToTransplant: cultivarGermToTransplantSchema.optional(),
		germToFirstHarvest: cultivarGermToFirstHarvestSchema.optional(),
		firstToLastHarvest: cultivarFirstToLastHarvestSchema.optional()
	})
	.describe(
		'The annual lifecycle defines the length of the stages of life for annual plants.'
	);
export type AnnualLifecycleUpdateCommand = z.infer<
	typeof AnnualLifecycleUpdateCommandSchema
>;
