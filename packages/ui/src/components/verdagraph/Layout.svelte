<script lang="ts">
	import {
		Canvas,
		Gridlines,
		PlantingAreas,
		PlantsContainer,
		StaticPlantingAreaContainer,
		TransformControls
	} from '$components';
	import { type ResolvedPlant } from '$state/application/plantsContext.svelte';
	import { type ResolvedPlantingArea } from '$state/application/workspacesContext.svelte';

	import CreatePlantsContainer from './CreatePlantsContainer.svelte';
	import EditablePlantContainer from './EditablePlantContainer.svelte';
	import { getVerdagraphContext } from './verdagraphContext.svelte';

	const verdagraphContext = getVerdagraphContext();

	type Props = {
		plantingAreas: ResolvedPlantingArea[];
		plants: ResolvedPlant[];
		workspaceId: string;
	};
	let { plantingAreas, plants, workspaceId }: Props = $props();

	const canvasContext = verdagraphContext.layoutCanvasContext;
	const canvasId = canvasContext.canvasId;
	const plantingAreaLayerId = 'plantingAreas';
	const plantLayerId = 'plants';
</script>

{#snippet overlay()}
	<TransformControls {canvasId} />
{/snippet}

<Canvas {canvasId} {overlay}>
	<Gridlines {canvasId} />

	<PlantingAreas {canvasId} {plantingAreaLayerId}>
		{#each plantingAreas as plantingArea}
			<StaticPlantingAreaContainer
				{plantingArea}
				canvasContext={verdagraphContext.layoutCanvasContext}
				timelineSelection={verdagraphContext.timeline}
			/>
		{/each}
	</PlantingAreas>

	<PlantsContainer {canvasId} {plantLayerId}>
		{#each plants as plant}
			<EditablePlantContainer {plant} />
		{/each}

		<!--
			Rendered last (SVG has no z-index - later elements paint on top and
			win pointer hit-testing) so the live stamp preview stays draggable
			even when it starts perfectly overlapping the plant just committed
			from the previous stamp.
		-->
		<CreatePlantsContainer {workspaceId}></CreatePlantsContainer>
	</PlantsContainer>
</Canvas>
