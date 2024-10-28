import z from 'zod';
import { userFields } from '../user/mutations';
import { GardenVisibilityEnum } from './schema';

/** Field specifications. */
const gardenFields = {
	name: z
		.string()
		.min(2, 'Must be at least 2 characters.')
		.max(50, 'May be at most 50 characters.')
		.regex(/[0-9A-Za-z ]+/, 'Must contain only alphanumeric characters and spaces.')
		.describe(
			'Name of the garden. Must be between 2 and 50 characters long and contain only alphanumeric characters and spaces.'
		),
	key: z
		.string()
		.min(4, 'Must be at least 4 characters.')
		.max(16, 'May be at most 16 characters.')
		.regex(/[0-9A-Za-z-]+/, 'Must contain only alphanumeric characters and hyphens.')
		.describe(
			'Shorthand name for the garden used in URLs. Must be between 4 and 16 characters long and contain only alphanumeric characters and hyphens.'
		),
	description: z
		.string()
		.max(1400, 'May be at most 1400 characters.')
		.describe('May be at most 1400 characters.'),
	visibility: z.enum(GardenVisibilityEnum),
	usernameInvitesList: z
		.array(userFields.username)
		.max(10, 'A maximum of 10 users can be invited at once.')
};

/**
 * Command to create a new garden.
 */
export const GardenCreateCommand = z.object({
	name: gardenFields.name,
	key: gardenFields.key,
	description: gardenFields.description,
	visibility: gardenFields.visibility,
	adminInvites: gardenFields.usernameInvitesList.describe(
		'A list of usernames to invite as admins.'
	),
	editorInvites: gardenFields.usernameInvitesList.describe(
		'A list of usernames to invite as editors.'
	),
	viewerInvites: gardenFields.usernameInvitesList.describe(
		'A list of usernames to invite as viewers.'
	)
});

/**
 * Command to invite a user to a garden.
 */
export const GardenMembershipCreateCommand = z.object({
	adminInvites: gardenFields.usernameInvitesList.describe(
		'A list of usernames to invite as admins.'
	),
	editorInvites: gardenFields.usernameInvitesList.describe(
		'A list of usernames to invite as editors.'
	),
	viewerInvites: gardenFields.usernameInvitesList.describe(
		'A list of usernames to invite as viewers.'
	)
});
