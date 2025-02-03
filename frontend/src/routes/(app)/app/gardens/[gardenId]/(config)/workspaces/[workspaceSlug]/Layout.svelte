<script lang="ts">
	import { useQuery } from '@triplit/svelte';
	import * as Canvas from '$components/canvas/';
	import EditablePlantingAreaContainer from './EditablePlantingAreaContainer.svelte';
	import CreatePlantingAreaContainer from './CreatePlantingAreaContainer.svelte';
	import PlantingAreas from '$components/canvas/workspace/PlantingAreas.svelte';
	import toolbox from '../tools';
	import { plantingAreaIdsQuery } from '$data/workspaces/queries';
	import triplit from '$data/triplit';
	import { getWorkspaceContext } from '../activeWorkspace.svelte';

	const workspaceContext = getWorkspaceContext();
	const canvasContext = workspaceContext.layoutCanvasContext;
	const canvasId = canvasContext.canvasId;
	const plantingAreaLayerId = 'plantingAreas';

	const plantingAreaIds = useQuery(
		triplit,
		plantingAreaIdsQuery.vars({ workspaceId: workspaceContext.id })
	);

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

		{#if plantingAreaIds.results}
			{#each plantingAreaIds.results as { id: plantingAreaId }}
				<EditablePlantingAreaContainer {plantingAreaId} {plantingAreaLayerId} />
			{/each}
		{/if}
	</PlantingAreas>
</Canvas.Root>
