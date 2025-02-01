<script lang="ts">
	import type { DeepPartial, Geometry, Position } from '@vdt-webapp/common';
	import PlantingArea from '$components/canvas/workspace/PlantingArea.svelte';
	import { plantingAreaQuery } from '$data/workspaces/queries';
	import type { Vector2d } from 'konva/lib/types';
	import { historySelect } from '@vdt-webapp/common';
	import triplit, { TRIPLIT_UPDATE_DEFAULT_INTERVAL } from '$data/triplit';
	import { locationHistoryUpdate, geometryUpdate } from '$data/workspaces/commands';
	import { useQuery } from '@triplit/svelte';
	import { getWorkspaceContext } from '../activeWorkspace.svelte';
	import toolbox from '../tools';
	import createMutationHandler from '$state/mutationHandler.svelte';
	import { createChangeHandler } from '$state/changeHandler.svelte';

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
	const query = useQuery(triplit, plantingAreaQuery.vars({ plantingAreaId }));

	/** Handlers. */
	const translateMutationHandler = createMutationHandler(locationHistoryUpdate);
	const translateChangeHandler = createChangeHandler(
		(newData: Position) => {
			if (!plantingArea || !workspaceContext.id) {
				return;
			}

			translateMutationHandler.execute(
				plantingArea.locationHistoryId,
				workspaceContext.id,
				newData,
				workspaceContext.timelineSelection.focusUtc
			);
		},
		TRIPLIT_UPDATE_DEFAULT_INTERVAL,
		{
			onStart: workspaceContext.timelineSelection.disable,
			onEnd: workspaceContext.timelineSelection.enable
		}
	);

	const transformMutationHandler = createMutationHandler(geometryUpdate);
	const transformChangeHandler = createChangeHandler(
		(newData: DeepPartial<Geometry>) => {
			if (!plantingArea) {
				return;
			}

			transformMutationHandler.execute(plantingArea.geometryId, newData);
		},
		TRIPLIT_UPDATE_DEFAULT_INTERVAL,
		{
			onStart: workspaceContext.timelineSelection.disable,
			onEnd: workspaceContext.timelineSelection.enable
		}
	);

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
		workspaceContext.editing && !toolbox.isToolActive('addPlantingArea')
	);

	/** Selected if included in the list of selected IDs. */
	let selected: boolean = $derived(
		workspaceContext.selectedPlantingAreaIds.has(plantingAreaId)
	);

	/** Update the change handler on translation. */
	function onTranslate(newPos: Vector2d, movementOver: boolean) {
		translateChangeHandler.change(movementOver, {
			x: canvasContext.transform.modelXPos(newPos.x),
			y: canvasContext.transform.modelYPos(newPos.y)
		});
	}

	/** Update the change handler on transformation. */
	function onTransform(newGeometry: DeepPartial<Geometry>, transformOver: boolean) {
		transformChangeHandler.change(transformOver, newGeometry);
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
		grid={plantingArea.grid}
		{editable}
		{selected}
		{onTranslate}
		{onTransform}
		onClick={() => {
			if (toolbox.isToolActive('addPlantingArea')) {
				return;
			}
			workspaceContext.selectPlantingArea(plantingAreaId);
		}}
	/>
{/if}
