import triplit from '$dataNew/triplit';
import type { QueryResult } from '@triplit/client';
import { schema } from '@vdt-webapp/common';

export const adminGardensQuery = triplit
	.query('gardens')
	.where('adminIds', 'has', '$global.clientProfileId');

export const editorGardensQuery = triplit
	.query('gardens')
	.where('editorIds', 'has', '$global.clientProfileId');

export const viewerGardensQuery = triplit
	.query('gardens')
	.where('viewerIds', 'has', '$global.clientProfileId');

export const favoriteMembershipsQuery = triplit
	.query('gardenMemberships')
	.where([
		['favorite', '=', true],
		['userId', '=', '$global.clientProfileId']
	])
	.include('garden');

export const acceptancePendingMembershipsQuery = triplit
	.query('gardenMemberships')
	.where([
		['status', '!=', 'ACCEPTEd'],
		['userId', '=', '$global.clientProfileId']
	])
	.include('garden');

const acceptancePendingMembershipsQueryBuilt =
	acceptancePendingMembershipsQuery.build();
export type AcceptancePendingMembershipsQueryResult = QueryResult<
	typeof schema,
	typeof acceptancePendingMembershipsQueryBuilt
>;
