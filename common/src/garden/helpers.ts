import type { Garden } from './schema';

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
 * Checks whether a profile is an admin of a garden.
 * @param garden The garden to check membership of.
 * @param profileId The ID of the profile to check.
 * @returns True if the profile is a admin of the garden.
 */
export const isProfileAdmin = (garden: Garden, profileId: string): boolean => {
	if (
		garden.adminIds.has(profileId) ||
	) {
		return true;
	} else {
		return false;
	}
};