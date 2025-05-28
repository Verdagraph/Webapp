import { type BulkInsert } from '@triplit/client';

import { schema } from '@vdg-webapp/models';

import { user } from '../seed';

export const gardenId = 'garden';
export const workspaceId = 'workspace';
export default function seed(): BulkInsert<typeof schema> {
	return {
		profiles: [user.profile],
		accounts: [user.account],
		gardens: [
			{
				id: gardenId,
				name: 'Garden',
				visibility: 'PUBLIC',
				adminIds: [user.profile.id]
			}
		],
		workspaces: [
			{
				id: workspaceId,
				gardenId: gardenId,
				name: 'Workspace',
				slug: 'workspace'
			}
		]
	};
}
