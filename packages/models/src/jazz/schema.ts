import { schema as s } from 'jazz-tools';

import { usersCredentialSchema } from './credentials/schema.js';
import { cultivarSchema } from './cultivars/schema.js';
import { environmentSchema } from './environments/schema.js';
import { gardenSchema } from './gardens/schema.js';
import { observationSchema } from './observations/schema.js';
import { plantSchema } from './plants/schema.js';
import { usersStub } from './users.js';
import { workspaceSchema } from './workspaces/schema.js';

const appSchema = {
	...usersStub,
	...usersCredentialSchema,
	...gardenSchema,
	...observationSchema,
	...workspaceSchema,
	...environmentSchema,
	...cultivarSchema,
	...plantSchema
};

export type JazzSchema = s.Schema<typeof appSchema>;
export type JazzApp = s.App<JazzSchema>;
export const jazzApp: JazzApp = s.defineApp(appSchema);

/** Alias required by the `jazz-tools` CLI convention (expects `schema`, `app`, or a default export). */
export const app = jazzApp;
