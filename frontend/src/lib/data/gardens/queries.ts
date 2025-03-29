import triplit from '$data/triplit';
import type { QueryResult } from '@triplit/client';
import { schema } from '@vdg-webapp/common';

export const gardenQuery = triplit.query('gardens').Id('$query.id');

export const adminGardensQuery = triplit
	.query('gardens')
	.Where('adminIds', 'has', '$session.profileId');

export const editorGardensQuery = triplit
	.query('gardens')
	.Where('editorIds', 'has', '$session.profileId');

export const viewerGardensQuery = triplit
	.query('gardens')
	.Where(['viewerIds', 'has', '$session.profileId']);

export const membershipQuery = triplit
	.query('gardenMemberships')
	.Where('gardenId', '=', '$query.gardenId')
	.Where('userId', '=', '$query.userId');

export const favoriteMembershipsQuery = triplit
	.query('gardenMemberships')
	.Where('favorite', '=', true)
	.Where(['userId', '=', '$session.profileId'])
	.Include('garden');

export type FavoriteMembershipsQueryResult = QueryResult<
	typeof schema,
	typeof favoriteMembershipsQuery
>;

export const acceptancePendingMembershipsQuery = triplit
	.query('gardenMemberships')
	.Where('status', '!=', 'ACCEPTED')
	.Where(['userId', '=', '$session.profileId'])
	.Include('garden');

export type AcceptancePendingMembershipsQueryResult = QueryResult<
	typeof schema,
	typeof acceptancePendingMembershipsQuery
>;
