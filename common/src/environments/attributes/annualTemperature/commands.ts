import { z } from 'zod';

/** Field specifications. */

export const environmentMinimumAnnualTempSchema = z
	.number()
	.describe(
		'The minimum temperature that is expected to occur within a year in the environment.'
	);
export const environmentMaximumAnnualTempSchema = z
	.number()
	.describe(
		'The maxmium temperature that is expected to occur within a year in the environment.'
	);

/** Update command. */
export const AnnualTemperatureUpdateCommandSchema = z
	.object({
		minimum: environmentMinimumAnnualTempSchema.optional(),
		maximum: environmentMaximumAnnualTempSchema.optional()
	})
	.describe('Defines the expected range of temperatures over a year.');
export type AnnualTemperatureUpdateCommand = z.infer<
	typeof AnnualTemperatureUpdateCommandSchema
>;
