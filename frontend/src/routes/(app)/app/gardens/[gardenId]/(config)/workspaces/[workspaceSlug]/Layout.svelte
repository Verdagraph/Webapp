<script lang="ts">
	import * as Canvas from '$components/canvas/';
	import EditablePlantingAreaContainer from './EditablePlantingAreaContainer.svelte';
	import CreatePlantingAreaContainer from './CreatePlantingAreaContainer.svelte';
	import PlantingAreas from '$components/canvas/workspace/PlantingAreas.svelte';
	import toolbox from '../tools';
	import { getWorkspaceContext } from '../activeWorkspace.svelte';

	type Props = {
		plantingAreaIds: string[];
	};
	let { plantingAreaIds }: Props = $props();

	const workspaceContext = getWorkspaceContext();
	const canvasContext = workspaceContext.layoutCanvasContext;
	const canvasId = canvasContext.canvasId;
	const plantingAreaLayerId = 'plantingAreas';

	/**
	 * TODO: Remove editable status if the planting area create form is active
	 */
</script>

{#snippet overlay()}
	<Canvas.TransformControls {canvasId} />
{/snippet}

<Canvas.Root {canvasId} {overlay}>
	<Canvas.Gridlines {canvasId} />

	<PlantingAreas {canvasId} {plantingAreaLayerId}>
		{#if toolbox.isToolActive('plantingAreaCreate')}
			<CreatePlantingAreaContainer {plantingAreaLayerId} />
		{/if}

		{#each plantingAreaIds as plantingAreaId}
			<EditablePlantingAreaContainer {plantingAreaId} {plantingAreaLayerId} />
		{/each}
	</PlantingAreas>
</Canvas.Root>
