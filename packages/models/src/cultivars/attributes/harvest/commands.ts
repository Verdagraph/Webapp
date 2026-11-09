import { z } from 'zod';

import { rangeSchema } from '../range.js';
import { HarvestPartEnumOptions } from './schema.js';

/** Field specifications. */
const partSchema = z
	.enum(HarvestPartEnumOptions)
	.describe('The part of the plant which is harvested.');
const storageDaysSchema = rangeSchema(z.number().min(0).max(3650)).describe(
	'The days the harvest keeps once picked.'
);
export const fields = { partSchema, storageDaysSchema };

/** Update command. */
export const HarvestUpdateCommandSchema = z
	.object({ part: partSchema.optional(), storageDays: storageDaysSchema.optional() })
	.describe('What is harvested and how long it keeps.');
export type HarvestUpdateCommand = z.infer<typeof HarvestUpdateCommandSchema>;
