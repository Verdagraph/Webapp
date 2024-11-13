import { useQuery } from '@triplit/svelte';
import triplit from '$dataNew/triplit';

/**
 * Retrieves the requested user profiles.
 */
export const userProfilesQuery = triplit
	.query('profiles')
	.where('id', '=', '$query.profileId');

/**
 * Constructs a list of queries which return whether a username exists.
 */
export const usernamesExistQueries = (data: Array<string>) => {};
