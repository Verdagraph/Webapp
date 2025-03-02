import { z } from 'zod';
import { EnvironmentParentTypeEnum } from './schema';

/** Field specifications. */
export const environmentFields = {
	environmentName: z
		.string()
		.trim()
		.min(3, 'Must be at least 3 characters.')
		.max(30, 'May be at most 30 characters.')
		.regex(
			/^[a-zA-Z0-9 _-]*$/,
			'Must contain only alphanumeric characters, spaces, hyphens, and underscores.'
		)
		.describe(
			'Must be between 3 and 30 characters long and contain only alphanumeric characters, spaces, hyphens, and  underscores.'
		),

	environmentDescription: z
		.string()
		.trim()
		.max(700, 'May be at most 1400 characters.')
		.describe('May be at most 1400 characters.')
};

/**
 * Command to create a new environment.
 */
export const EnvironmentCreateCommandSchema = z.object({
	gardenId: z.string(),
	parendId: z.string(),
	parentType: z.enum(EnvironmentParentTypeEnum),
	name: environmentFields.environmentName,
	description: environmentFields.environmentDescription.default('')
});