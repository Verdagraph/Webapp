import { z } from 'zod';

import { daysRange } from '../fields.js';
import { MaturityBasisEnumOptions } from './schema.js';

/** Field specifications. */
const sowToGermSchema = daysRange(
	'The expected amount of days from starting a seed to its germination.'
);
const germToTransplantSchema = daysRange(
	'The expected amount of days from the germination of a seed to when it will be ready for transplant, which is the age of the seedling at transplant. \
            For cultivars which are not able to be transplanted, this value is unused.'
);
const germToFirstHarvestSchema = daysRange(
	'The expected amount of days from the germination of a seed to when it will be ready for a harvest. \
            If left unset, it is derived from the maturity days and their basis.'
);
const firstToLastHarvestSchema = daysRange(
	'The expected amount of days the first and last harvest of a plant. \
            For plants which only have one harvest, this value is zero.'
);
const lastHarvestToExpirySchema = daysRange(
	'The expected amount of days from the last harvest of a plant to its expiry.'
);
const maturityDaysSchema = daysRange(
	'The days to maturity as the seed packet states them, counted from the point given by the maturity basis.'
);
const maturityBasisSchema = z
	.enum(MaturityBasisEnumOptions)
	.describe(
		'What the days to maturity are counted from: sowing the seed, germination, or transplanting.'
	);
export const fields = {
	sowToGermSchema,
	germToTransplantSchema,
	germToFirstHarvestSchema,
	firstToLastHarvestSchema,
	lastHarvestToExpirySchema,
	maturityDaysSchema,
	maturityBasisSchema
};

/** Update command. */
export const AnnualLifecycleUpdateCommandSchema = z
	.object({
		sowToGerm: sowToGermSchema.optional(),
		germToTransplant: germToTransplantSchema.optional(),
		germToFirstHarvest: germToFirstHarvestSchema.optional(),
		firstToLastHarvest: firstToLastHarvestSchema.optional(),
		lastHarvestToExpiry: lastHarvestToExpirySchema.optional(),
		maturityDays: maturityDaysSchema.optional(),
		maturityBasis: maturityBasisSchema.optional()
	})
	.describe(
		'The annual lifecycle defines the length of the stages of life for annual plants.'
	);
export type AnnualLifecycleUpdateCommand = z.infer<
	typeof AnnualLifecycleUpdateCommandSchema
>;
