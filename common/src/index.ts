import { roles } from './users/schema';
import { plantSchema } from './plants';

/** Export common modules. */
export * from './users/index';
export * from './gardens/index';
export * from './workspaces/index';
export * from './cultivars/index';
export * from './environments/index';
export * from './plants/index';
export * from './utils';
export * from './errors'

/**
 * Export Triplit schemas.
 * Note that only plantSchema is exported because currently
 * schemas are included into eachother sequentially,
 * ie., workspaceSchema includes gardenSchema which includes userSchema.
 * This is required to maintain typing across the S.Collections()
 */
export const schema = plantSchema;

/** Export Triplit roles. */
export { roles };
