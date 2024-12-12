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
	};
	let { canvasId, children }: Props = $props();

	/** Create the context. */
	const canvas = createCanvasContext(canvasId);
	setContext<CanvasContext>(canvasId, canvas);

	let containerRef: HTMLDivElement;
	onMount(() => {
		canvas.container.initialize();

		const resizeObserver = new ResizeObserver(canvas.container.onResize);
		resizeObserver.observe(containerRef);

		return () => {
			resizeObserver.unobserve(containerRef);
			resizeObserver.disconnect();
		};
	});
</script>

<div
	id={canvasId}
	bind:this={containerRef}
	bind:clientWidth={canvas.container.width}
	bind:clientHeight={canvas.container.height}
	class="h-full w-full"
>
	{#if canvas.container.initialized}
		{@render children()}
	{/if}
</div>
