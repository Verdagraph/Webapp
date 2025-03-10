import { ClientSchema } from '@triplit/client';
import { userSchema, roles } from './users/schema';
import { gardenSchema } from './gardens/schema';
import { workspaceSchema } from './workspaces/schema';
import { cultivarSchema } from './cultivars/schema';
import { environmentSchema } from './environments/schema';
import { plantSchema } from './plants';
import { type TriplitClient } from '@triplit/client';

/** Export common modules. */
export * from './users/index';
export * from './gardens/index';
export * from './workspaces/index';
export * from './cultivars/index';
export * from './environments/index';
export * from './plants/index';
export * from './utils';

/** Export Triplit schemas. */
export const schema = {
	...userSchema,
	...gardenSchema,
	...workspaceSchema,
	...cultivarSchema,
	...environmentSchema,
	...plantSchema
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
