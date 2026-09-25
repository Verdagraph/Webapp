import type { Garden, GardenRole } from './schema.js';

/**
 * Returns the set of all user IDs which are members of a garden.
 * @param garden The garden to extract IDs from.
 * @returns All user IDs of garden members.
 */
export const getMemberIds = (garden: Garden): Set<string> => {
	return new Set([...garden.adminIds, ...garden.editorIds, ...garden.viewerIds]);
};

/**
 * Checks whether a user is an existing member of a garden.
 * @param garden The garden to check membership of.
 * @param userId The ID of the user to check.
 * @returns True if the user is a member of the garden.
 */
export const isProfileMember = (garden: Garden, userId: string): boolean => {
	return (
		garden.adminIds.includes(userId) ||
		garden.editorIds.includes(userId) ||
		garden.viewerIds.includes(userId)
	);
};

/**
 * Checks whether a user has a role in the garden.
 * Roles are upwards inclusive, meaning an admin user is authorized for editor activities.
 * @param garden The garden to check membership of.
 * @param userId The ID of the user to check.
 * @param role The role to check membership against.
 * @returns True if the user is authorized.
 */
export const isUserAuthorized = (
	garden: Garden,
	userId: string,
	role: GardenRole
): boolean => {
	switch (role) {
		case 'ADMIN':
			return garden.adminIds.includes(userId);
		case 'EDITOR':
			return garden.adminIds.includes(userId) || garden.editorIds.includes(userId);
		case 'VIEWER':
			return (
				garden.adminIds.includes(userId) ||
				garden.editorIds.includes(userId) ||
				garden.viewerIds.includes(userId)
			);
		default:
			return false;
	}
};
