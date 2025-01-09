<script lang="ts">
	import PlantingArea from '$components/canvas/workspace/PlantingArea.svelte';
	import type { CanvasContext } from '$components/canvas';
	import { getContext } from 'svelte';
	import { plantingAreaQuery } from '$data/workspaces/queries';
	import type { Vector2d } from 'konva/lib/types';
	import { historySelect, type Geometry } from '@vdt-webapp/common';
	import triplit from '$data/triplit';
	import { useQuery } from '@triplit/svelte';
	import { type DateValue, getLocalTimeZone } from '@internationalized/date';

	type Props = {
		canvasId: string;
		plantingAreaLayerId: string;
		plantingAreaId: string;
		currentDate: DateValue;
		editable: boolean;
		selected: boolean;
		onClick?: () => void;
	};
	let {
		canvasId,
		plantingAreaLayerId,
		plantingAreaId,
		currentDate,
		editable,
		selected,
		onClick
	}: Props = $props();

	const canvas = getContext<CanvasContext>(canvasId);
	const query = useQuery(triplit, plantingAreaQuery.vars({ plantingAreaId }));

	$inspect(query);

	let plantingArea = $derived.by(() => {
		if (query.results && query.results[0]) {
			return query.results[0];
		} else {
			return null;
		}
	});

	let position: Vector2d | null = $derived.by(() => {
		if (plantingArea && plantingArea.locationHistory) {
			console.log(plantingArea.locationHistory);
			const location = historySelect(
				plantingArea.locationHistory?.locations,
				currentDate.toDate(getLocalTimeZone())
			);
			console.log(location);
			console.log(canvas.workspaceId);
			if (location && location.workspaceId === canvas.workspaceId) {
				console.log(location);
				return { x: location.x, y: location.y };
			} else {
				console.log('failed1');
				return null;
			}
		} else {
			console.log('failed2');
			return null;
		}
	});

	function onTranslate(newPos: Vector2d, movementOver: boolean) {}
</script>

<!--
@component
Renders a planting area in the canvas for a planting
area in the workspace editor, ie., editable
-->
{#if query.results && query.results[0].geometry}
	<PlantingArea
		{canvasId}
		{plantingAreaLayerId}
		{position}
		geometry={query.results[0].geometry}
		grid={query.results[0].grid}
		{editable}
		{selected}
		{onTranslate}
		{onClick}
	/>
{/if}
