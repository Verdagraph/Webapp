<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import {
		createEditableTree,
		EditableTree,
		String,
		Textarea,
		Number,
		Distance,
		toTreeId as toTreeIdGeneric,
		type Item
	} from '$components/editableTree';
	import triplit from '$data/triplit';
	import { plantingAreasQuery } from '$data/workspaces/queries';
	import { plantingAreaUpdate } from '$data/workspaces/commands';
	import createMutationHandler from '$state/mutationHandler.svelte';
	import { createChangeHandler } from '$state/changeHandler.svelte';
	import { useQuery } from '@triplit/svelte';
	import {
		plantingAreaNameSchema,
		plantingAreaDescriptionSchema,
		plantingAreaDepthSchema,
		type PlantingArea,
		validateField, type Geometry
	} from '@vdt-webapp/common';
	import { getWorkspaceContext } from '../../activeWorkspace.svelte';

	type Props = {
		plantingAreaIds: string[];
	};
	let { plantingAreaIds }: Props = $props();

	/** The types of entities in the tree whose selections must be synchronized. */
	type Entities = 'plantingArea';
	const toTreeId = toTreeIdGeneric<Entities>;

	/** Workspace context. */
	const workspace = getWorkspaceContext();

	/** Stores errors of the tree fields. */
	const fieldErrors: Record<string, string[]> = $state({});

	/** Queries. */
	const query = useQuery(triplit, plantingAreasQuery.vars({ ids: plantingAreaIds }));
	$effect(() => {
		query.updateQuery(plantingAreasQuery.vars({ ids: plantingAreaIds }));
	});

	/** Handlers. */
	/** PlantingArea change. */
	const plantingAreaMutationHandler = createMutationHandler(
		plantingAreaUpdate.mutation
	);
	const plantingAreaChangeHandler = createChangeHandler(
		async (newData: Record<string, Partial<PlantingArea>>) => {
			for (const plantingAreaId of Object.keys(newData)) {
				plantingAreaMutationHandler.execute({
					id: plantingAreaId,
					name: newData[plantingAreaId].name,
					description: newData[plantingAreaId].description,
					depth: newData[plantingAreaId].depth
				});
			}
		}
	);

	function geometryTreeItem(id: string, geometry: Geometry): Item {

	}

	function plantingAreaTreeItem(plantingArea: PlantingArea): Item {
		const baseId = toTreeId('plantingArea', plantingArea.id);
		const nameId = toTreeId('plantingArea', plantingArea.id, 'name');
		const descriptionId = toTreeId('plantingArea', plantingArea.id, 'description')
		const depthId = toTreeId('plantingArea', plantingArea.id, 'depth')

		return {
			id: baseId,
			label: plantingArea.name,
			children: [
				{
					/** Name. */
					id: nameId,
					label: 'Name',
					description: plantingAreaNameSchema.description,
					valueComponent: String,
					value: plantingArea.name,
					onChange: (changeOver: boolean, newData: string) => {
						const errors = validateField(newData, plantingAreaNameSchema);
						if (errors) {
							fieldErrors[nameId] = errors;
							return
						}
						plantingAreaChangeHandler.change(changeOver, {
							[plantingArea.id]: { name: newData }
						});
					}
				},

				/** Details. */
				{
					id: toTreeId('plantingArea', plantingArea.id, 'details'),
					label: 'Details',
					children: [
						/** Description. */
						{
							id: descriptionId,
							label: 'Description',
							description: plantingAreaDescriptionSchema.description,
							valueSnippet: Textarea,
							value: plantingArea.description,
							onChange: (changeOver: boolean, newData: string) => {
								const errors = validateField(newData, plantingAreaDescriptionSchema);
								if (errors) {
									fieldErrors[descriptionId] = errors;
									return
								}
								plantingAreaChangeHandler.change(changeOver, {
									plantingAreaId: { description: newData }
								});
							}
						},

						/** Depth. */
						{
							id: depthId,
							label: 'Depth',
							description: plantingAreaDepthSchema.description,
							valueSnippet: Distance,
							value: plantingArea.depth,
							onChange: (changeOver: boolean, newData: number) => {
								const errors = validateField(newData, plantingAreaDepthSchema);
								if (errors) {
									fieldErrors[depthId] = errors;
									return
								}
								plantingAreaChangeHandler.change(changeOver, {
									plantingAreaId: { depth: newData }
								});
							}
						}
					]
				},

				/** Geometry. */,
				geometryTreeItem(toTreeId('plantingArea', plantingArea.id, 'geometry'), plantingArea.geometry)
			]
		};
	}

	/** Given the planting areas, construct the editable tree items. */
	let items = $derived(
		(query.results || []).map((plantingArea) => {
			return plantingAreaTreeItem(plantingArea);
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
				editableTree.tree.select(toTreeId('plantingArea', id));
			});

			removedIds.forEach((id) => {
				editableTree.tree.deselect(toTreeId('plantingArea', id));
			});
		}
	);
</script>

{#if plantingAreaIds.length === 0}
	<span class="p-2 italic"> No planting areas. </span>
{:else}
	<ScrollArea class="h-full w-full px-2">
		<EditableTree {editableTree} {fieldErrors} editing={workspace.editing} />
	</ScrollArea>
{/if}
