<script lang="ts">
	import { useQuery } from '@triplit/svelte';
	import type { Vector2d } from 'konva/lib/types';

	import type { GeometryUpdateCommand } from '@vdg-webapp/models';
	import { historySelect } from '@vdg-webapp/models';
	import { PlantingArea } from '@vdg-webapp/ui';

	import triplit from '$data/triplit';
	import { geometryUpdate, locationHistoryUpdate } from '$data/workspaces/commands';
	import { plantingAreaQuery } from '$data/workspaces/queries';
	import createCommandHandler from '$state/commandHandler.svelte';

	import { getWorkspaceContext } from '../activeWorkspace.svelte';
	import toolbox from '../tools';

	type Props = {
		plantingAreaLayerId: string;
		plantingAreaId: string;
	};
	let { plantingAreaLayerId, plantingAreaId }: Props = $props();

	/** Contexts. */
	const workspaceContext = getWorkspaceContext();
	const canvasContext = workspaceContext.layoutCanvasContext;
	const canvasId = canvasContext.canvasId;

	/** Queries. */
	const query = useQuery(triplit, plantingAreaQuery.Vars({ plantingAreaId }));

	/** Handlers. */
	const translateCommandHandler = createCommandHandler(locationHistoryUpdate);
	const transformMutationHandler = createCommandHandler(geometryUpdate);

	/** If defined, the query is successful. */
	let plantingArea = $derived.by(() => {
		if (query.results && query.results[0]) {
			return query.results[0];
		} else {
			return null;
		}
	});

	/**
	 * Tracks the position in the location history at the
	 * focused time and in this workspace in the timeline selection.
	 */
	let position: Vector2d | null = $derived.by(() => {
		if (plantingArea && plantingArea.locationHistory) {
			const location = historySelect(
				plantingArea.locationHistory?.locations,
				workspaceContext.timelineSelection.focusUtc
			);
			if (location && location.workspaceId === workspaceContext.id) {
				return { x: location.x, y: location.y };
			} else {
				return null;
			}
		} else {
			return null;
		}
	});

	/** Editable only if editing is enabled and a new planting area isn't being created. */
	let editable: boolean = $derived(
		workspaceContext.editing && !toolbox.isToolActive('plantingAreaCreate')
	);

	/** Selected if included in the list of selected IDs. */
	let selected: boolean = $derived(
		workspaceContext.selections.has('plantingArea', plantingAreaId)
	);

	/** Update the location history on translation. */
	function onTranslate(newPos: Vector2d) {
		if (!plantingArea || !workspaceContext.id) {
			return;
		}

		translateCommandHandler.execute({
			id: plantingArea.locationHistoryId,
			workspaceId: workspaceContext.id,
			coordinate: {
				x: canvasContext.transform.modelXPos(newPos.x),
				y: canvasContext.transform.modelYPos(newPos.y)
			},
			date: workspaceContext.timelineSelection.focusUtc
		});
	}

	/** Update the geometry on transformation. */
	function onTransform(newGeometry: GeometryUpdateCommand) {
		if (!plantingArea) {
			return;
		}

		transformMutationHandler.execute(plantingArea.geometryId, newGeometry);
	}
</script>

<!--
@component
Renders a planting area in the canvas for a planting
area in the workspace editor, ie., editable
-->
{#if plantingArea && plantingArea.geometry}
	<PlantingArea
		{canvasId}
		{plantingAreaLayerId}
		name={plantingArea.name}
		showName={true}
		{position}
		geometry={plantingArea.geometry}
		{editable}
		{selected}
		{onTranslate}
		{onTransform}
		onClick={() => {
			if (toolbox.isToolActive('plantingAreaCreate')) {
				return;
			}
			workspaceContext.selections.select('plantingArea', plantingAreaId);
		}}
	/>
{/if}
