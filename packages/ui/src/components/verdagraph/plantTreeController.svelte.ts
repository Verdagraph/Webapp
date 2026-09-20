import {
	type FieldErrors,
	type Plant,
	type Workspace,
	geometryHistoryExtend,
	geometryUpdate,
	lifespanUpdate,
	locationHistoryExtend,
	locationUpdate,
	observationDelete,
	observationUpdate,
	plantUpdate
} from '@vdg-webapp/models';

import {
	type PlantDeleteHandler,
	createEditableTree,
	plantTreeItem,
	toTreeBaseId
} from '$components';
import { getAppContext } from '$state';
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
	plants: () => Plant[];
	workspaces: () => Pick<Workspace, 'id' | 'name'>[];
	plantDeleteHandler?: PlantDeleteHandler;
}) {
	const ctx = getAppContext();
	const verdagraphContext = getVerdagraphContext();

	const fieldErrors: FieldErrors = $state({});

	const plantUpdateCommandHandler = createCommandHandler(plantUpdate);
	const lifespanUpdateCommandHandler = createCommandHandler(lifespanUpdate);
	const geometryUpdateCommandHandler = createCommandHandler(geometryUpdate);
	const locationUpdateCommandHandler = createCommandHandler(locationUpdate);
	const locationHistoryExtendCommandHandler =
		createCommandHandler(locationHistoryExtend);
	const geometryHistoryExtendCommandHandler =
		createCommandHandler(geometryHistoryExtend);
	const observationUpdateCommandHandler = createCommandHandler(observationUpdate);
	const observationDeleteCommandHandler = createCommandHandler(observationDelete);

	const items = $derived(
		options.plants().map((plant) => {
			return plantTreeItem(
				{ plant, workspaces: options.workspaces() },
				{
					fieldErrors,
					plantUpdateHandler: (id, data) => {
						plantUpdateCommandHandler.execute(id, data, ctx.controller);
					},
					lifespanUpdateHandler: (id, data) => {
						lifespanUpdateCommandHandler.execute(id, data, ctx.controller);
					},
					geometryUpdateHandler: (id, data) => {
						geometryUpdateCommandHandler.execute(id, data, ctx.controller);
					},
					locationUpdateHandler: (id, data) => {
						locationUpdateCommandHandler.execute(id, data, ctx.controller);
					},
					locationHistoryExtendHandler: (id) => {
						locationHistoryExtendCommandHandler.execute(
							id,
							{ date: verdagraphContext.timeline.focusUtc },
							ctx.controller
						);
					},
					geometryHistoryExtendHandler: (id) => {
						geometryHistoryExtendCommandHandler.execute(
							id,
							verdagraphContext.timeline.focusUtc,
							ctx.controller
						);
					},
					observationUpdateHandler: (data) => {
						observationUpdateCommandHandler.execute(data, ctx.controller);
					},
					observationDeleteHandler: (id) => {
						observationDeleteCommandHandler.execute(id, ctx.controller);
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
