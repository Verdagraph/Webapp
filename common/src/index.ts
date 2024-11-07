import { ClientSchema } from '@triplit/client';
import { userSchema, roles } from './user/schema';
import { gardenSchema } from './garden/schema';

/** Export common modules. */
export * from './user/index';
export * from './garden/index';

/** Export Triplit schemas. */
export const schema = {
	...userSchema,
	...gardenSchema
} satisfies ClientSchema;

/** Export Triplit roles. */
export { roles };