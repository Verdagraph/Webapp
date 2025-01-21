<script lang="ts">
	import PlantingArea from '$components/canvas/workspace/PlantingArea.svelte';
	import { plantingAreaQuery } from '$data/workspaces/queries';
	import type { Vector2d } from 'konva/lib/types';
	import { historySelect } from '@vdt-webapp/common';
	import triplit from '$data/triplit';
	import { useQuery } from '@triplit/svelte';
	import { getWorkspaceContext } from '../activeWorkspace.svelte';
	import toolbox from '../tools';

	type Props = {
		plantingAreaLayerId: string;
		plantingAreaId: string;
	};
	let { plantingAreaLayerId, plantingAreaId }: Props = $props();

	const workspaceContext = getWorkspaceContext();
	const canvasContext = workspaceContext.layoutCanvasContext;
	const canvasId = canvasContext.canvasId;
	const query = useQuery(triplit, plantingAreaQuery.vars({ plantingAreaId }));

	let plantingArea = $derived.by(() => {
		if (query.results && query.results[0]) {
			return query.results[0];
		} else {
			return null;
		}
	});

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

	let editable: boolean = $derived(
		workspaceContext.editing && !toolbox.isToolActive('addPlantingArea')
	);
	let selected: boolean = $derived(
		workspaceContext.selectedPlantingAreaIds.has(plantingAreaId)
	);

	function onTranslate(newPos: Vector2d, movementOver: boolean) {}

	console.log(plantingAreaId);
	$effect(() => {
		if (query.results && query.results[0].id === 'E8eHBz92YSlg3sSG2ulRa') {
			console.log(query.results[0]);
		}
	});
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
		{position}
		geometry={plantingArea.geometry}
		grid={plantingArea.grid}
		{editable}
		{selected}
		{onTranslate}
		onClick={() => {
			workspaceContext.selectPlantingArea(plantingAreaId);
		}}
	/>
{/if}
