<script lang="ts">
	import { Canvas, Gridlines, PlantingAreas, TransformControls } from '@vdg-webapp/ui';

	import { getWorkspaceContext } from '../activeWorkspace.svelte';
	import toolbox from '../tools';
	import CreatePlantingAreaContainer from './CreatePlantingAreaContainer.svelte';
	import EditablePlantingAreaContainer from './EditablePlantingAreaContainer.svelte';

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
	<TransformControls {canvasId} />
{/snippet}

<Canvas {canvasId} {overlay}>
	<Gridlines {canvasId} />

	<PlantingAreas {canvasId} {plantingAreaLayerId}>
		{#if toolbox.isToolActive('plantingAreaCreate')}
			<CreatePlantingAreaContainer {plantingAreaLayerId} />
		{/if}

		{#each plantingAreaIds as plantingAreaId}
			<EditablePlantingAreaContainer {plantingAreaId} {plantingAreaLayerId} />
		{/each}
	</PlantingAreas>
</Canvas>
