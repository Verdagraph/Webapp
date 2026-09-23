import {
	type GardenCreateCommand,
	type GardenMembershipAcceptCommand,
	type GardenMembershipCreateCommand,
	type GardenMembershipDeleteCommand,
	type GardenMembershipRevokeCommand,
	type GardenMembershipRoleChangeCommand
} from '../gardens/commands.js';
import { type ObservationUpdateCommand } from '../observations/commands.js';
import {
	type DraftBucketCreateCommand,
	type LifespanUpdateCommand,
	type PlantUpdateCommand,
	type PlantsCreateCommand
} from '../plants/commands.js';
import {
	type GeometryHistoryUpdateCommand,
	type GeometryUpdateCommand,
	type LocationHistoryUpdateCommand,
	type LocationUpdateCommand,
	type PlantingAreaCreateCommand,
	type PlantingAreaUpdateCommand,
	type WorkspaceCreateCommand,
	type WorkspaceUpdateCommand
} from '../workspaces/commands.js';
import {
	type ControllerContext,
	type ControllerContextParams,
	createController
} from './controller.js';
import {
	gardenCreate,
	gardenMembershipAccept,
	gardenMembershipCreate,
	gardenMembershipDelete,
	gardenMembershipRevoke,
	gardenMembershipRoleChange
} from './gardens/controller.js';
import { type JazzGarden } from './gardens/schema.js';
import { observationDelete, observationUpdate } from './observations/controller.js';
import {
	draftBucketCommit,
	draftBucketCreate,
	draftBucketDiscard,
	lifespanUpdate,
	plantUpdate,
	plantsCreate
} from './plants/controller.js';
import { type JazzDraftBucket } from './plants/schema.js';
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
import { type JazzWorkspace } from './workspaces/schema.js';

/**
 * The full write-side surface, bound to one ControllerContext, so callers
 * never import a command function or a specific backend's context
 * directly. This is the single place where the active backend
 * (currently Jazz for these domains) is chosen; every caller goes
 * through this interface, so a future backend swap changes only this
 * file's implementation, not its ~24 call sites in packages/ui.
 */
export interface Commands extends ControllerContext {
	/** Gardens. */
	gardenCreate(data: GardenCreateCommand): Promise<JazzGarden>;
	gardenMembershipCreate(data: GardenMembershipCreateCommand): Promise<void>;
	gardenMembershipAccept(data: GardenMembershipAcceptCommand): Promise<void>;
	gardenMembershipDelete(data: GardenMembershipDeleteCommand): Promise<void>;
	gardenMembershipRevoke(data: GardenMembershipRevokeCommand): Promise<void>;
	gardenMembershipRoleChange(data: GardenMembershipRoleChangeCommand): Promise<void>;

	/** Workspaces. */
	workspaceCreate(data: WorkspaceCreateCommand): Promise<JazzWorkspace>;
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
	draftBucketCreate(data: DraftBucketCreateCommand): Promise<JazzDraftBucket>;
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
