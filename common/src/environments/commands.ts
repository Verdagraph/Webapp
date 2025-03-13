import { z } from 'zod';
import { EnvironmentParentTypeEnumOptions } from './schema';
import { commonFields } from '../commands';
import { attributesSchemas } from './attributes';

/** Field specifications. */
const environmentNameSchema = commonFields.nameSchema.describe(
	'Name of the environment. Must be unique.'
);

const environmentDescriptionSchema = commonFields.descriptionSchema.describe(
	'Optional description.'
);
const environmentParentTypeSchema = z.enum(EnvironmentParentTypeEnumOptions);
export const environmentFields = {
	environmentNameSchema,
	environmentDescriptionSchema,
	environmentParentTypeSchema,
	...attributesSchemas
};

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
