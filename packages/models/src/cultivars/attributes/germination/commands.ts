import { z } from 'zod';

import { boundedRange } from '../fields.js';

/** Field specifications. */
const soilTempSchema = boundedRange(
	'The soil temperature range in degrees Celsius seeds germinate best in.',
	{ minimum: -10, maximum: 60, unit: ' C' }
);
const needsLightSchema = z
	.boolean()
	.describe('Whether seeds need light to germinate, and so must be left uncovered.');
const stratificationDaysSchema = z
	.number()
	.min(0)
	.max(365)
	.describe('The days of cold, moist storage seeds need before they will germinate.');
const soakHoursSchema = z
	.number()
	.min(0)
	.max(168)
	.describe('The hours seeds should be soaked before sowing.');
export const fields = {
	soilTempSchema,
	needsLightSchema,
	stratificationDaysSchema,
	soakHoursSchema
};

/** Update command. */
export const GerminationUpdateCommandSchema = z
	.object({
		soilTemp: soilTempSchema.optional(),
		needsLight: needsLightSchema.optional(),
		stratificationDays: stratificationDaysSchema.optional(),
		soakHours: soakHoursSchema.optional()
	})
	.describe(
		'The conditions seeds need to germinate. The days it takes are in the annual lifecycle.'
	);
export type GerminationUpdateCommand = z.infer<typeof GerminationUpdateCommandSchema>;
