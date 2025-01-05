import triplit from '$data/triplit';
import type { QueryResult } from '@triplit/client';
import { schema } from '@vdt-webapp/common';

export const activeGardenQuery = triplit.query('gardens').id('$query.activeGardenId');

export const adminGardensQuery = triplit
	.query('gardens')
	.where('adminIds', 'has', '$session.profileId');

export const editorGardensQuery = triplit
	.query('gardens')
	.where('editorIds', 'has', '$session.profileId');

export const viewerGardensQuery = triplit
	.query('gardens')
	.where('viewerIds', 'has', '$session.profileId');

export const favoriteMembershipsQuery = triplit
	.query('gardenMemberships')
	.where([
		['favorite', '=', true],
		['userId', '=', '$session.profileId']
	])
	.include('garden');

export const acceptancePendingMembershipsQuery = triplit
	.query('gardenMemberships')
	.where([
		['status', '!=', 'ACCEPTEd'],
		['userId', '=', '$session.profileId']
	])
	.include('garden');

const acceptancePendingMembershipsQueryBuilt =
	acceptancePendingMembershipsQuery.build();
export type AcceptancePendingMembershipsQueryResult = QueryResult<
	typeof schema,
	typeof acceptancePendingMembershipsQueryBuilt
>;
