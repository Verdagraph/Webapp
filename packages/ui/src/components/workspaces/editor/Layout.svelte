<script lang="ts">
	import { Canvas, Gridlines, PlantingAreas, TransformControls } from '$components';
	import { type ResolvedPlantingArea } from '$state/application/workspacesContext.svelte';

	import CreatePlantingAreaContainer from './CreatePlantingAreaContainer.svelte';
	import EditablePlantingAreaContainer from './EditablePlantingAreaContainer.svelte';
	import { getWorkspaceEditorContext } from './workspaceEditorContext.svelte';

	type Props = {
		plantingAreas: ResolvedPlantingArea[];
	};
	let { plantingAreas }: Props = $props();

	const worskpaceEditor = getWorkspaceEditorContext();
	const canvasContext = worskpaceEditor.layoutCanvasContext;
	const canvasId = canvasContext.canvasId;
	const plantingAreaLayerId = 'plantingAreas';
</script>

{#snippet overlay()}
	<TransformControls {canvasId} />
{/snippet}

<Canvas {canvasId} {overlay}>
	<Gridlines {canvasId} />

	<PlantingAreas {canvasId} {plantingAreaLayerId}>
		{#if worskpaceEditor.toolbox.isToolActive('plantingAreaCreate')}
			<CreatePlantingAreaContainer />
		{/if}

		{#each plantingAreas as plantingArea}
			<EditablePlantingAreaContainer {plantingArea} />
		{/each}
	</PlantingAreas>
</Canvas>
