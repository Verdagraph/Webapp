<script lang="ts">
	import { useQuery } from '@triplit/svelte';

	import {
		type FieldErrors,
		geometryHistoryExtend,
		geometryUpdate,
		lifespanUpdate,
		locationHistoryExtend,
		locationUpdate,
		observationDelete,
		observationUpdate,
		plantUpdate
	} from '@vdg-webapp/models';

	import { EditableTree, createEditableTree, plantTreeItem, toTreeBaseId } from '$components';
	import { Button } from '$core/button/index.js';
	import { ScrollArea } from '$core';
	import { getAppContext } from '$state';
	import createCommandHandler from '$state/commandHandler.svelte';

	import { getVerdagraphContext } from '../verdagraphContext.svelte';

	/** The types of entities in the tree whose selections must be synchronized. */
	type TreeEntities = 'plant';

	const ctx = getAppContext();
	const verdagraphContext = getVerdagraphContext();

	const draftBucketId = $derived(verdagraphContext.draftBucket.current?.id);

	const plantsQuery = $derived(
		draftBucketId
			? useQuery(
					ctx.controller.triplit,
					ctx.controller.triplit
						.query('plants')
						.Where('draftBucketId', '=', draftBucketId)
						.Include('expectedLifespan', (rel) =>
							rel('expectedLifespan')
								.Include('geometryHistory', (rel) =>
									rel('geometryHistory').Include('geometries', (rel) =>
										rel('geometries').Include('linesCoordinates')
									)
								)
								.Include('locationHistory', (rel) =>
									rel('locationHistory').Include('locations')
								)
								.Include('observations')
						)
						.Include('recordedLifespan', (rel) =>
							rel('recordedLifespan')
								.Include('geometryHistory', (rel) =>
									rel('geometryHistory').Include('geometries', (rel) =>
										rel('geometries').Include('linesCoordinates')
									)
								)
								.Include('locationHistory', (rel) =>
									rel('locationHistory').Include('locations')
								)
								.Include('observations')
						)
				)
			: null
	);
	const plants = $derived(plantsQuery?.results ?? []);
	const workspaces = $derived(ctx.workspaces.workspaces);

	/** Stores errors of the tree fields. */
	const fieldErrors: FieldErrors = $state({});

	/** Handlers. */
	const plantUpdateCommandHandler = createCommandHandler(plantUpdate);
	const lifespanUpdateCommandHandler = createCommandHandler(lifespanUpdate);
	const geometryUpdateCommandHandler = createCommandHandler(geometryUpdate);
	const locationUpdateCommandHandler = createCommandHandler(locationUpdate);
	const locationHistoryExtendCommandHandler = createCommandHandler(locationHistoryExtend);
	const geometryHistoryExtendCommandHandler = createCommandHandler(geometryHistoryExtend);
	const observationUpdateCommandHandler = createCommandHandler(observationUpdate);
	const observationDeleteCommandHandler = createCommandHandler(observationDelete);

	/** Given the staged plants, construct the editable tree items. */
	let items = $derived(
		plants.map((plant) => {
			return plantTreeItem(
				{ plant, workspaces },
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
					plantDeleteHandler: (id) => {
						ctx.controller.triplit.delete('plants', id);
					}
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
</script>

<div class="flex h-full flex-col">
	<ScrollArea.Root class="flex-1 px-2">
		{#if plants.length === 0}
			<span class="p-2 italic">Nothing staged yet.</span>
		{:else}
			<EditableTree {editableTree} {fieldErrors} editing={verdagraphContext.editing} />
		{/if}
	</ScrollArea.Root>

	{#if plants.length > 0}
		<div class="flex gap-2 border-t p-2">
			<Button
				variant="default"
				class="flex-1"
				onclick={() => verdagraphContext.draftBucket.commit()}>Commit</Button
			>
			<Button
				variant="destructive"
				class="flex-1"
				onclick={() => verdagraphContext.draftBucket.discard()}>Discard</Button
			>
		</div>
	{/if}
</div>
