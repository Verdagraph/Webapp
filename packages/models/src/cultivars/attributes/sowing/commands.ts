import { z } from 'zod';

import { rangeSchema } from '../range.js';
import { SunExposureEnumOptions } from './schema.js';

/** Field specifications. */
const length = (description: string, maximum: number) =>
	rangeSchema(
		z
			.number()
			.min(0, 'May not be negative.')
			.max(maximum, `May be at most ${maximum}m.`)
	).describe(description);

const sunExposureSchema = z.array(z.enum(SunExposureEnumOptions)).max(3).describe(
	'The amounts of direct sun the cultivar grows in. Full sun is roughly 6 or more hours of direct sun a day, partial shade 3 to 6 hours, and shade less than 3. \
			List every exposure it tolerates.'
);
const plantingDepthSchema = length(
	'The depth in meters to sow seeds or set transplants at.',
	1
);
const inRowSpacingSchema = length(
	'The distance in meters between plants within a row once established.',
	20
);
const rowSpacingSchema = length(
	'The distance in meters between rows of this cultivar.',
	20
);
const thinToSchema = length(
	'The distance in meters seedlings are thinned to, when the seeds are sown more closely than the final spacing.',
	20
);
const seedsPerHoleSchema = z
	.number()
	.int('Must be a whole number.')
	.min(1, 'Must be at least 1.')
	.max(100)
	.describe(
		'The number of seeds sown in each spot, before thinning to the strongest plant.'
	);
const successionIntervalDaysSchema = z
	.number()
	.min(1, 'Must be at least 1.')
	.max(365)
	.describe(
		'The default number of days between successive sowings, for a continuous harvest. This is a starting point which can be changed when planning.'
	);
export const fields = {
	sunExposureSchema,
	plantingDepthSchema,
	inRowSpacingSchema,
	rowSpacingSchema,
	thinToSchema,
	seedsPerHoleSchema,
	successionIntervalDaysSchema
};

/** Update command. */
export const SowingUpdateCommandSchema = z
	.object({
		sunExposure: sunExposureSchema.optional(),
		plantingDepth: plantingDepthSchema.optional(),
		inRowSpacing: inRowSpacingSchema.optional(),
		rowSpacing: rowSpacingSchema.optional(),
		thinTo: thinToSchema.optional(),
		seedsPerHole: seedsPerHoleSchema.optional(),
		successionIntervalDays: successionIntervalDaysSchema.optional()
	})
	.describe(
		'The sowing profile describes the conditions and layout a cultivar is sown with.'
	);
export type SowingUpdateCommand = z.infer<typeof SowingUpdateCommandSchema>;
