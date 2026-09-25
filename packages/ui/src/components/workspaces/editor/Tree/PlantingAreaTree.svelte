<script lang="ts">
	import { type FieldErrors, type Workspace } from '@vdg-webapp/models';

	import { EditableTree, createEditableTree, toTreeBaseId } from '$components';
	import { plantingAreaTreeItem } from '$components';
	import { ScrollArea } from '$core';
	import { getAppContext } from '$state';
	import { type ResolvedPlantingArea } from '$state/application/workspacesContext.svelte';
	import createCommandHandler from '$state/commandHandler.svelte';

	import { getWorkspaceEditorContext } from '../workspaceEditorContext.svelte';

	type Props = {
		plantingAreas: ResolvedPlantingArea[];
		workspaces: Pick<Workspace, 'id' | 'name'>[];
	};
	let { plantingAreas = [], workspaces = [] }: Props = $props();

	/** The types of entities in the tree whose selections must be synchronized. */
	type TreeEntities = 'plantingArea';

	/** Workspace context. */
	const ctx = getAppContext();
	const workspaceEditor = getWorkspaceEditorContext();

	/** Stores errors of the tree fields. */
	const fieldErrors: FieldErrors = $state({});

	/** Queries. */

	/** Options for workspaces available to locations. */

	/** Handlers. */
	/** PlantingArea change. */
	const plantingAreaUpdateCommandHandler = createCommandHandler(
		ctx.controller.plantingAreaUpdate
	);

	/** Geometry change. */
	const geometryUpdateCommandHandler = createCommandHandler(
		ctx.controller.geometryUpdate
	);

	/** Location change. */
	const locationUpdateCommandHandler = createCommandHandler(
		ctx.controller.locationUpdate
	);
	const locationHistoryExtendCommandHandler = createCommandHandler(
		ctx.controller.locationHistoryExtend
	);

	/** Given the planting areas, construct the editable tree items. */
	let items = $derived(
		plantingAreas.map((plantingArea) => {
			return plantingAreaTreeItem(
				{ plantingArea, workspaces },
				{
					fieldErrors,
					plantingAreaUpdateHandler: (id, data) => {
						plantingAreaUpdateCommandHandler.execute(id, data);
					},
					geometryUpdateHandler: (id, data) => {
						geometryUpdateCommandHandler.execute(id, data);
					},
					locationUpdateHandler: (id, data) => {
						locationUpdateCommandHandler.execute(id, data);
					},
					locationHistoryExtendHandler: (id) => {
						locationHistoryExtendCommandHandler.execute(id, {
							date: workspaceEditor.timelineSelection.focusUtc
						});
					}
				}
			);
		})
	);

	/** Create the editable tree. */
	const editableTree = createEditableTree<TreeEntities>(() => items, {
		/** Synchronize changes in the tree selection with the workspace context. */
		plantingArea: {
			add: (id: string) => {
				workspaceEditor.selections.select('plantingArea', id);
			},
			remove: (id: string) => {
				workspaceEditor.selections.deselect('plantingArea', id);
			}
		}
	});

	/** Synchronize changes in the workspace context selection with the tree selection. */
	workspaceEditor.selections.addSelectionChangeHandler(
		'plantingArea',
		(addedIds, removedIds) => {
			addedIds.forEach((id) => {
				editableTree.tree.select(toTreeBaseId('plantingArea', id));
			});

			removedIds.forEach((id) => {
				editableTree.tree.deselect(toTreeBaseId('plantingArea', id));
			});
		}
	);
</script>

{#if plantingAreas.length === 0}
	<span class="p-2 italic"> No planting areas. </span>
{:else}
	<EditableTree {editableTree} {fieldErrors} editing={workspaceEditor.editing} />
{/if}
