<script lang="ts">
	import * as Canvas from '$components/canvas/';

	const canvasId = 'workspace';
</script>

{#snippet overlay()}
	<Canvas.TransformControls {canvasId} />
{/snippet}

<Canvas.Root {canvasId} {overlay}>
	<Canvas.Gridlines {canvasId} />
</Canvas.Root>
