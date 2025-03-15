<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import {
		createEditableTree,
		EditableTree,
		String,
		Textarea,
		Number,
		Distance,
		toTreeBaseId,
		toTreeId,
		type Item
	} from '$components/editableTree';
	import triplit from '$data/triplit';
	import { plantingAreasQuery } from '$data/workspaces/queries';
	import { plantingAreaUpdate } from '$data/workspaces/commands';
	import createMutationHandler from '$state/mutationHandler.svelte';
	import { createChangeHandler } from '$state/changeHandler.svelte';
	import { useQuery } from '@triplit/svelte';
	import {
		type PlantingArea,
		validateField,
		type Geometry,
		type GeometryType,
		workspaceFields
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
	const fieldErrors: Record<string, string[]> = $state({});

	/** Queries. */
	let query = useQuery(triplit, plantingAreasQuery.Vars({ ids: plantingAreaIds }));
	$effect(() => {
		query = useQuery(triplit, plantingAreasQuery.Vars({ ids: plantingAreaIds }));
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

	function geometryTreeItem(
		baseId: string,
		geometry: Geometry,
		includeDate: boolean = true
	): Item {
		const typeId = toTreeId(baseId, 'geometryType');
		const dateId = toTreeId(baseId, 'geometryDate');
		const scaleFactorId = toTreeId(baseId, 'geometryScaleFactor');
		const rotationId = toTreeId(baseId, 'geometryRotation');

		const typeItem = {
			id: typeId,
			label: 'Type',
			description: workspaceFields.geometryTypeSchema.description,
			valueComponent: String,
			value: geometry.type,
			onChange: (changeOver: boolean, newData: GeometryType) => {}
		};
		const dateItem = {
			id: dateId,
			label: 'Date',
			description: workspaceFields.geometryDateSchema.description,
			valueComponent: String,
			value: geometry.date,
			onChange: (changeOver: boolean, newData: DateValue) => {}
		};
		const scaleFactorItem = {
			id: scaleFactorId,
			label: 'Scale Factor',
			description: workspaceFields.geometryScaleFactorSchema.description,
			valueComponent: String,
			value: geometry.scaleFactor,
			onChange: (changeOver: boolean, newData: number) => {}
		};
		const rotationItem = {
			id: rotationId,
			label: 'Rotation',
			description: workspaceFields.geometryRotationSchema.description,
			valueComponent: String,
			value: geometry.rotation,
			onChange: (changeOver: boolean, newData: number) => {}
		};
		let attributesItems = [];
		switch (geometry.type) {
			case 'RECTANGLE':
				const rectangleLengthId = toTreeId(baseId, 'geometryRectangleLength');
				const rectangleWidthId = toTreeId(baseId, 'geometryRectangleWidth');

				attributesItems = [
					{
						id: rectangleLengthId,
						label: 'Length',
						description: workspaceFields.geometryRectangleLengthSchema.description,
						valueComponent: Distance,
						value: geometry.rectangleLength,
						onChange: (changeOver: boolean, newData: number) => {}
					},
					{
						id: rectangleWidthId,
						label: 'Width',
						description: workspaceFields.geometryRectangleWidthSchema.description,
						valueComponent: Distance,
						value: geometry.rectangleWidth,
						onChange: (changeOver: boolean, newData: number) => {}
					}
				];
		}

		return {
			id: toTreeId(baseId, 'geometry'),
			label: 'Geometry',
			children: []
		};
	}

	//function locationTreeItem(baseId: string, )

	function plantingAreaTreeItem(plantingArea: PlantingArea): Item {
		const baseId = toTreeBaseId('plantingArea', plantingArea.id);
		const nameId = toTreeId(baseId, 'name');
		const descriptionId = toTreeId(baseId, 'description');
		const depthId = toTreeId(baseId, 'depth');

		const geometryItem = geometryTreeItem(baseId, plantingArea.geometry);

		return {
			id: baseId,
			label: plantingArea.name,
			children: [
				{
					/** Name. */
					id: nameId,
					label: 'Name',
					description: workspaceFields.plantingAreaNameSchema.description,
					valueComponent: String,
					value: plantingArea.name,
					onChange: (changeOver: boolean, newData: string) => {
						const errors = validateField(
							newData,
							workspaceFields.plantingAreaNameSchema
						);
						if (errors) {
							fieldErrors[nameId] = errors;
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
							valueSnippet: Textarea,
							value: plantingArea.description,
							onChange: (changeOver: boolean, newData: string) => {
								const errors = validateField(
									newData,
									workspaceFields.plantingAreaDescriptionSchema
								);
								if (errors) {
									fieldErrors[descriptionId] = errors;
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
							valueSnippet: Distance,
							value: plantingArea.depth,
							onChange: (changeOver: boolean, newData: number) => {
								const errors = validateField(
									newData,
									workspaceFields.plantingAreaDepthSchema
								);
								if (errors) {
									fieldErrors[depthId] = errors;
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
				geometryItem,

				{
					id: 'arsoie',
					label: 'Locations',
					children: []
				}
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
