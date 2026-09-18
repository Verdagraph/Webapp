import { z } from 'zod';

/** Field specifications. */
const sowToGermSchema = z
	.number()
	.min(0, 'May not be negative.')
	.describe('The expected amount of days from starting a seed to its germination.');
const germToTransplantSchema = z.number().min(0, 'May not be negative.').describe(
	'The expected amount of days from the germination of a seed to when it will be ready for transplant. \
            For cultivars which are not able to be transplanted, this value is unused.'
);
const germToFirstHarvestSchema = z
	.number()
	.min(0, 'May not be negative.')
	.describe(
		'The expected amount of days the germination of a seed to when it will be ready for a harvest.'
	);
const firstToLastHarvestSchema = z.number().min(0, 'May not be negative.').describe(
	'The expected amount of days the first and last harvest of a plant. \
            For plants which only have one harvest, this value is zero.'
);
const lastHarvestToExpirySchema = z
	.number()
	.min(0, 'May not be negative.')
	.describe('The expected amount of days from the last harvest of a plant to its expiry.');
export const fields = {
	sowToGermSchema,
	germToTransplantSchema,
	germToFirstHarvestSchema,
	firstToLastHarvestSchema,
	lastHarvestToExpirySchema
};

/** Update command. */
export const AnnualLifecycleUpdateCommandSchema = z
	.object({
		sowToGerm: sowToGermSchema.optional(),
		germToTransplant: germToTransplantSchema.optional(),
		germToFirstHarvest: germToFirstHarvestSchema.optional(),
		firstToLastHarvest: firstToLastHarvestSchema.optional(),
		lastHarvestToExpiry: lastHarvestToExpirySchema.optional()
	})
	.describe(
		'The annual lifecycle defines the length of the stages of life for annual plants.'
	);
export type AnnualLifecycleUpdateCommand = z.infer<
	typeof AnnualLifecycleUpdateCommandSchema
>;
