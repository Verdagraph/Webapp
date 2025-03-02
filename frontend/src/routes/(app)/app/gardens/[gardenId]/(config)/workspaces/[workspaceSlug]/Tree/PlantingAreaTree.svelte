<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import {
		createEditableTree,
		EditableTree,
		editableStringAttribute,
		editableDistanceAttribute,
		editableTextareaAttribute,
		fromTreeId,
		toTreeId
	} from '$components/editableTree';
	import triplit from '$data/triplit';
	import { plantingAreasQuery } from '$data/workspaces/queries';
	import {plantingAreaUpdate} from '$data/workspaces/commands'
	import iconIds from '$lib/assets/icons';
	import createMutationHandler from '$state/mutationHandler.svelte';
	import { createChangeHandler } from '$state/changeHandler.svelte';
	import { useQuery } from '@triplit/svelte';
	import { workspaceFields, type PlantingArea } from '@vdt-webapp/common';
	import { getWorkspaceContext } from '../../activeWorkspace.svelte';

	type Props = {
		plantingAreaIds: string[];
	};
	let { plantingAreaIds }: Props = $props();

	/** The types of entities in the tree whose selections must be synchronized. */
	type Entities = 'plantingArea';

	/** Workspace context. */
	const workspace = getWorkspaceContext();

	/** Queries. */
	const query = useQuery(triplit, plantingAreasQuery.vars({ ids: plantingAreaIds }));
	$effect(() => {
		query.updateQuery(plantingAreasQuery.vars({ ids: plantingAreaIds }));
	});

	/** Handlers. */
	/** PlantingArea change. */
	const plantingAreaMutationHandler = createMutationHandler(plantingAreaUpdate.mutation);
	const plantingAreaChangeHandler = createChangeHandler(
		async (newData: Record<string, Partial<PlantingArea>>) => {
			for (const plantingAreaId of Object.keys(newData)) {
				plantingAreaMutationHandler.execute({id: plantingAreaId, name: newData.name, description: newData.description, newData.grid.numRows, newData.grid.numCols, newData.depth})
			}
		},
		TRIPLIT_UPDATE_DEFAULT_INTERVAL,
	);

	/** Given the planting areas, construct the editable tree items. */
	let items = $derived(
		(query.results || []).map((plantingArea) => {
			return {
				id: toTreeId<Entities>('plantingArea', plantingArea.id),
				label: plantingArea.name,
				children: [
					{
						/** Name. */
						id: toTreeId<Entities>('plantingArea', plantingArea.id, 'name'),
						label: 'Name',
						description: workspaceFields.plantingAreaName.description,
						valueSnippet: editableStringAttribute,
						value: plantingArea.name,
						onChange: (changeOver: boolean, newData: string) => {
							if (tree.validateField(toTreeId<Entities>('plantingArea', plantingArea.id, 'name'), newData, workspaceFields.plantingAreaName)) {
								plantingAreaChangeHandler.change(changeOver, {name: newData})
							}
						}
					},

					/** Details. */
					{
						id: toTreeId<Entities>('plantingArea', plantingArea.id, 'details'),
						label: 'Details',
						children: [
							/** Description. */
							{
								id: toTreeId('PlantingArea', plantingArea.id, 'description'),
								label: 'Description',
								description: workspaceFields.plantingAreaDescription.description,
								valueSnippet: editableTextareaAttribute,
								value: plantingArea.description,
								onChange: (changeOver: boolean, newData: string) => {}
							},

							/** Depth. */
							{
								id: toTreeId<Entities>('plantingArea', plantingArea.id, 'depth'),
								label: 'Depth',
								description: workspaceFields.plantingAreaDepth.description,
								valueSnippet: editableDistanceAttribute,
								value: plantingArea.depth,
								onChange: (changeOver: boolean, newData: number) => {}
							}
						]
					}
				]
			};
		})
	);

	/** Create the editable tree. */
	const editableTree = createEditableTree<Entities>(() => items, {
		plantingArea: {
			add: (id: string) => {
				workspace.selections.select('plantingArea', id);
			},
			remove: (id: string) => {
				console.log(`deselecting: ${id}`);
				workspace.selections.deselect('plantingArea', id);
			}
		}
	});

	/** Synchronize changes in the workspace selection with the tree. */
	workspace.selections.addSelectionChangeHandler(
		'plantingArea',
		(addedIds, removedIds) => {
			addedIds.forEach((id) => {
				editableTree.tree.select(toTreeId<Entities>('plantingArea', id));
			});

			removedIds.forEach((id) => {
				editableTree.tree.deselect(toTreeId<Entities>('plantingArea', id));
			});
		}
	);
</script>

{#if plantingAreaIds.length === 0}
	<span class="p-2 italic"> No planting areas. </span>
{:else}
	<ScrollArea class="h-full w-full px-2">
		<EditableTree {editableTree} editing={workspace.editing} />
	</ScrollArea>
{/if}
