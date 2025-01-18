<script lang="ts">
	import PlantingArea from '$components/canvas/workspace/PlantingArea.svelte';
	import { getWorkspaceContext } from '../activeWorkspace.svelte';
	import type { Vector2d } from 'konva/lib/types';
	import type { Geometry } from '@vdt-webapp/common';

	type Props = {
		plantingAreaLayerId: string;
	};
	let { plantingAreaLayerId }: Props = $props();

	const workspaceContext = getWorkspaceContext();
	const canvas = workspaceContext.layoutCanvasContext;
	const { form: formData } = workspaceContext.plantingAreaCreateForm.form;

	function onTranslate(newPos: Vector2d) {
		$formData.location.coordinate = {
			x: canvas.transform.modelXPos(newPos.x),
			y: canvas.transform.modelYPos(newPos.y)
		};
	}
</script>

<!--
@component
Renders a planting area in the canvas representing the
planting area creation form.

Should only render this component if the planting area
creation tool is active.

Note the yucky typecasting: PlantingArea does not need
some attributes of the LinesAttributes but I don't know
of an easy way to ignore them.
-->
<PlantingArea
	canvasId={canvas.canvasId}
	{plantingAreaLayerId}
	position={$formData.location.coordinate}
	geometry={$formData.geometry as unknown as Geometry}
	grid={$formData.grid}
	editable={true}
	selected={true}
	{onTranslate}
/>
