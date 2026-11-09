import { z } from 'zod';

import { daysRange } from '../fields.js';

/** Field specifications. */
const bloomDaysSchema = daysRange('The days a plant stays in bloom.');
export const fields = { bloomDaysSchema };

/** Update command. */
export const FloweringUpdateCommandSchema = z
	.object({ bloomDays: bloomDaysSchema.optional() })
	.describe('How the plant flowers.');
export type FloweringUpdateCommand = z.infer<typeof FloweringUpdateCommandSchema>;
