import { ClientSchema } from '@triplit/client';
import { userSchema, roles } from './users/schema';
import { gardenSchema } from './gardens/schema';
import { workspaceSchema } from './workspaces/schema';
import { cultivarSchema } from './cultivars/schema';

/** Export common modules. */
export * from './users/index';
export * from './gardens/index';
export * from './workspaces/index';
export * from './cultivars/index';

/** Export Triplit schemas. */
export const schema = {
	...userSchema,
	...gardenSchema,
	...workspaceSchema,
	...cultivarSchema
} satisfies ClientSchema;

/** Export Triplit roles. */
export { roles };
