<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import { getColor } from '$lib/utils';
	import { mode } from 'mode-watcher';
	import { createCanvasContext, type CanvasContext } from './state';

	/** Props. */
	type Props = {
		canvasId: string;
		children: Snippet<[]>;
		overlay: Snippet<[]>;
	};
	let { canvasId, children, overlay }: Props = $props();

	/** Create the context. */
	const canvas = createCanvasContext(canvasId);
	setContext<CanvasContext>(canvasId, canvas);

	let containerRef: HTMLDivElement;
	onMount(() => {
		canvas.initialize();

		const resizeObserver = new ResizeObserver(canvas.container.onResize);
		resizeObserver.observe(containerRef);

		return () => {
			resizeObserver.unobserve(containerRef);
			resizeObserver.disconnect();
		};
	});
</script>

<div
	bind:clientWidth={canvas.container.width}
	bind:clientHeight={canvas.container.height}
	class="relative h-full w-full"
>
	<div class="absolute z-50 h-full w-full">
		{@render overlay()}
	</div>

	<div id={canvasId} bind:this={containerRef}>
		{#if canvas.container.initialized}
			{@render children()}
		{/if}
	</div>
</div>
