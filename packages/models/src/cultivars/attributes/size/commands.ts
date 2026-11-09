import { z } from 'zod';

import { lengthRange } from '../fields.js';

/** Field specifications. */
const heightSchema = lengthRange('The height in meters of a mature plant.', 100);
const spreadSchema = lengthRange('The width in meters a mature plant spreads to.', 100);
export const fields = { heightSchema, spreadSchema };

/** Update command. */
export const SizeUpdateCommandSchema = z
	.object({ height: heightSchema.optional(), spread: spreadSchema.optional() })
	.describe(
		'The size of a mature plant. How the size changes over time is in the expected geometry.'
	);
export type SizeUpdateCommand = z.infer<typeof SizeUpdateCommandSchema>;
