import { schema as s } from 'jazz-tools';

import { usersCredentialSchema } from './credentials/schema.js';
import { cultivarSchema } from './cultivars/schema.js';
import { environmentSchema } from './environments/schema.js';
import { gardenSchema } from './gardens/schema.js';
import { observationSchema } from './observations/schema.js';
import { plantSchema } from './plants/schema.js';
import { userSchema } from './users/schema.js';
import { workspaceSchema } from './workspaces/schema.js';

const appSchema = {
	...userSchema,
	...usersCredentialSchema,
	...gardenSchema,
	...observationSchema,
	...workspaceSchema,
	...environmentSchema,
	...cultivarSchema,
	...plantSchema
};

export type AppSchemaDefinition = s.Schema<typeof appSchema>;
export type AppSchema = s.App<AppSchemaDefinition>;

/**
 * Alias required by the `jazz-tools` CLI convention: `jazz-tools deploy`
 * scans the schema-dir root for a file exporting `schema`, `app`, or a
 * default export.
 */
export const app: AppSchema = s.defineApp(appSchema);
