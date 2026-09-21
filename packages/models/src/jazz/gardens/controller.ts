import { AppError } from '../../errors.js';
import {
	type GardenCreateCommand,
	type GardenMembershipAcceptCommand,
	type GardenMembershipCreateCommand,
	type GardenMembershipDeleteCommand,
	type GardenMembershipRevokeCommand,
	type GardenMembershipRoleChangeCommand
} from '../../gardens/commands.js';
import { type ControllerContext } from '../controller.js';
import { type JazzGarden } from './schema.js';
import { isProfileMember } from './utils.js';

/** Helpers. */

/**
 * Given a list of usernames, constructs an array of matching user IDs
 * that are not already members in the given garden.
 *
 * Queries the `users` stub table (see `../users.ts`), not real user data.
 */
async function getNewMembershipIdsFromUsernames(
	usernames: string[] | undefined,
	ctx: ControllerContext,
	garden?: JazzGarden
): Promise<string[]> {
	if (!usernames || usernames.length === 0) {
		return [];
	}

	const users = await ctx.db.all(ctx.jazz.users.where({ username: { in: usernames } }));
	return users
		.filter((user) => garden === undefined || !isProfileMember(garden, user.id))
		.map((user) => user.id);
}

/**
 * Resolves a garden's user-facing slug to the garden row (the row id is a
 * separate, auto-generated UUID).
 */
async function getGardenBySlugOrError(
	gardenSlug: string,
	ctx: ControllerContext
): Promise<JazzGarden> {
	const garden = await ctx.db.one(ctx.jazz.gardens.where({ slug: gardenSlug }));
	if (garden == null) {
		throw new AppError('Garden key does not exist.', {
			nonFormErrors: ['Garden key does not exist.']
		});
	}
	return garden;
}

/** Commands. */

/**
 * Creates a new garden.
 */
export async function gardenCreate(
	data: GardenCreateCommand,
	ctx: ControllerContext
): Promise<JazzGarden> {
	/** Retrieve client. */
	const client = await ctx.getClientOrError();

	/** Validate unique slug constraint. `data.id` is the user-chosen slug. */
	const existingGarden = await ctx.db.one(ctx.jazz.gardens.where({ slug: data.id }));
	if (existingGarden) {
		throw new AppError('Garden ID already exists.', {
			fieldErrors: { id: ['Key already exists.'] }
		});
	}

	/** Retrieve all invitee IDs. */
	const adminInviteIds = await getNewMembershipIdsFromUsernames(data.adminInvites, ctx);
	const editorIds = await getNewMembershipIdsFromUsernames(data.editorInvites, ctx);
	const viewerIds = await getNewMembershipIdsFromUsernames(data.viewerInvites, ctx);

	/** Add creator's ID and deduplicate. */
	const adminIds = [...new Set([client.profile.id, ...adminInviteIds])];

	/**
	 * Insert the garden first and wait for the server to durably accept it
	 * before inserting any memberships. A membership's insert policy checks
	 * `exists` against the garden row: if the garden insert and the first
	 * membership insert are staged in the same transaction, the server
	 * rejects the membership insert because the garden is not yet visible
	 * to the policy engine within that transaction.
	 */
	const gardenWrite = ctx.db.insert(ctx.jazz.gardens, {
		slug: data.id,
		name: data.name,
		visibility: data.visibility,
		description: data.description,
		creatorId: client.profile.id,
		adminIds,
		editorIds,
		viewerIds
	});
	const garden = await gardenWrite.wait({ tier: 'edge' });

	/**
	 * Add all memberships in one transaction. Safe together since they only
	 * depend on the now-durable garden, not on each other.
	 */
	await ctx.db.transaction(async (tx) => {
		/** Add creator membership. */
		tx.insert(ctx.jazz.gardenMemberships, {
			gardenId: garden.id,
			userId: client.profile.id,
			role: 'ADMIN',
			status: 'ACCEPTED'
		});

		/** Add admin memberships. */
		for (const userId of adminInviteIds) {
			if (userId === client.profile.id) continue;
			tx.insert(ctx.jazz.gardenMemberships, {
				gardenId: garden.id,
				userId,
				role: 'ADMIN',
				inviterId: client.profile.id,
				status: 'CREATED'
			});
		}

		/** Add editor memberships. */
		for (const userId of editorIds) {
			tx.insert(ctx.jazz.gardenMemberships, {
				gardenId: garden.id,
				userId,
				role: 'EDITOR',
				inviterId: client.profile.id,
				status: 'CREATED'
			});
		}

		/** Add viewer memberships. */
		for (const userId of viewerIds) {
			tx.insert(ctx.jazz.gardenMemberships, {
				gardenId: garden.id,
				userId,
				role: 'VIEWER',
				inviterId: client.profile.id,
				status: 'CREATED'
			});
		}
	});

	return garden;
}

/**
 * Invites users to an existing garden.
 */
export async function gardenMembershipCreate(
	data: GardenMembershipCreateCommand,
	ctx: ControllerContext
) {
	const { client, garden } = await ctx.requireRole(data.gardenId, 'MembershipCreate');

	const adminIds = await getNewMembershipIdsFromUsernames(
		data.adminInvites,
		ctx,
		garden
	);
	const editorIds = await getNewMembershipIdsFromUsernames(
		data.editorInvites,
		ctx,
		garden
	);
	const viewerIds = await getNewMembershipIdsFromUsernames(
		data.viewerInvites,
		ctx,
		garden
	);

	await ctx.db.transaction(async (tx) => {
		/** Update the garden's ID arrays, deduplicating. */
		tx.update(ctx.jazz.gardens, garden.id, {
			adminIds: [...new Set([...garden.adminIds, ...adminIds])],
			editorIds: [...new Set([...garden.editorIds, ...editorIds])],
			viewerIds: [...new Set([...garden.viewerIds, ...viewerIds])]
		});

		for (const userId of adminIds) {
			tx.insert(ctx.jazz.gardenMemberships, {
				gardenId: garden.id,
				userId,
				role: 'ADMIN',
				inviterId: client.profile.id,
				status: 'CREATED'
			});
		}
		for (const userId of editorIds) {
			tx.insert(ctx.jazz.gardenMemberships, {
				gardenId: garden.id,
				userId,
				role: 'EDITOR',
				inviterId: client.profile.id,
				status: 'CREATED'
			});
		}
		for (const userId of viewerIds) {
			tx.insert(ctx.jazz.gardenMemberships, {
				gardenId: garden.id,
				userId,
				role: 'VIEWER',
				inviterId: client.profile.id,
				status: 'CREATED'
			});
		}
	});
}

/**
 * Sends a garden membership acceptance request.
 */
export async function gardenMembershipAccept(
	data: GardenMembershipAcceptCommand,
	ctx: ControllerContext
) {
	const client = await ctx.getClientOrError();
	const garden = await getGardenBySlugOrError(data.gardenId, ctx);

	const membership = await ctx.db.one(
		ctx.jazz.gardenMemberships.where({
			gardenId: garden.id,
			userId: client.profile.id
		})
	);
	if (!membership) {
		throw new AppError('Membership does not exist in the collection.', {
			nonFormErrors: ['The invite to this garden does not exist.']
		});
	}

	if (membership.status === 'ACCEPTED') {
		throw new AppError('Membership was already accepted.', {
			nonFormErrors: ['The invite to this garden is already accepted.']
		});
	}

	ctx.db.update(ctx.jazz.gardenMemberships, membership.id, {
		status: 'ACCEPTED',
		acceptedAt: new Date()
	});
}

/**
 * Deletes a user's own membership in a garden.
 */
export async function gardenMembershipDelete(
	data: GardenMembershipDeleteCommand,
	ctx: ControllerContext
) {
	const client = await ctx.getClientOrError();
	const garden = await getGardenBySlugOrError(data.gardenId, ctx);

	const membership = await ctx.db.one(
		ctx.jazz.gardenMemberships.where({
			gardenId: garden.id,
			userId: client.profile.id
		})
	);
	if (!membership) {
		throw new AppError('Membership does not exist in the collection.', {
			nonFormErrors: ['The membership in this garden does not exist.']
		});
	}

	ctx.db.delete(ctx.jazz.gardenMemberships, membership.id);
}

/**
 * Revokes a membership of a different user.
 */
export async function gardenMembershipRevoke(
	data: GardenMembershipRevokeCommand,
	ctx: ControllerContext
) {
	const { client, garden } = await ctx.requireRole(data.gardenId, 'MembershipRevoke');

	if (client.profile.id === data.profileId) {
		throw new AppError(
			"Attempted to revoke one's own membership with the wrong command.",
			{
				nonFormErrors: ['Cannot revoke own membership - leave instead.']
			}
		);
	}

	const membership = await ctx.db.one(
		ctx.jazz.gardenMemberships.where({
			gardenId: garden.id,
			userId: data.profileId
		})
	);
	if (!membership) {
		throw new AppError('Membership does not exist in the collection.', {
			nonFormErrors: ['The membership in this garden does not exist.']
		});
	}

	ctx.db.delete(ctx.jazz.gardenMemberships, membership.id);
}

/**
 * Changes the role of an existing garden membership.
 */
export async function gardenMembershipRoleChange(
	data: GardenMembershipRoleChangeCommand,
	ctx: ControllerContext
) {
	const { client, garden } = await ctx.requireRole(
		data.gardenId,
		'MembershipRoleChange'
	);

	if (client.profile.id === data.profileId) {
		throw new AppError("Attempted to change the role of one's own membership.", {
			nonFormErrors: ['You cannot change the role of your own membership.']
		});
	}
	if (data.profileId === garden.creatorId) {
		throw new AppError("Creator's role cannot be changed.", {
			nonFormErrors: ["You cannot change the role of the garden's creator."]
		});
	}

	const membership = await ctx.db.one(
		ctx.jazz.gardenMemberships.where({
			gardenId: garden.id,
			userId: data.profileId
		})
	);
	if (!membership) {
		throw new AppError('Membership does not exist in the collection.', {
			nonFormErrors: ['The membership in this garden does not exist.']
		});
	}

	if (data.newRole === membership.role) {
		throw new AppError('Role to be changed is not different.', {
			fieldErrors: { newRole: ['The user already has this role.'] }
		});
	}

	/** Remove from old role array and add to new role array. */
	const newAdminIds = garden.adminIds.filter((id) => id !== data.profileId);
	const newEditorIds = garden.editorIds.filter((id) => id !== data.profileId);
	const newViewerIds = garden.viewerIds.filter((id) => id !== data.profileId);

	switch (data.newRole) {
		case 'ADMIN':
			newAdminIds.push(data.profileId);
			break;
		case 'EDITOR':
			newEditorIds.push(data.profileId);
			break;
		case 'VIEWER':
			newViewerIds.push(data.profileId);
			break;
		default:
			throw new AppError('New role not a valid role.', {
				nonFormErrors: ['Something went wrong.']
			});
	}

	await ctx.db.transaction(async (tx) => {
		tx.update(ctx.jazz.gardens, garden.id, {
			adminIds: newAdminIds,
			editorIds: newEditorIds,
			viewerIds: newViewerIds
		});
		tx.update(ctx.jazz.gardenMemberships, membership.id, { role: data.newRole });
	});
}
