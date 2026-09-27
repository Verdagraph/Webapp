import type { Db } from 'jazz-tools/backend';

import { type ActionType, requiredRole } from './actionRoles.js';
import { AppError } from './errors.js';
import {
	type GardenCreateCommand,
	type GardenMembershipAcceptCommand,
	type GardenMembershipCreateCommand,
	type GardenMembershipDeleteCommand,
	type GardenMembershipRevokeCommand,
	type GardenMembershipRoleChangeCommand
} from './gardens/commands.js';
import {
	gardenCreate,
	gardenMembershipAccept,
	gardenMembershipCreate,
	gardenMembershipDelete,
	gardenMembershipRevoke,
	gardenMembershipRoleChange
} from './gardens/controller.js';
import { type Garden } from './gardens/schema.js';
import { isUserAuthorized } from './gardens/utils.js';
import { type ObservationUpdateCommand } from './observations/commands.js';
import { observationDelete, observationUpdate } from './observations/controller.js';
import {
	type DraftBucketCreateCommand,
	type LifespanUpdateCommand,
	type PlantUpdateCommand,
	type PlantsCreateCommand
} from './plants/commands.js';
import {
	draftBucketCommit,
	draftBucketCreate,
	draftBucketDiscard,
	lifespanUpdate,
	plantUpdate,
	plantsCreate
} from './plants/controller.js';
import { type DraftBucket } from './plants/schema.js';
import { type AppSchema } from './schema.js';
import { type User } from './users/schema.js';
import {
	type GeometryHistoryUpdateCommand,
	type GeometryUpdateCommand,
	type LocationHistoryUpdateCommand,
	type LocationUpdateCommand,
	type PlantingAreaCreateCommand,
	type PlantingAreaUpdateCommand,
	type WorkspaceCreateCommand,
	type WorkspaceUpdateCommand
} from './workspaces/commands.js';
import {
	geometryHistoryExtend,
	geometryHistoryUpdate,
	geometryUpdate,
	locationHistoryExtend,
	locationHistoryUpdate,
	locationUpdate,
	plantingAreaCreate,
	plantingAreaUpdate,
	workspaceCreate,
	workspaceUpdate
} from './workspaces/controller.js';
import { type Workspace } from './workspaces/schema.js';

/** Re-exported so consumers can import the database type from this package alone. */
export type { Db };

export const CONTROLLER_CONTEXT_ID = 'Controller';

export type ControllerContextParams = {
	db: Db;
	jazz: AppSchema;
	/** Returns the currently authenticated user, or null if unauthenticated. */
	getClient: (db: Db) => Promise<User | null>;
};

/**
 * Controller class: singleton interface to the Jazz data layer.
 * Passed to controller functions to provide configurable behaviour.
 * @param params.db The Jazz Db instance.
 * @param params.jazz The app schema proxy with table query builders.
 * @param params.getClient A function for returning an authenticated user.
 * @returns ControllerContext.
 */
export function createController(params: ControllerContextParams) {
	/**
	 * Fetches the client's user object.
	 * If the client fails to authenticate, an AppError is raised.
	 * @returns The authenticated user.
	 */
	async function getClientOrError(): Promise<User> {
		const client = await params.getClient(params.db);
		if (client) return client;
		throw new AppError('Authentication failed.', {
			nonFormErrors: ['Authentication failed. A login is required.']
		});
	}

	/**
	 * Given a garden and an action, retrieve the client
	 * and throw an error if the client does not have at least that role.
	 * @param gardenSlug The garden's user-facing slug (not its Jazz row id).
	 * @param action The action to authorize for.
	 * @returns The client and garden objects.
	 */
	async function requireRole(
		gardenSlug: string,
		action: ActionType
	): Promise<{
		client: User;
		garden: Garden;
	}> {
		const client = await getClientOrError();

		const garden = await params.db.one(params.jazz.gardens.where({ slug: gardenSlug }));
		if (garden == null) {
			throw new AppError('Garden key does not exist.', {
				nonFormErrors: ['Garden key does not exist.']
			});
		}

		const role = requiredRole(action);
		if (!isUserAuthorized(garden, client.profile.id, role)) {
			throw new AppError(`Requires ${role} access.`, {
				nonFormErrors: [`This action requires the ${role} role.`]
			});
		}

		return { client, garden };
	}

	/**
	 * Same as requireRole, but keyed by the garden's Jazz row id rather than
	 * its user-facing slug. Needed when the garden id is already known from a
	 * fetched row (e.g. a plant's gardenId ref) rather than from a route.
	 * @param gardenId The garden's Jazz row id.
	 * @param action The action to authorize for.
	 * @returns The client and garden objects.
	 */
	async function requireRoleForGardenId(
		gardenId: string,
		action: ActionType
	): Promise<{
		client: User;
		garden: Garden;
	}> {
		const client = await getClientOrError();

		const garden = await params.db.one(params.jazz.gardens.where({ id: gardenId }));
		if (garden == null) {
			throw new AppError('Garden key does not exist.', {
				nonFormErrors: ['Garden key does not exist.']
			});
		}

		const role = requiredRole(action);
		if (!isUserAuthorized(garden, client.profile.id, role)) {
			throw new AppError(`Requires ${role} access.`, {
				nonFormErrors: [`This action requires the ${role} role.`]
			});
		}

		return { client, garden };
	}

	return {
		db: params.db,
		jazz: params.jazz,
		getClient: params.getClient,
		getClientOrError,
		requireRole,
		requireRoleForGardenId
	};
}
export type ControllerContext = ReturnType<typeof createController>;

/**
 * The full write-side surface, bound to one ControllerContext, so callers
 * never import a command function or a specific backend's context
 * directly. This is the single place where the active backend (Jazz, for
 * every domain) is chosen; every caller goes through this interface, so a
 * future backend swap changes only this file's implementation, not its
 * ~24 call sites in packages/ui.
 */
export interface Commands extends ControllerContext {
	/** Gardens. */
	gardenCreate(data: GardenCreateCommand): Promise<Garden>;
	gardenMembershipCreate(data: GardenMembershipCreateCommand): Promise<void>;
	gardenMembershipAccept(data: GardenMembershipAcceptCommand): Promise<void>;
	gardenMembershipDelete(data: GardenMembershipDeleteCommand): Promise<void>;
	gardenMembershipRevoke(data: GardenMembershipRevokeCommand): Promise<void>;
	gardenMembershipRoleChange(data: GardenMembershipRoleChangeCommand): Promise<void>;

	/** Workspaces. */
	workspaceCreate(data: WorkspaceCreateCommand): Promise<Workspace>;
	workspaceUpdate(
		gardenSlug: string,
		id: string,
		data: WorkspaceUpdateCommand
	): Promise<void>;
	plantingAreaCreate(data: PlantingAreaCreateCommand): Promise<void>;
	plantingAreaUpdate(id: string, data: PlantingAreaUpdateCommand): Promise<void>;
	geometryUpdate(id: string, data: GeometryUpdateCommand): Promise<void>;
	geometryHistoryUpdate(data: GeometryHistoryUpdateCommand): Promise<void>;
	geometryHistoryExtend(id: string, date: Date): Promise<void>;
	locationUpdate(id: string, data: LocationUpdateCommand): Promise<void>;
	locationHistoryUpdate(data: LocationHistoryUpdateCommand): Promise<void>;
	locationHistoryExtend(id: string, data: { date: Date }): Promise<void>;

	/** Plants. */
	plantsCreate(data: PlantsCreateCommand): Promise<void>;
	draftBucketCreate(data: DraftBucketCreateCommand): Promise<DraftBucket>;
	draftBucketCommit(id: string): Promise<void>;
	draftBucketDiscard(id: string): Promise<void>;
	plantUpdate(id: string, data: PlantUpdateCommand): Promise<void>;
	lifespanUpdate(id: string, data: LifespanUpdateCommand): Promise<void>;

	/** Observations. */
	observationUpdate(data: ObservationUpdateCommand): Promise<void>;
	observationDelete(id: string): Promise<void>;
}

/**
 * Builds the write-side Commands interface, binding every command to one
 * ControllerContext.
 * @param params The same params createController takes.
 * @returns A Commands instance.
 */
export function createCommands(params: ControllerContextParams): Commands {
	const ctx = createController(params);

	return {
		...ctx,

		gardenCreate: (data) => gardenCreate(data, ctx),
		gardenMembershipCreate: (data) => gardenMembershipCreate(data, ctx),
		gardenMembershipAccept: (data) => gardenMembershipAccept(data, ctx),
		gardenMembershipDelete: (data) => gardenMembershipDelete(data, ctx),
		gardenMembershipRevoke: (data) => gardenMembershipRevoke(data, ctx),
		gardenMembershipRoleChange: (data) => gardenMembershipRoleChange(data, ctx),

		workspaceCreate: (data) => workspaceCreate(data, ctx),
		workspaceUpdate: (gardenSlug, id, data) =>
			workspaceUpdate(gardenSlug, id, data, ctx),
		plantingAreaCreate: (data) => plantingAreaCreate(data, ctx),
		plantingAreaUpdate: (id, data) => plantingAreaUpdate(id, data, ctx),
		geometryUpdate: (id, data) => geometryUpdate(id, data, ctx),
		geometryHistoryUpdate: (data) => geometryHistoryUpdate(data, ctx),
		geometryHistoryExtend: (id, date) => geometryHistoryExtend(id, date, ctx),
		locationUpdate: (id, data) => locationUpdate(id, data, ctx),
		locationHistoryUpdate: (data) => locationHistoryUpdate(data, ctx),
		locationHistoryExtend: (id, data) => locationHistoryExtend(id, data, ctx),

		plantsCreate: (data) => plantsCreate(data, ctx),
		draftBucketCreate: (data) => draftBucketCreate(data, ctx),
		draftBucketCommit: (id) => draftBucketCommit(id, ctx),
		draftBucketDiscard: (id) => draftBucketDiscard(id, ctx),
		plantUpdate: (id, data) => plantUpdate(id, data, ctx),
		lifespanUpdate: (id, data) => lifespanUpdate(id, data, ctx),

		observationUpdate: (data) => observationUpdate(data, ctx),
		observationDelete: (id) => observationDelete(id, ctx)
	};
}
