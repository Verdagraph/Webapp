import { z } from 'zod';
import { EnvironmentParentTypeEnum } from './schema';
import { commonDescriptionSchema, commonNameSchema } from '@common/commands';

/** Field specifications. */
export const environmentNameSchema = commonNameSchema.describe(
	'Name of the environment. Must be unique.'
);

export const environmentDescriptionSchema = commonDescriptionSchema.describe(
	'Optional description.'
);
export const environmentParentTypeSchema = z.enum(EnvironmentParentTypeEnum);

/**
 * Command to create a new environment.
 */
export const EnvironmentCreateCommandSchema = z.object({
	gardenId: z.string(),
	parendId: z.string(),
	parentType: environmentParentTypeSchema.default('GARDEN'),
	name: environmentNameSchema,
	description: environmentDescriptionSchema.default('')
});
export type EnvironmentCreateCommand = z.infer<typeof EnvironmentCreateCommandSchema>;
