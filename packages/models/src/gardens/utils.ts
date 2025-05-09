import type { Garden, GardenRole } from './schema.js';

/**
 * Returns a set of all profile IDs which are members of a garden.
 * @param garden The garden to extract IDs from.
 * @returns All profile IDs of garden members.
 */
export const getMemberIds = (garden: Garden): Set<string> => {
	return new Set([...garden.adminIds, ...garden.editorIds, ...garden.viewerIds]);
};

/**
 * Checks whether a profile is an existing member of a garden.
 * @param garden The garden to check membership of.
 * @param profileId The ID of the profile to check.
 * @returns True if the profile is a member of the garden.
 */
export const isProfileMember = (garden: Garden, profileId: string): boolean => {
	if (
		garden.adminIds.has(profileId) ||
		garden.editorIds.has(profileId) ||
		garden.viewerIds.has(profileId)
	) {
		return true;
	} else {
		return false;
	}
};

/**
 * Checks whether a user has a role in the garden.
 * Roles are upwards inclusive, meaning an admin user is authorized for editor activities.
 * @param garden The garden to check membership of.
 * @param profileId The ID of the profile to check.
 * @param role The role to check membership against.
 * @returns True if the user is authorized.
 */
export const isUserAuthorized = (
	garden: Garden,
	profileId: string,
	role: GardenRole
) => {
	switch (role) {
		case 'ADMIN':
			if (garden.adminIds.has(profileId)) {
				return true;
			} else {
				return false;
			}
		case 'EDITOR':
			if (garden.adminIds.has(profileId) || garden.editorIds.has(profileId)) {
				return true;
			} else {
				return false;
			}
		case 'VIEWER':
			if (
				garden.adminIds.has(profileId) ||
				garden.editorIds.has(profileId) ||
				garden.viewerIds.has(profileId)
			) {
				return true;
			} else {
				return false;
			}
		default:
			return false;
	}
};
