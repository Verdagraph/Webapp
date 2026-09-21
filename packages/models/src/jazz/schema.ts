import { schema as s } from 'jazz-tools';

import { gardenSchema } from './gardens/schema.js';
import { usersStub } from './users.js';

/**
 * `usersStub` is a placeholder; real auth/user data stays on Triplit for
 * now (Better Auth integration is out of scope for this migration).
 */
const appSchema = {
	...usersStub,
	...gardenSchema
};

export type JazzSchema = s.Schema<typeof appSchema>;
export type JazzApp = s.App<JazzSchema>;
export const jazzApp: JazzApp = s.defineApp(appSchema);

/** Alias required by the `jazz-tools` CLI convention (expects `schema`, `app`, or a default export). */
export const app = jazzApp;
