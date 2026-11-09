import { z } from 'zod';

import { boundedRange } from '../fields.js';

/** Field specifications. */
const phSchema = boundedRange('The soil pH range the cultivar grows best in.', {
	minimum: 3,
	maximum: 11
});
export const fields = { phSchema };

/** Update command. */
export const SoilUpdateCommandSchema = z
	.object({ ph: phSchema.optional() })
	.describe('The soil the cultivar grows best in.');
export type SoilUpdateCommand = z.infer<typeof SoilUpdateCommandSchema>;
