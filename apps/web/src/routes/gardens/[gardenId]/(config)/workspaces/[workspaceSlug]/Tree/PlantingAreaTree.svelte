<script lang="ts">
	import { useQuery } from '@triplit/svelte';

	import {
		type FieldErrors,
		type PlantingArea,
		workspaceFields
	} from '@vdg-webapp/models';
	import {
		EditableTree,
		type Item,
		ScrollArea,
		TreeDistance,
		TreeString,
		TreeTextarea,
		createEditableTree,
		fieldValid,
		geometryTreeItem,
		locationHistoryTreeItem,
		toTreeBaseId,
		toTreeId
	} from '@vdg-webapp/ui';

	import { page } from '$app/state';
	import triplit from '$data/triplit';
	import {
		geometryUpdate,
		locationHistoryExtend,
		locationUpdate,
		plantingAreaUpdate
	} from '$data/workspaces/commands';
	import { plantingAreasQuery, workspacesQuery } from '$data/workspaces/queries';
	import createCommandHandler from '$state/commandHandler.svelte';

	import { getWorkspaceContext } from '../../activeWorkspace.svelte';

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

	/** Geometry change. */
	const geometryUpdateCommandHandler = createCommandHandler(geometryUpdate);

	/** Location change. */
	const locationUpdateCommandHandler = createCommandHandler(locationUpdate);
	const locationHistoryExtendCommandHandler =
		createCommandHandler(locationHistoryExtend);

	function plantingAreaTreeItem(plantingArea: PlantingArea): Item {
		const baseId = toTreeBaseId('plantingArea', plantingArea.id);
		const nameId = toTreeId(baseId, 'name');
		const descriptionId = toTreeId(baseId, 'description');
		const depthId = toTreeId(baseId, 'depth');

		const geometryItem = geometryTreeItem(
			toTreeId(baseId, 'geometry'),
			{ geometry: plantingArea.geometry, index: 0 },
			{
				includeIndex: false,
				includeDate: false,
				includeDelete: false,
				includeLinesClosed: false
			},
			{
				updateHandler: (id, data) => {
					geometryUpdateCommandHandler.execute(id, data);
				},
				fieldErrors
			}
		);

		const locationHistoryItem = locationHistoryTreeItem(
			baseId,
			{
				locationHistory: plantingArea.locationHistory,
				workspaces: workspacesOptions
			},
			{
				locationUpdateHandler: (id, data) => {
					locationUpdateCommandHandler.execute(id, data);
				},
				onLocationHistoryExtend: (id: string) => {
					locationHistoryExtendCommandHandler.execute(
						id,
						workspace.timelineSelection.focusUtc
					);
				},
				fieldErrors
			}
		);

		const nameItem: Item = {
			id: nameId,
			label: 'Name',
			description: workspaceFields.plantingAreaNameSchema.description,
			valueComponent: TreeString,
			value: plantingArea.name,
			onChange: (newData: string) => {
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
				plantingAreaUpdateCommandHandler.execute(plantingArea.id, { name: newData });
			}
		};

		const descriptionItem: Item = {
			id: descriptionId,
			label: 'Description',
			description: workspaceFields.plantingAreaDescriptionSchema.description,
			valueComponent: TreeTextarea,
			value: plantingArea.description,
			onChange: (newData: string) => {
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
				plantingAreaUpdateCommandHandler.execute(plantingArea.id, {
					description: newData
				});
			}
		};

		const depthItem: Item = {
			id: depthId,
			label: 'Depth',
			description: workspaceFields.plantingAreaDepthSchema.description,
			valueComponent: TreeDistance,
			value: plantingArea.depth,
			onChange: (newData: number) => {
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
				plantingAreaUpdateCommandHandler.execute(plantingArea.id, { depth: newData });
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
	<ScrollArea.Root class="h-full w-full px-2">
		<EditableTree {editableTree} {fieldErrors} editing={workspace.editing} />
	</ScrollArea.Root>
{/if}
