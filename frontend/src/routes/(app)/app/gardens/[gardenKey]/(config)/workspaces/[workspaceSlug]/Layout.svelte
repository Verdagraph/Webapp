<script lang="ts">
	import * as Canvas from '$components/canvas/';
	import CreatePlantingAreaContainer from './CreatePlantingAreaContainer.svelte';
	import PlantingAreas from '$components/canvas/workspace/PlantingAreas.svelte';
	import toolbox from '../tools';
	import { getContext } from 'svelte';

	type Props = {
		canvasId: string;
	};
	let { canvasId }: Props = $props();

	const plantingAreaLayerId = 'plantingAreas';

	const canvas = getContext<Canvas.CanvasContext>(canvasId);
</script>

{#snippet overlay()}
	<Canvas.TransformControls {canvasId} />
{/snippet}

<Canvas.Root initializeContext={false} {canvasId} {overlay}>
	<Canvas.Gridlines {canvasId} />

	<PlantingAreas {canvasId} {plantingAreaLayerId}>
		{#if toolbox.isToolActive('addPlantingArea')}
			<CreatePlantingAreaContainer {canvasId} {plantingAreaLayerId} />
		{/if}
	</PlantingAreas>
</Canvas.Root>
