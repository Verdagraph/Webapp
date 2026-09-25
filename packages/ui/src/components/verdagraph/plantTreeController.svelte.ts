import { type FieldErrors, type Workspace } from '@vdg-webapp/models';

import {
	type PlantDeleteHandler,
	createEditableTree,
	plantTreeItem,
	toTreeBaseId
} from '$components';
import { getAppContext } from '$state';
import { type ResolvedPlant } from '$state/application/plantsContext.svelte';
import createCommandHandler from '$state/commandHandler.svelte';

import { getVerdagraphContext } from './verdagraphContext.svelte';

type TreeEntities = 'plant';

/**
 * Shared behind PlantTree.svelte (the main Tree's Plants pane) and
 * DraftBucketTree.svelte (the Add Plants tool's "To Create" tree): both
 * render the same editable tree over a list of Plants, wiring up the same
 * eight command handlers and the same selection sync with verdagraphContext.
 * The only real differences between the two call sites are where the plants
 * list comes from (a prop vs. a draftBucketId-scoped query) and whether a
 * delete handler is supplied - both are left to the caller.
 */
export function createPlantTreeController(options: {
	plants: () => ResolvedPlant[];
	workspaces: () => Pick<Workspace, 'id' | 'name'>[];
	plantDeleteHandler?: PlantDeleteHandler;
}) {
	const ctx = getAppContext();
	const verdagraphContext = getVerdagraphContext();

	const fieldErrors: FieldErrors = $state({});

	const plantUpdateCommandHandler = createCommandHandler(ctx.controller.plantUpdate);
	const lifespanUpdateCommandHandler = createCommandHandler(
		ctx.controller.lifespanUpdate
	);
	const geometryUpdateCommandHandler = createCommandHandler(
		ctx.controller.geometryUpdate
	);
	const locationUpdateCommandHandler = createCommandHandler(
		ctx.controller.locationUpdate
	);
	const locationHistoryExtendCommandHandler = createCommandHandler(
		ctx.controller.locationHistoryExtend
	);
	const geometryHistoryExtendCommandHandler = createCommandHandler(
		ctx.controller.geometryHistoryExtend
	);
	const observationUpdateCommandHandler = createCommandHandler(
		ctx.controller.observationUpdate
	);
	const observationDeleteCommandHandler = createCommandHandler(
		ctx.controller.observationDelete
	);

	const items = $derived(
		options.plants().map((plant) => {
			return plantTreeItem(
				{ plant, workspaces: options.workspaces() },
				{
					fieldErrors,
					plantUpdateHandler: (id, data) => {
						plantUpdateCommandHandler.execute(id, data);
					},
					lifespanUpdateHandler: (id, data) => {
						lifespanUpdateCommandHandler.execute(id, data);
					},
					geometryUpdateHandler: (id, data) => {
						geometryUpdateCommandHandler.execute(id, data);
					},
					locationUpdateHandler: (id, data) => {
						locationUpdateCommandHandler.execute(id, data);
					},
					locationHistoryExtendHandler: (id) => {
						locationHistoryExtendCommandHandler.execute(id, {
							date: verdagraphContext.timeline.focusUtc
						});
					},
					geometryHistoryExtendHandler: (id) => {
						geometryHistoryExtendCommandHandler.execute(
							id,
							verdagraphContext.timeline.focusUtc
						);
					},
					observationUpdateHandler: (data) => {
						observationUpdateCommandHandler.execute(data);
					},
					observationDeleteHandler: (id) => {
						observationDeleteCommandHandler.execute(id);
					},
					plantDeleteHandler: options.plantDeleteHandler
				}
			);
		})
	);

	/** Create the editable tree. */
	const editableTree = createEditableTree<TreeEntities>(() => items, {
		/** Synchronize changes in the tree selection with the verdagraph context. */
		plant: {
			add: (id: string) => {
				verdagraphContext.selections.select('plants', id);
			},
			remove: (id: string) => {
				verdagraphContext.selections.deselect('plants', id);
			}
		}
	});

	/** Synchronize changes in the verdagraph context selection with the tree selection. */
	verdagraphContext.selections.addSelectionChangeHandler(
		'plants',
		(addedIds, removedIds) => {
			addedIds.forEach((id) => {
				editableTree.tree.select(toTreeBaseId('plant', id));
			});

			removedIds.forEach((id) => {
				editableTree.tree.deselect(toTreeBaseId('plant', id));
			});
		}
	);

	return {
		editableTree,
		get fieldErrors() {
			return fieldErrors;
		}
	};
}
