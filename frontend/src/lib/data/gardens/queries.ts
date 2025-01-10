import triplit from '$data/triplit';
import auth from '$state/auth.svelte';
import type { QueryResult } from '@triplit/client';
import { schema } from '@vdt-webapp/common';

export const activeGardenQuery = triplit.query('gardens').id('$query.activeGardenId');

export const adminGardensQuery = triplit
	.query('gardens')
	.where(auth.isAuthenticated ? ['adminIds', 'has', '$session.profileId'] : false);

export const editorGardensQuery = triplit
	.query('gardens')
	.where(auth.isAuthenticated ? ['editorIds', 'has', '$session.profileId'] : false);

export const viewerGardensQuery = triplit
	.query('gardens')
	.where(auth.isAuthenticated ? ['viewerIds', 'has', '$session.profileId'] : false);

export const favoriteMembershipsQuery = triplit
	.query('gardenMemberships')
	.where('favorite', '=', true)
	.where(auth.isAuthenticated ? ['userId', '=', '$session.profileId'] : false)
	.include('garden');

export const acceptancePendingMembershipsQuery = triplit
	.query('gardenMemberships')
	.where('status', '!=', 'ACCEPTED')
	.where(auth.isAuthenticated ? ['userId', '=', '$session.profileId'] : false)
	.include('garden');

const acceptancePendingMembershipsQueryBuilt =
	acceptancePendingMembershipsQuery.build();
export type AcceptancePendingMembershipsQueryResult = QueryResult<
	typeof schema,
	typeof acceptancePendingMembershipsQueryBuilt
>;
