import { z } from 'zod';

import { rangeSchema } from '../range.js';

/** Field specifications. */
const bloomDaysSchema = rangeSchema(z.number().min(0).max(3650)).describe(
	'The days a plant stays in bloom.'
);
export const fields = { bloomDaysSchema };

/** Update command. */
export const FloweringUpdateCommandSchema = z
	.object({ bloomDays: bloomDaysSchema.optional() })
	.describe('How the plant flowers.');
export type FloweringUpdateCommand = z.infer<typeof FloweringUpdateCommandSchema>;
