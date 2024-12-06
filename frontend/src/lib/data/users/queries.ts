import { useQuery } from '@triplit/svelte';
import triplit from '$data/triplit';

/**
 * Retrieves the requested user profiles.
 */
export const userProfilesQuery = triplit
	.query('profiles')
	.where('id', 'in', '$query.profileIds');

/**
 * Constructs a list of queries which return whether a username exists.
 */
export const usernamesExistQueries = (data: Array<string>) => {};
