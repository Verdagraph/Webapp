<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import {
		createEditableTree,
		EditableTree,
		TreeString,
		TreeTextarea,
		TreeNumber,
		TreeDistance,
		toTreeBaseId,
		toTreeId,
		fieldValid,
		geometryTreeItem,
		type Item
	} from '$components/editableTree';
	import triplit from '$data/triplit';
	import { plantingAreasQuery } from '$data/workspaces/queries';
	import {
		plantingAreaUpdate,
		locationHistoryUpdate,
		geometryUpdate
	} from '$data/workspaces/commands';
	import createMutationHandler from '$state/mutationHandler.svelte';
	import { type ChangeHandler, createChangeHandler } from '$state/changeHandler.svelte';
	import { useQuery } from '@triplit/svelte';
	import {
		type PlantingArea,
		validateField,
		type Geometry,
		type GeometryType,
		workspaceFields,
		type PlantingAreaUpdateCommand,
		type GeometryUpdateCommand,
		type FieldErrors
	} from '@vdt-webapp/common';
	import { getWorkspaceContext } from '../../activeWorkspace.svelte';
	import { type DateValue } from '@internationalized/date';

	type Props = {
		plantingAreaIds: string[];
	};
	let { plantingAreaIds }: Props = $props();

	/** The types of entities in the tree whose selections must be synchronized. */
	type Entities = 'plantingArea';

	/** Workspace context. */
	const workspace = getWorkspaceContext();

	/** Stores errors of the tree fields. */
	const fieldErrors: FieldErrors = $state({});

	/** Queries. */
	let query = $derived(
		useQuery(triplit, plantingAreasQuery.Vars({ ids: plantingAreaIds }))
	);

	/** Handlers. */
	/** PlantingArea change. */
	const plantingAreaMutationHandler = createMutationHandler(
		plantingAreaUpdate.mutation
	);
	const plantingAreaChangeHandler = createChangeHandler(
		(newData: Record<string, PlantingAreaUpdateCommand>) => {
			for (const plantingAreaId of Object.keys(newData)) {
				plantingAreaMutationHandler.execute(plantingAreaId, newData[plantingAreaId]);
			}
		}
	);

	/** Geometry change. */
	const geometryMutationHandler = createMutationHandler(geometryUpdate);
	const geometryChangeHandler = createChangeHandler(
		(newData: Record<string, GeometryUpdateCommand>) => {
			for (const geometryId of Object.keys(newData)) {
				geometryMutationHandler.execute(geometryId, newData);
			}
		}
	);

	/** Location change. */

	//function locationTreeItem(baseId: string, )

	function plantingAreaTreeItem(plantingArea: PlantingArea): Item {
		const baseId = toTreeBaseId('plantingArea', plantingArea.id);
		const nameId = toTreeId(baseId, 'name');
		const descriptionId = toTreeId(baseId, 'description');
		const depthId = toTreeId(baseId, 'depth');

		const geometryItem = geometryTreeItem(
			baseId,
			plantingArea.geometry,
			false,
			false,
			geometryChangeHandler,
			fieldErrors
		);

		return {
			id: baseId,
			label: plantingArea.name,
			children: [
				{
					/** Name. */
					id: nameId,
					label: 'Name',
					description: workspaceFields.plantingAreaNameSchema.description,
					valueComponent: TreeString,
					value: plantingArea.name,
					onChange: (changeOver: boolean, newData: string) => {
						if (
							!fieldValid(
								nameId,
								newData,
								workspaceFields.plantingAreaNameSchema,
								fieldErrors
							)
						) {
							return;
						}
						plantingAreaChangeHandler.change(changeOver, {
							[plantingArea.id]: { name: newData }
						});
					}
				},

				/** Details. */
				{
					id: toTreeId(baseId, 'details'),
					label: 'Details',
					children: [
						/** Description. */
						{
							id: descriptionId,
							label: 'Description',
							description: workspaceFields.plantingAreaDescriptionSchema.description,
							valueSnippet: TreeTextarea,
							value: plantingArea.description,
							onChange: (changeOver: boolean, newData: string) => {
								if (
									!fieldValid(
										descriptionId,
										newData,
										workspaceFields.plantingAreaDescriptionSchema,
										fieldErrors
									)
								) {
									return;
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
							description: workspaceFields.plantingAreaDepthSchema.description,
							valueSnippet: TreeDistance,
							value: plantingArea.depth,
							onChange: (changeOver: boolean, newData: number) => {
								if (
									!fieldValid(
										depthId,
										newData,
										workspaceFields.plantingAreaDepthSchema,
										fieldErrors
									)
								) {
									return;
								}
								plantingAreaChangeHandler.change(changeOver, {
									plantingAreaId: { depth: newData }
								});
							}
						}
					]
				},

				/** Geometry. */
				geometryItem

				//{
				//	id: 'arsoie',
				//	label: 'Locations',
				//	children: []
				//}
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
