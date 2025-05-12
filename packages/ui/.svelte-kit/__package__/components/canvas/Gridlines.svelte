<script lang="ts">
	import { getContext } from 'svelte';

	import type { CanvasContext } from './state/context.svelte';

	/** Props. */
	type Props = {
		canvasId: string;
	};
	let { canvasId }: Props = $props();

	let canvas = getContext<CanvasContext>(canvasId);

	canvas.gridManager.initialize();
</script>
