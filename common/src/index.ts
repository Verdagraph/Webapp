import { ClientSchema } from '@triplit/client';
import { userSchema, roles } from './users/schema';
import { gardenSchema } from './gardens/schema';

/** Export common modules. */
export * from './users/index';
export * from './gardens/index';

/** Export Triplit schemas. */
export const schema = {
	...userSchema,
	...gardenSchema
} satisfies ClientSchema;

/** Export Triplit roles. */
export { roles };
