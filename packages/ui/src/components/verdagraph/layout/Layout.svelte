<script lang="ts">
	import {
		Canvas,
		Gridlines,
		PlantingAreas,
		StaticPlantingAreaContainer,
		TransformControls
	} from '$components';

	import { toolbox } from '../tools';
	import { getVerdagraphContext } from '../verdagraphContext.svelte';

	const verdagraphContext = getVerdagraphContext();

	type Props = {
		plantingAreaIds: string[];
	};
	let { plantingAreaIds }: Props = $props();

	const canvasContext = verdagraphContext.layoutCanvasContext;
	const canvasId = canvasContext.canvasId;
	const plantingAreaLayerId = 'plantingAreas';
</script>

{#snippet overlay()}
	<TransformControls {canvasId} />
{/snippet}

<Canvas {canvasId} {overlay}>
	<Gridlines {canvasId} />

	<PlantingAreas {canvasId} {plantingAreaLayerId}></PlantingAreas>
</Canvas>
