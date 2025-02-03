import { Schema as S } from '@triplit/client';
import { z } from 'zod';

/** Schema. */
export const AnnualTemperatureProfile = S.Record({
	minimum: S.Optional(S.Number()),
	maximum: S.Optional(S.Number())
});

/** Field specifications. */
export const fields = {
	minimum: z
		.number()
		.describe(
			'The minimum temperature that is expected to occur within a year in the environment.'
		),
	maximum: z
		.number()
		.describe(
			'The maxmium temperature that is expected to occur within a year in the environment.'
		)
};

/** Update command. */
export const AnnualTemperatureUpdateCommand = z
	.object({
		minimum: fields.minimum.optional(),
		maximum: fields.maximum.optional()
	})
	.describe('Defines the expected range of temperatures over a year.');
