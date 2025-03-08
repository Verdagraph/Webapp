import { type } from 'arktype';
import { EnvironmentParentTypeEnum } from './schema';
import { commonFields } from '../commands';

/** Field specifications. */
export const environmentNameSchema = commonFields.name.configure({
	details: 'The name of the environment.'
});
export const environmentDescriptionSchema = commonFields.description.configure({
	details: 'Optional description.'
});
export const environmentParentTypeSchema = type
	.enumerated(...EnvironmentParentTypeEnum)
	.configure({
		details:
			'Defines the parent entity that the environment describes characteristics for. It may apply to the entire garden, a workspace, a planting area, or an independent geometry.'
	});

/**
 * Command to create a new environment.
 */
export const EnvironmentCreateCommandSchema = type({
	gardenId: 'string',
	parentaId: 'string',
	parentType: environmentParentTypeSchema.default('GARDEN'),
	name: environmentNameSchema,
	description: environmentDescriptionSchema.default('')
});
export type EnvironmentCreateCommand = typeof EnvironmentCreateCommandSchema.infer;
