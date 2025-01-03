<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { setContext, getContext } from 'svelte';
	import { createCanvasContext, type CanvasContext } from './state';

	/** Props. */
	type Props = {
		/**
		 * If true, the context must be initialized outside of this component.
		 */
		initializeContext: boolean;
		canvasId: string;
		canvasWorkspaceId: string;

		children: Snippet<[]>;
		overlay: Snippet<[]>;
	};
	let {
		initializeContext = false,
		canvasId,
		canvasWorkspaceId,
		children,
		overlay
	}: Props = $props();

	/** Create or retrieve the context. */
	let canvas: CanvasContext;
	if (initializeContext) {
		canvas = createCanvasContext(canvasId, canvasWorkspaceId);
		setContext<CanvasContext>(canvasId, canvas);
	} else {
		canvas = getContext<CanvasContext>(canvasId);
	}

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
	<div
		id={canvasId}
		bind:this={containerRef}
		class="absolute left-[0.5px] top-0 h-full w-full"
	>
		{#if canvas.container.initialized}
			{@render children()}
		{/if}
	</div>
	<div class="pointer-events-none absolute left-[0.5px] top-0 z-10 h-full w-full">
		{@render overlay()}
	</div>
</div>
