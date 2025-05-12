import { BulkInsert } from '@triplit/client';

import { schema } from '../schema.js';

export default function seed(): BulkInsert<typeof schema> {
	return {
		profiles: [
			{ id: 'user1', username: 'user1' },
			{ id: 'user2', username: 'user2' },
			{ id: 'user3', username: 'user3' },
			{ id: 'user4', username: 'user4' }
		],
		accounts: [
			{
				id: '6rc3xPda9UYit0MI36UyE',
				profileId: 'user1',
				/** Password is 'password'. */
				passwordHash: '$argon2i$v=19$m=16,t=2,p=1$MTIzNDU2Nzg5$e7G/IEd63Q/ZrZIiW6FUow',
				verifiedEmail: 'test@Verdagraph.com',
				unverifiedEmail: {
					address: null,
					token: null
				},
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
				adminIds: new Set(['user1'])
			},
			{
				id: 'edit-garden',
				name: 'Editor Garden.',
				visibility: 'PUBLIC',
				creatorId: null,
				adminIds: new Set(),
				editorIds: new Set(['user1'])
			},
			{
				id: 'view-garden',
				name: 'Viewer Garden.',
				visibility: 'PUBLIC',
				creatorId: null,
				adminIds: new Set(),
				viewerIds: new Set(['user1'])
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
		],
		workspaces: [
			{
				id: 'workspace1',
				gardenId: 'garden1',
				name: 'Workspace 1',
				slug: 'workspace-1',
				description: 'This is the default seeded workspace.'
			},
			{
				id: 'workspace2',
				gardenId: 'garden1',
				name: 'Workspace 2',
				slug: 'workspace-2'
			}
		],
		plantingAreas: [
			{
				gardenId: 'garden1',
				name: 'Rectangle Area',
				geometryId: 'rectangleAreaGeometry',
				locationHistoryId: 'rectangleGeometryLocations',
				description: 'Rectangle Description.'
			},
			{
				gardenId: 'garden1',
				name: 'Ellipse Area',
				geometryId: 'ellipseAreaGeometry',
				locationHistoryId: 'ellipseGeometryLocations',
				description: 'Ellipse Description.'
			},
			{
				gardenId: 'garden1',
				name: 'Polygon Area',
				geometryId: 'polygonAreaGeometry',
				locationHistoryId: 'polygonGeometryLocations',
				description: 'Polygon Description.'
			},
			{
				gardenId: 'garden1',
				name: 'Lines Area',
				geometryId: 'linesAreaGeometry',
				locationHistoryId: 'linesGeometryLocations',
				description: 'Lines Description.'
			}
		],
		geometries: [
			{
				id: 'rectangleAreaGeometry',
				gardenId: 'garden1',
				type: 'RECTANGLE',
				date: new Date(),
				rectangleLength: 2,
				rectangleWidth: 3
			},
			{
				id: 'ellipseAreaGeometry',
				gardenId: 'garden1',
				type: 'ELLIPSE',
				date: new Date(),
				ellipseWidth: 1.5,
				ellipseLength: 2
			},
			{
				id: 'polygonAreaGeometry',
				gardenId: 'garden1',
				type: 'POLYGON',
				date: new Date(),
				polygonNumSides: 5,
				polygonRadius: 0.4
			},
			{
				id: 'linesAreaGeometry',
				gardenId: 'garden1',
				type: 'LINES',
				date: new Date(),
				linesCoordinateIds: new Set([
					'linesAreaCoord1',
					'linesAreaCoord2',
					'linesAreaCoord3',
					'linesAreaCoord4'
				]),
				linesClosed: true
			}
		],
		locationHistories: [
			{
				id: 'rectangleGeometryLocations',
				gardenId: 'garden1',
				locationIds: new Set([
					'rectangleAreaGeometryLocation1',
					'rectangleAreaGeometryLocation2'
				]),
				workspaceIds: new Set(['workspace1'])
			},
			{
				id: 'ellipseGeometryLocations',
				gardenId: 'garden1',
				locationIds: new Set([
					'ellipseAreaGeometryLocation1',
					'ellipseAreaGeometryLocation2'
				]),
				workspaceIds: new Set(['workspace1'])
			},
			{
				id: 'polygonGeometryLocations',
				gardenId: 'garden1',
				locationIds: new Set(['polygonAreaGeometryLocation1']),
				workspaceIds: new Set(['workspace1'])
			},
			{
				id: 'linesGeometryLocations',
				gardenId: 'garden1',
				locationIds: new Set(['linesAreaGeometryLocation1']),
				workspaceIds: new Set(['workspace1'])
			}
		],
		locations: [
			{
				id: 'rectangleAreaGeometryLocation1',
				gardenId: 'garden1',
				workspaceId: 'workspace1',
				x: 5,
				y: 2,
				date: new Date(2024, 0, 8, 14, 30, 0)
			},
			{
				id: 'rectangleAreaGeometryLocation2',
				gardenId: 'garden1',
				workspaceId: 'workspace1',
				x: 6,
				y: 8,
				date: new Date(2024, 0, 11, 14, 30, 0)
			},
			{
				id: 'ellipseAreaGeometryLocation1',
				gardenId: 'garden1',
				workspaceId: 'workspace1',
				x: -3,
				y: 5,
				date: new Date(2024, 0, 12, 14, 30, 0)
			},
			{
				id: 'ellipseAreaGeometryLocation2',
				gardenId: 'garden1',
				workspaceId: 'workspace1',
				x: 0,
				y: 10,
				date: new Date(2024, 0, 14, 14, 30, 0)
			},
			{
				id: 'polygonAreaGeometryLocation1',
				gardenId: 'garden1',
				workspaceId: 'workspace1',
				x: -5,
				y: -5,
				date: new Date(2024, 0, 3, 14, 30, 0)
			},
			{
				id: 'linesAreaGeometryLocation1',
				gardenId: 'garden1',
				workspaceId: 'workspace1',
				x: -8,
				y: 2,
				date: new Date(2024, 0, 3, 14, 30, 0)
			}
		],
		coordinates: [
			{
				id: 'linesAreaCoord1',
				gardenId: 'garden1',
				x: -1,
				y: 0
			},
			{
				id: 'linesAreaCoord2',
				gardenId: 'garden1',
				x: -4,
				y: 1
			},
			{
				id: 'linesAreaCoord3',
				gardenId: 'garden1',
				x: 2,
				y: 1.5
			},
			{
				id: 'linesAreaCoord4',
				gardenId: 'garden1',
				x: 0.5,
				y: -1
			}
		]
	};
}
