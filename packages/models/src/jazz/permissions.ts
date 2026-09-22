import { schema as s } from 'jazz-tools';

import { constructEnvironmentsPolicy } from './environments/permissions.js';
import {
	constructGardenMembershipsPolicy,
	constructGardensPolicy
} from './gardens/permissions.js';
import { constructObservationsPolicy } from './observations/permissions.js';
import { app } from './schema.js';
import { constructWorkspacesPolicy } from './workspaces/permissions.js';

export const permissions = s.definePermissions(app, (ctx) => {
	constructGardensPolicy(ctx);
	constructGardenMembershipsPolicy(ctx);
	constructObservationsPolicy(ctx);
	constructWorkspacesPolicy(ctx);
	constructEnvironmentsPolicy(ctx);
});
