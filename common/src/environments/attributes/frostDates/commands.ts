import { z } from 'zod';

/** Field specifications. */
export const environmentLastFrostDateSchema = z
	.date()
	.describe(
		'The date within the environment when the last frost of the year is expected to occur.'
	);
export const environmentFirstFrostDateSchema = z
	.date()
	.describe(
		'The date within the environment when the first frost of the year is expected to occur.'
	);

/** Update command. */
export const FrostDatesUpdateCommandSchema = z
	.object({
		lastFrostDate: environmentLastFrostDateSchema.optional(),
		firstFrostDate: environmentFirstFrostDateSchema.optional()
	})
	.describe(
		'Defines when the first and last frost are expected to occur within a year.'
	);
export type FrostDatesUpdateCommand = z.infer<typeof FrostDatesUpdateCommandSchema>;
