import { ClientSchema } from '@triplit/client';
import { userSchema, roles } from './users/schema';
import { gardenSchema } from './gardens/schema';
import { workspaceSchema } from './workspaces/schema';
import { type TriplitClient } from '@triplit/client';

/** Export common modules. */
export * from './users/index';
export * from './gardens/index';
export * from './workspaces/index';
export * from './utils';

/** Export Triplit schemas. */
export const schema = {
	...userSchema,
	...gardenSchema,
	...workspaceSchema
} satisfies ClientSchema;

/** Export Triplit roles. */
export { roles };

/** Defines the type of a Triplit transaction,
 * this may be exposed by Triplit client library in the future.
 */
type DBTransaction<M extends ClientSchema> = Parameters<
	Parameters<TriplitClient<M>['transact']>[0]
>[0];
export type TriplitTransaction = DBTransaction<typeof schema>;
