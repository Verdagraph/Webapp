import { ClientSchema } from '@triplit/client';
import { userSchema, roles } from './users/schema';
import { gardenSchema } from './gardens/schema';
import { workspaceSchema } from './workspaces/schema';

/** Export common modules. */
export * from './users/index';
export * from './gardens/index';
export * from './workspaces/index';

/** Export Triplit schemas. */
export const schema = {
	...userSchema,
	...gardenSchema,
	...workspaceSchema
} satisfies ClientSchema;

/** Export Triplit roles. */
export { roles };
