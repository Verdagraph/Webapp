<script lang="ts">
	import * as Canvas from '$components/canvas/';

	type Props = {
		canvasId: string;
	};
	let { canvasId }: Props = $props();
</script>

{#snippet overlay()}
	<Canvas.TransformControls {canvasId} />
{/snippet}

<Canvas.Root initializeContext={false} {canvasId} {overlay}>
	<Canvas.Gridlines {canvasId} />

	<Canvas.Workspace.PlantingAreas {canvasId} />
</Canvas.Root>
