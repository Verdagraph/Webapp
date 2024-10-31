import { ClientSchema } from '@triplit/client';
import { userSchema, roles } from './user/schema';
import { gardenSchema } from './garden/schema';

/** Export schema-derived TS types. */
export type * from './user/schema';

/** Export Triplit schemas. */
export const schema = {
	...userSchema,
	...gardenSchema
} satisfies ClientSchema;

/** Export Triplit roles. */
export { roles };

/** Export all mutation commands. */
export * from './user/mutations';
