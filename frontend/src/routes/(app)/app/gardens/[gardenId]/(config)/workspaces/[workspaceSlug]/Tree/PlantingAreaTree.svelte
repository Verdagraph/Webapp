<script lang="ts">
	import { page } from '$app/state';
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
	import { plantingAreasQuery, workspacesQuery } from '$data/workspaces/queries';
	import {
		plantingAreaUpdate,
		geometryUpdate,
		locationUpdate,
		locationHistoryExtend
	} from '$data/workspaces/commands';
	import createCommandHandler from '$state/commandHandler.svelte';
	import { createChangeHandler } from '$state/changeHandler.svelte';
	import { useQuery } from '@triplit/svelte';
	import {
		type PlantingArea,
		workspaceFields,
		type PlantingAreaUpdateCommand,
		type LocationUpdateCommand,
		type GeometryUpdateCommand,
		type FieldErrors
	} from '@vdt-webapp/common';
	import { getWorkspaceContext } from '../../activeWorkspace.svelte';
	import { locationHistoryTreeItem } from '$components/editableTree/items/locations';

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
	let workspacesInGarden = $derived(
		useQuery(triplit, workspacesQuery.Vars({ gardenId: page.params.gardenId }))
	);
	/** Options for workspaces available to locations. */
	let workspacesOptions = $derived(
		workspacesInGarden.results?.map((result) => ({
			id: result.id,
			name: result.name
		})) || []
	);

	/** Handlers. */
	/** PlantingArea change. */
	const plantingAreaUpdateCommandHandler = createCommandHandler(
		plantingAreaUpdate.mutation
	);
	const plantingAreaUpdateChangeHandler = createChangeHandler(
		(newData: Record<string, PlantingAreaUpdateCommand>) => {
			for (const plantingAreaId of Object.keys(newData)) {
				plantingAreaUpdateCommandHandler.execute(
					plantingAreaId,
					newData[plantingAreaId]
				);
			}
		}
	);

	/** Geometry change. */
	const geometryUpdateCommandHandler = createCommandHandler(geometryUpdate);
	const geometryUpdateChangeHandler = createChangeHandler(
		(newData: Record<string, GeometryUpdateCommand>) => {
			for (const geometryId of Object.keys(newData)) {
				geometryUpdateCommandHandler.execute(geometryId, newData[geometryId]);
			}
		}
	);

	/** Location change. */
	const locationUpdateCommandHandler = createCommandHandler(locationUpdate);
	const locationUpdateChangeHandler = createChangeHandler(
		(newData: Record<string, LocationUpdateCommand>) => {
			for (const locationId of Object.keys(newData)) {
				locationUpdateCommandHandler.execute(locationId, newData[locationId]);
			}
		}
	);
	const locationHistoryExtendCommandHandler =
		createCommandHandler(locationHistoryExtend);
	const locationHistoryExtendChangeHandler = createChangeHandler((newData: string) => {
		locationHistoryExtendCommandHandler.execute(
			newData,
			workspace.timelineSelection.focusUtc
		);
	});

	function plantingAreaTreeItem(plantingArea: PlantingArea): Item {
		const baseId = toTreeBaseId('plantingArea', plantingArea.id);
		const nameId = toTreeId(baseId, 'name');
		const descriptionId = toTreeId(baseId, 'description');
		const depthId = toTreeId(baseId, 'depth');

		const geometryItem = geometryTreeItem(
			toTreeId(baseId, 'geometry'),
			plantingArea.geometry,
			false,
			false,
			false,
			geometryUpdateChangeHandler,
			fieldErrors
		);

		const locationHistoryItem = locationHistoryTreeItem(
			baseId,
			plantingArea.locationHistory,
			locationUpdateChangeHandler,
			locationHistoryExtendChangeHandler,
			fieldErrors,
			workspacesOptions
		);

		const nameItem: Item = {
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
				plantingAreaUpdateChangeHandler.change(changeOver, {
					[plantingArea.id]: { name: newData }
				});
			}
		};

		const descriptionItem: Item = {
			id: descriptionId,
			label: 'Description',
			description: workspaceFields.plantingAreaDescriptionSchema.description,
			valueComponent: TreeTextarea,
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

				plantingAreaUpdateChangeHandler.change(changeOver, {
					[plantingArea.id]: { description: newData }
				});
			}
		};

		const depthItem: Item = {
			id: depthId,
			label: 'Depth',
			description: workspaceFields.plantingAreaDepthSchema.description,
			valueComponent: TreeDistance,
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
				plantingAreaUpdateChangeHandler.change(changeOver, {
					[plantingArea.id]: { depth: newData }
				});
			}
		};

		return {
			id: baseId,
			label: plantingArea.name,
			children: [
				nameItem,
				/** Details. */
				{
					id: toTreeId(baseId, 'details'),
					label: 'Details',
					children: [descriptionItem, depthItem]
				},
				geometryItem,
				locationHistoryItem
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
