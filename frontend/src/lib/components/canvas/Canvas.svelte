<script lang="ts">
	import { onMount } from 'svelte';
	import Konva from 'konva';

	let stageRef: HTMLDivElement;
	let stage: Konva.Stage | null = null;
	let containerWidth = $state(0);
	let containerHeight = $state(0);

	onMount(() => {
		stage = new Konva.Stage({
			container: stageRef,
			width: containerWidth,
			height: containerHeight
		});
		const layer = new Konva.Layer();
		stage.add(layer);
		// Add rectangle in bottom right
		const rect = new Konva.Rect({
			fill: 'green',
			x: 0,
			y: 0,
			width: stage.width(),
			height: stage.height()
		});
		layer.add(rect);

		const resizeObserver = new ResizeObserver(function () {
			console.log(containerWidth);
			console.log(containerHeight);
			layer.batchDraw();
			stage?.width(containerWidth);
			stage?.height(containerHeight);
			rect.width(stage?.width());
			rect.height(stage?.height());
		});
		resizeObserver.observe(stageRef);

		return () => resizeObserver.unobserve(stageRef);
	});
</script>

<div
	bind:this={stageRef}
	bind:clientWidth={containerWidth}
	bind:clientHeight={containerHeight}
	class="h-full w-full"
></div>
