import { z } from 'zod';

import { rangeSchema } from '../range.js';

/** Field specifications. */
const phSchema = rangeSchema(z.number().min(3).max(11)).describe(
	'The soil pH range the cultivar grows best in.'
);
export const fields = { phSchema };

/** Update command. */
export const SoilUpdateCommandSchema = z
	.object({ ph: phSchema.optional() })
	.describe('The soil the cultivar grows best in.');
export type SoilUpdateCommand = z.infer<typeof SoilUpdateCommandSchema>;
