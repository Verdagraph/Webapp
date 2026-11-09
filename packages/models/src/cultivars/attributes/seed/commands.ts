import { z } from 'zod';

/** Field specifications. */
const germinationPercentSchema = z
	.number()
	.min(0)
	.max(100)
	.describe(
		'The share of seeds, as a percentage, expected to germinate in good conditions.'
	);
const seedLifeYearsSchema = z
	.number()
	.min(0)
	.max(100)
	.describe('The years seeds usually stay viable when stored well.');
const seedsPerMeterRowSchema = z
	.number()
	.min(0)
	.max(100000)
	.describe('The number of seeds needed to sow one meter of row.');
export const fields = {
	germinationPercentSchema,
	seedLifeYearsSchema,
	seedsPerMeterRowSchema
};

/** Update command. */
export const SeedUpdateCommandSchema = z
	.object({
		germinationPercent: germinationPercentSchema.optional(),
		seedLifeYears: seedLifeYearsSchema.optional(),
		seedsPerMeterRow: seedsPerMeterRowSchema.optional()
	})
	.describe('What is known about the seed itself.');
export type SeedUpdateCommand = z.infer<typeof SeedUpdateCommandSchema>;
