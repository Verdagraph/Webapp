import { type TableRow, schema as s } from 'jazz-tools';

import {
	GardenMembershipRoleEnumOptions,
	GardenMembershipStatusEnumOptions,
	GardenVisibilityEnumOptions
} from '../../gardens/schema.js';

export {
	GardenMembershipRoleEnumOptions,
	GardenMembershipStatusEnumOptions,
	GardenVisibilityEnumOptions
};

export const gardenSchema = {
	/** Garden schema. */
	gardens: s.table({
		/**
		 * URL-friendly, human-readable, unique identifier chosen by the user
		 * (e.g. "my-garden"). Jazz row ids must be UUIDs, so this field carries
		 * the identity the rest of the app addresses gardens by; uniqueness is
		 * enforced in the controller (Jazz has no native unique constraint),
		 * the same way the existing `id` uniqueness check already worked.
		 */
		slug: s.string(),
		/** Non-unique name of the garden. */
		name: s.string(),
		/** Controls which non-users may view the garden. */
		visibility: s.enum(...GardenVisibilityEnumOptions),
		/** Optional description. */
		description: s.string().optional(),
		/** Set to false for inactive gardens. */
		isActive: s.boolean().default(true),
		/**
		 * User who created the garden.
		 * Note that the creator has access through an admin membership.
		 * If undefined, the original creator has left the garden.
		 */
		creatorId: s.ref('users').optional(),
		/** Set of users which have admin access. */
		adminIds: s.array(s.ref('users')),
		/** Set of users which have editing access. */
		editorIds: s.array(s.ref('users')).default([]),
		/** Set of users which have viewing access. */
		viewerIds: s.array(s.ref('users')).default([])
	}),
	/** Garden membership schema. */
	gardenMemberships: s.table({
		/** Garden the membership is in. */
		gardenId: s.ref('gardens'),
		/** User who is the subject of the membership. */
		userId: s.ref('users'),
		/** Role of the membership. */
		role: s.enum(...GardenMembershipRoleEnumOptions),
		/** User who created the membership. */
		inviterId: s.ref('users').optional(),
		/** The acceptance status and acceptance date of the membership. */
		status: s.enum(...GardenMembershipStatusEnumOptions),
		acceptedAt: s.timestamp().optional(),
		/** Allows marking gardens as favorites in the menu. */
		favorite: s.boolean().default(false)
	})
};
export type JazzGarden = TableRow<typeof gardenSchema, 'gardens'>;
export type JazzGardenMembership = TableRow<typeof gardenSchema, 'gardenMemberships'>;
