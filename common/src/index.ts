import { ClientSchema } from '@triplit/client';
import { userSchema, roles } from './user/schema';

/** Export schema-derived TS types. */
export type * from './user/schema';

/** Export Triplit schemas. */
export const schema = {
	...userSchema
} satisfies ClientSchema;

/** Export Triplit roles. */
export { roles };

/** Export all mutation commands. */
export * from './user/mutations';
