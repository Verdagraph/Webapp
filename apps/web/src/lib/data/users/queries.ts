import triplit from '$data/triplit';

/**
 * Retrieves the requested user profiles.
 */
export const userProfilesQuery = triplit
	.query('profiles')
	.Where('id', 'in', '$query.profileIds');

/**
 * Retrieves the requested user profiles by username.
 */
export const userProfilesUsernameQuery = triplit
	.query('profiles')
	.Where('username', 'in', '$query.usernames');
