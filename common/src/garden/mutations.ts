import z from 'zod';
import { userFields } from '../user/mutations';
import { GardenVisibilityEnum, GardenMembershipRoleEnum } from './schema';

/** Field specifications. */
const gardenFields = {
	id: z
		.string()
		.min(4, 'Must be at least 4 characters.')
		.max(21, 'May be at most 21 characters.')
		.regex(/[0-9A-Za-z-]+/, 'Must contain only alphanumeric characters and hyphens.')
		.describe(
			'Shorthand name for the garden used in URLs. Must be between 4 and 21 characters long and contain only alphanumeric characters and hyphens.'
		),
	name: z
		.string()
		.min(2, 'Must be at least 2 characters.')
		.max(50, 'May be at most 50 characters.')
		.regex(/[0-9A-Za-z ]+/, 'Must contain only alphanumeric characters and spaces.')
		.describe(
			'Name of the garden. Must be between 2 and 50 characters long and contain only alphanumeric characters and spaces.'
		),
	description: z
		.string()
		.max(1400, 'May be at most 1400 characters.')
		.describe('May be at most 1400 characters.'),
	visibility: z.enum(GardenVisibilityEnum).default('HIDDEN'),
	usernameInvitesList: z
		.array(userFields.username)
		.max(10, 'A maximum of 10 users can be invited at once.')
};

/**
 * Command to create a new garden.
 */
export const GardenCreateCommand = z.object({
	id: gardenFields.id,
	name: gardenFields.name,
	description: gardenFields.description.optional(),
	visibility: gardenFields.visibility,
	adminInvites: gardenFields.usernameInvitesList
		.describe('A list of usernames to invite as admins.')
		.optional(),
	editorInvites: gardenFields.usernameInvitesList
		.describe('A list of usernames to invite as editors.')
		.optional(),
	viewerInvites: gardenFields.usernameInvitesList
		.describe('A list of usernames to invite as viewers.')
		.optional()
});

/**
 * Command to invite a user to a garden.
 */
export const GardenMembershipCreateCommand = z.object({
	gardenId: z.string(),
	adminInvites: gardenFields.usernameInvitesList
		.describe('A list of usernames to invite as admins.')
		.optional(),
	editorInvites: gardenFields.usernameInvitesList
		.describe('A list of usernames to invite as editors.')
		.optional(),
	viewerInvites: gardenFields.usernameInvitesList
		.describe('A list of usernames to invite as viewers.')
		.optional()
});

/**
 * Command to accept a garden membership invite.
 */
export const GardenMembershipAcceptCommand = z.object({
	gardenId: z.string()
});

/**
 * Command to leave a garden.
 */
export const GardenMembershipDeleteCommand = z.object({
	gardenId: z.string()
});

/**
 * Command to revoke a user's membership.
 */
export const GardenMembershipRevokeCommand = z.object({
	gardenId: z.string(),
	profileId: z.string()
});

/**
 * Command to change the role on a user's membership.
 */
export const GardenMembershipRoleChangeCommand = z.object({
	gardenId: z.string(),
	profileId: z.string(),
	newRole: z.enum(GardenMembershipRoleEnum)
});
