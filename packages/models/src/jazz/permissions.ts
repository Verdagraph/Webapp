import { constructGardenPermissions } from './gardens/permissions.js';
import { app } from './schema.js';

export const permissions = constructGardenPermissions(app);
