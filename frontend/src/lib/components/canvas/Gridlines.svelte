<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { CanvasContext } from './context.svelte';
	import Konva from 'konva';
	/** Props. */
	type Props = {
		canvasId: string;
	};
	let { canvasId }: Props = $props();

	let canvas = getContext<CanvasContext>(canvasId);

	let rect = new Konva.Rect({ x: 0, y: 0, width: 500, height: 500, fill: 'white' });

	console.log('retrieving');
	const backgroundLayer = canvas.getLayer('background');
	if (backgroundLayer) {
		console.log('adding');
		console.log(backgroundLayer);
		backgroundLayer.add(rect);
	}
</script>
