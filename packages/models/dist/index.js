import { plantSchema } from './plants/index.js';
import { roles } from './users/schema.js';
/** Export common modules. */
export * from './users/index.js';
export * from './gardens/index.js';
export * from './workspaces/index.js';
export * from './cultivars/index.js';
export * from './environments/index.js';
export * from './plants/index.js';
export * from './utils.js';
export * from './errors.js';
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
//# sourceMappingURL=index.js.map