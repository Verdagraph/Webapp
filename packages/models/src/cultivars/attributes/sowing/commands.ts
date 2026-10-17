import { z } from 'zod';

import { SunExposureEnumOptions } from './schema.js';

/** Field specifications. */
const sunExposureSchema = z.enum(SunExposureEnumOptions).describe(
	'The amount of direct sun the cultivar needs. \
			Full sun is roughly 6 or more hours of direct sun a day, partial shade 3 to 6 hours, and shade less than 3.'
);
const plantingDepthSchema = z
	.number()
	.min(0, 'May not be negative.')
	.max(1, 'May be at most 1m.')
	.describe('The depth in meters to sow seeds or set transplants at.');
const rowSpacingSchema = z
	.number()
	.min(0, 'May not be negative.')
	.max(10, 'May be at most 10m.')
	.describe(
		'The distance in meters between rows of this cultivar. \
			The distance between plants within a row is the minimum distance of the interplanting profile.'
	);
export const fields = {
	sunExposureSchema,
	plantingDepthSchema,
	rowSpacingSchema
};

/** Update command. */
export const SowingUpdateCommandSchema = z
	.object({
		sunExposure: sunExposureSchema.optional(),
		plantingDepth: plantingDepthSchema.optional(),
		rowSpacing: rowSpacingSchema.optional()
	})
	.describe(
		'The sowing profile describes the conditions and layout a cultivar is sown with.'
	);
export type SowingUpdateCommand = z.infer<typeof SowingUpdateCommandSchema>;
