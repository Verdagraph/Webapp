import { z } from 'zod';

import { OriginEnumOptions } from '../../../plants/origin.js';
import { TransplantToleranceEnumOptions } from './schema.js';

/** Field specifications. */
const preferredSchema = z.enum(OriginEnumOptions).describe(
	'The way plants of this cultivar are normally created, and the default when adding plants. \
		A seed sown where it will grow is DIRECT_SEED. A seed started in one place and moved is SEED_TO_TRANSPLANT. \
		A young plant bought or started elsewhere is SEEDLING_TO_TRANSPLANT.'
);
const allowedSchema = z
	.array(z.enum(OriginEnumOptions))
	.max(3)
	.describe(
		'Every way plants of this cultivar can be created. Some plants, such as carrots, do not tolerate transplants and so allow only DIRECT_SEED.'
	);
const transplantToleranceSchema = z
	.enum(TransplantToleranceEnumOptions)
	.describe('How well plants recover from being transplanted.');
const transplantShockDaysSchema = z
	.number()
	.min(0, 'May not be negative.')
	.max(365)
	.describe(
		'The days a transplanted plant is set back before it resumes growing. This is added to the time to harvest of plants that are transplanted.'
	);
const minNightTempToTransplantSchema = z
	.number()
	.min(-30)
	.max(40)
	.describe(
		'The lowest night time temperature in degrees Celsius at which seedlings should be moved outdoors.'
	);
export const fields = {
	preferredSchema,
	allowedSchema,
	transplantToleranceSchema,
	transplantShockDaysSchema,
	minNightTempToTransplantSchema
};

/** Update command. */
export const OriginUpdateCommandSchema = z
	.object({
		preferred: preferredSchema.optional(),
		allowed: allowedSchema.optional(),
		transplantTolerance: transplantToleranceSchema.optional(),
		transplantShockDays: transplantShockDaysSchema.optional(),
		minNightTempToTransplant: minNightTempToTransplantSchema.optional()
	})
	.describe('The origin refers to the method used to create plants.');
export type OriginUpdateCommand = z.infer<typeof OriginUpdateCommandSchema>;
