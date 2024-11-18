import { BulkInsert } from '@triplit/client';
import { schema } from './triplit/schema';

export default function seed(): BulkInsert<typeof schema> {
	return {
		profiles: [
			{ id: 'user1', username: 'nathanielarking' },
			{ id: 'user2', username: 'user2' },
			{ id: 'user3', username: 'user3' },
			{ id: 'user4', username: 'user4' }
		],
		accounts: [
			{
				profileId: 'user1',
				/** Password is 'password'. */
				passwordHash: '$argon2i$v=19$m=16,t=2,p=1$MTIzNDU2Nzg5$e7G/IEd63Q/ZrZIiW6FUow',
				verifiedEmail: 'nathanielarking@gmail.com',
				passwordResetToken: null
			}
		],
		gardens: [
			{
				id: 'garden1',
				name: "Nathaniel's Garden.",
				visibility: 'PUBLIC',
				description: 'This is the default seeded garden.',
				creatorId: 'user1',
				adminIds: new Set('user1')
			},
			{
				id: 'edit-garden',
				name: 'Editor Garden.',
				visibility: 'PUBLIC',
				creatorId: null,
				editorIds: new Set('user1')
			},
			{
				id: 'view-garden',
				name: 'Viewer Garden.',
				visibility: 'PUBLIC',
				creatorId: null,
				viewerIds: new Set('user1')
			}
		],
		gardenMemberships: [
			{
				gardenId: 'garden1',
				userId: 'user1',
				role: 'ADMIN',
				inviterId: null,
				status: 'ACCEPTED',
				acceptedAt: new Date()
			},
			{
				gardenId: 'edit-garden',
				userId: 'user1',
				role: 'EDITOR',
				inviterId: 'user2',
				status: 'ACCEPTED',
				acceptedAt: new Date()
			},
			{
				gardenId: 'view-garden',
				userId: 'user1',
				role: 'EDITOR',
				inviterId: null,
				status: 'ACCEPTED',
				acceptedAt: new Date()
			}
		]
	};
}
