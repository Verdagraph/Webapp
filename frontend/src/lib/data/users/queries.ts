import triplit from '$data/triplit';

/**
 * Retrieves the requested user profiles.
 */
export const userProfilesQuery = triplit
	.query('profiles')
	.where('id', 'in', '$query.profileIds');
