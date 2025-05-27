import { type BulkInsert } from '@triplit/client';

import { schema } from '@vdg-webapp/models';

export const gardenId = 'garden';
export const workspaceId = 'workspace';
export default function seed(): BulkInsert<typeof schema> {
	return {
		profiles: [
			{
				username: 'Cole Cooper'
			}
		]
	};
}
