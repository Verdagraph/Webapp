import { z } from 'zod';

/** Field specifications. */
const minimumDistanceSchema = z
	.number()
	.min(0, 'May not be negative.')
	.max(100, 'May be at most 100m.')
	.describe(
		'The closest distance in meters another plant may be placed to this cultivar without conflict. \
			This is also the spacing between plants within a row.'
	);
export const fields = { minimumDistanceSchema };

/** Update command. */
export const InterplantingUpdateCommandSchema = z
	.object({
		minimumDistance: minimumDistanceSchema.optional()
	})
	.describe('The interplanting profile describes how closely plants may be placed.');
export type InterplantingUpdateCommand = z.infer<
	typeof InterplantingUpdateCommandSchema
>;
