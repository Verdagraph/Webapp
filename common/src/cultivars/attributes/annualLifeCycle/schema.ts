import { Schema as S } from '@triplit/client';
import { z } from 'zod';

/**
 * The annual lifecycle defines the length of the stages of life for annual plants.
 */
export const AnnualLifeCycleProfile = S.Record({
	sowToGerm: S.Optional(S.Number()),
	germToTransplant: S.Optional(S.Number()),
	germToFirstHarvest: S.Optional(S.Number()),
	firstToLastHarvest: S.Optional(S.Number())
});

/** Field specifications. */
export const fields = {
	sowToGerm: z
		.number()
		.min(0, 'May not be negative.')
		.describe(
			'The expected amount of days from starting a seed to its germination. May not be negative.'
		),
	germToTransplant: z.number().min(0, 'May not be negative.').describe(
		'The expected amount of days from the germination of a seed to when it will be ready for transplant. \
            For cultivars which are not able to be transplanted, this value is unused.'
	),
	germToFirstHarvest: z
		.number()
		.min(0, 'May not be negative.')
		.describe(
			'The expected amount of days the germination of a seed to when it will be ready for a harvest.'
		),
	firstToLastHarvest: z.number().min(0, 'May not be negative.').describe(
		'The expected amount of days the first and last harvest of a plant. \
            For plants which only have one harvest, this value is zero.'
	)
};

/**
 * Command to update an annual lifecycle profile.
 */
export const AnnualLifecycleUpdateCommand = z
	.object({
		sowToGerm: fields.sowToGerm.optional(),
		germToTransplant: fields.germToTransplant.optional(),
		germToFirstHarvest: fields.germToFirstHarvest.optional(),
		firstToLastHarvest: fields.firstToLastHarvest.optional()
	})
	.describe(
		'The annual lifecycle defines the length of the stages of life for annual plants.'
	);
