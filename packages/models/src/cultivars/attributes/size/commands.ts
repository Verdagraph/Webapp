import { z } from 'zod';

import { rangeSchema } from '../range.js';

/** Field specifications. */
const size = (description: string) =>
	rangeSchema(z.number().min(0).max(100)).describe(description);
const heightSchema = size('The height in meters of a mature plant.');
const spreadSchema = size('The width in meters a mature plant spreads to.');
export const fields = { heightSchema, spreadSchema };

/** Update command. */
export const SizeUpdateCommandSchema = z
	.object({ height: heightSchema.optional(), spread: spreadSchema.optional() })
	.describe(
		'The size of a mature plant. How the size changes over time is in the expected geometry.'
	);
export type SizeUpdateCommand = z.infer<typeof SizeUpdateCommandSchema>;
