<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { CanvasContext } from './state/context.svelte';
	import { getColor } from '$lib/utils';
	import Konva from 'konva';
	import { mode } from 'mode-watcher';
	/** Props. */
	type Props = {
		canvasId: string;
	};
	let { canvasId }: Props = $props();

	let canvas = getContext<CanvasContext>(canvasId);

	canvas.grid.initialize();
</script>
