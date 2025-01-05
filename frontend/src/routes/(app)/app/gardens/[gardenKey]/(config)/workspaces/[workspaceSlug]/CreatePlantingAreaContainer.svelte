<script lang="ts">
	import PlantingArea from '$components/canvas/workspace/PlantingArea.svelte';
	import type { CanvasContext } from '$components/canvas';
	import { getContext } from 'svelte';
	import { workspaceContextId, type WorkspaceContext } from '../activeWorkspace.svelte';
	import type { Vector2d } from 'konva/lib/types';
	import type { Geometry } from '@vdt-webapp/common';

	type Props = {
		canvasId: string;
		plantingAreaLayerId: string;
	};
	let { canvasId, plantingAreaLayerId }: Props = $props();

	const canvas = getContext<CanvasContext>(canvasId);
	const workspaceContext = getContext<WorkspaceContext>(workspaceContextId);

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
	{canvasId}
	{plantingAreaLayerId}
	position={$formData.location.coordinate}
	geometry={$formData.geometry as unknown as Geometry}
	grid={$formData.grid}
	editable={true}
	{onTranslate}
/>
