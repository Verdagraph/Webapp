<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import { getColor } from '$lib/utils';
	import { mode } from 'mode-watcher';
	import createCanvasContext, { type CanvasContext } from './context.svelte';

	/** Props. */
	type Props = {
		canvasId: string;
		children: Snippet<[]>;
	};
	let { canvasId, children }: Props = $props();

	/** Create the context. */
	const canvas = createCanvasContext(canvasId, getColor('neutral', 1, $mode));
	setContext<CanvasContext>(canvasId, canvas);

	let containerRef: HTMLDivElement;
	onMount(() => {
		canvas.initializeCanvas();

		const resizeObserver = new ResizeObserver(canvas.onResize);
		resizeObserver.observe(containerRef);

		return () => resizeObserver.unobserve(containerRef);
	});
</script>

<div
	id={canvasId}
	bind:this={containerRef}
	bind:clientWidth={canvas.reactive.containerWidth}
	bind:clientHeight={canvas.reactive.containerHeight}
	class="h-full w-full"
>
	{#if canvas.reactive.initialized}
		{@render children()}
	{/if}
</div>
