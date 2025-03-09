import { z } from 'zod';

/** Field specifications. */

export const cultivarTransplantableSchema = z.boolean().describe(
	"Defines whether a plant may be started as a seed in one location and transplanted to another. \
		Some plants, such as carrots, don't tolerate transplants, and so must be started directly."
);

/** Update command. */
export const OriginUpdateCommandSchema = z
	.object({
		transplantable: cultivarTransplantableSchema.optional()
	})
	.describe('The origin refers to the method used to create plants.');
export type OriginUpdateCommand = z.infer<typeof OriginUpdateCommandSchema>;
