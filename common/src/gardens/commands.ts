import z from 'zod';
import { userFields } from '../users/commands';
import { GardenVisibilityEnum, GardenMembershipRoleEnum } from './schema';
import { commonFields } from '../commands';

/** Field specifications. */
const gardenIdSchema = z
	.string()
	.trim()
	.toLowerCase()
	.min(4, 'Must be at least 4 characters.')
	.max(21, 'May be at most 21 characters.')
	.regex(/[0-9A-Za-z-]+/, 'Must contain only alphanumeric characters and hyphens.')
	.describe('Unique shorthand name for the garden used in URLs.');
const gardenNameSchema = commonFields.nameSchema.describe('Name of the garden.');
const gardenDescriptionSchema = commonFields.descriptionSchema.describe(
	'Optional description.'
);
const gardenVisibilitySchema = z.enum(GardenVisibilityEnum);
const gardenMembershipRoleSchema = z.enum(GardenMembershipRoleEnum);
const usernameInvitesListSchema = z
	.array(userFields.usernameSchema)
	.max(10, 'A maximum of 10 users can be invited at once.');
export const gardenFields = {
	gardenIdSchema,
	gardenNameSchema,
	gardenDescriptionSchema,
	gardenVisibilitySchema,
	gardenMembershipRoleSchema,
	usernameInvitesListSchema
};

/**
 * Command to create a new garden.
 */
export const GardenCreateCommandSchema = z.object({
	id: gardenIdSchema,
	name: gardenNameSchema,
	description: gardenDescriptionSchema.default(''),
	visibility: gardenVisibilitySchema.default('HIDDEN'),
	adminInvites: usernameInvitesListSchema
		.describe(
			'A list of usernames to invite as admins. A maximum of 10 users can be invited at once.'
		)
		.default([]),
	editorInvites: usernameInvitesListSchema
		.describe(
			'A list of usernames to invite as editors. A maximum of 10 users can be invited at once.'
		)
		.default([]),
	viewerInvites: usernameInvitesListSchema
		.describe(
			'A list of usernames to invite as viewers. A maximum of 10 users can be invited at once.'
		)
		.default([])
});
export type GardenCreateCommand = z.infer<typeof GardenCreateCommandSchema>;

/**
 * Command to invite a user to a garden.
 */
export const GardenMembershipCreateCommandSchema = z.object({
	gardenId: z.string(),
	adminInvites: usernameInvitesListSchema
		.describe('A list of usernames to invite as admins.')
		.default([]),
	editorInvites: usernameInvitesListSchema
		.describe('A list of usernames to invite as editors.')
		.default([]),
	viewerInvites: usernameInvitesListSchema
		.describe('A list of usernames to invite as viewers.')
		.default([])
});
export type GardenMembershipCreateCommand = z.infer<
	typeof GardenMembershipCreateCommandSchema
>;

/**
 * Command to accept a garden membership invite.
 */
export const GardenMembershipAcceptCommandSchema = z.object({
	gardenId: z.string()
});
export type GardenMembershipAcceptCommand = z.infer<
	typeof GardenMembershipAcceptCommandSchema
>;

/**
 * Command to leave a garden.
 */
export const GardenMembershipDeleteCommandSchema = z.object({
	gardenId: z.string()
});
export type GardenMembershipDeleteCommand = z.infer<
	typeof GardenMembershipDeleteCommandSchema
>;

/**
 * Command to revoke a user's membership.
 */
export const GardenMembershipRevokeCommandSchema = z.object({
	gardenId: z.string(),
	profileId: z.string()
});
export type GardenMembershipRevokeCommand = z.infer<
	typeof GardenMembershipRevokeCommandSchema
>;

/**
 * Command to change the role on a user's membership.
 */
export const GardenMembershipRoleChangeCommandSchema = z.object({
	gardenId: z.string(),
	profileId: z.string(),
	newRole: gardenMembershipRoleSchema
});
export type GardenMembershipRoleChangeCommand = z.infer<
	typeof GardenMembershipRoleChangeCommandSchema
>;
