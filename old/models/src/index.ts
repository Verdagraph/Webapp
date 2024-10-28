import { ClientSchema } from '@triplit/client';
import { userSchema, roles } from '../../../common/src/user/schema';

/** Export schema-derived TS types. */
export type * from '../../../common/src/user/schema';

/** Export Triplit schemas. */
export const schema = {
	...userSchema
} satisfies ClientSchema;

/** Export Triplit roles. */
export { roles };

/** Export all mutation commands. */
export * from '../../../common/src/user/mutations';
