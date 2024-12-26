<script lang="ts">
	import Konva from 'konva';
	import { getContext } from 'svelte';
	import type { CanvasContext } from '../state';
	import { onMount } from 'svelte';
	import PlantingArea from './PlantingArea.svelte';

	/** Props. */
	type Props = {
		canvasId: string;
	};
	let { canvasId }: Props = $props();

	let canvas = getContext<CanvasContext>(canvasId);

	const layer = canvas.container.addLayer('plantingAreas');

	onMount(() => {});
</script>

<PlantingArea {canvasId} />
