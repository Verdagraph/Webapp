<script lang="ts">
	import { useQuery } from '@triplit/svelte';
	import * as Canvas from '$components/canvas/';
	import EditablePlantingAreaContainer from '$components/canvas/workspace/EditablePlantingAreaContainer.svelte';
	import CreatePlantingAreaContainer from './CreatePlantingAreaContainer.svelte';
	import PlantingAreas from '$components/canvas/workspace/PlantingAreas.svelte';
	import toolbox from '../tools';
	import { plantingAreaIdsQuery } from '$data/workspaces/queries';
	import triplit from '$data/triplit';
	import { getWorkspaceContext } from '../activeWorkspace.svelte';
	import { ZonedDateTime } from '@internationalized/date';

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
		{#if toolbox.isToolActive('addPlantingArea')}
			<CreatePlantingAreaContainer {plantingAreaLayerId} />
		{/if}

		{#if plantingAreaIds.results}
			{#each plantingAreaIds.results as { id: plantingAreaId }}
				<EditablePlantingAreaContainer
					{canvasId}
					{plantingAreaId}
					{plantingAreaLayerId}
					currentDate={new ZonedDateTime(
						2015,
						2,
						3,
						'America/Los_Angeles',
						-28800000,
						12,
						24,
						45
					)}
					editable={workspaceContext.editing}
					selected={workspaceContext.isPlantingAreaSelected(plantingAreaId)}
					onClick={() => {
						workspaceContext.selectPlantingArea(plantingAreaId);
					}}
				/>
			{/each}
		{/if}
	</PlantingAreas>
</Canvas.Root>
