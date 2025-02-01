<script lang="ts">
	import PlantingArea from '$components/canvas/workspace/PlantingArea.svelte';
	import { getWorkspaceContext } from '../activeWorkspace.svelte';
	import type { Vector2d } from 'konva/lib/types';
	import type { Geometry, GeometryPartial } from '@vdt-webapp/common';

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

	function onTransform(newGeometry: GeometryPartial, transformOver: boolean) {
		if (newGeometry.rectangleAttributes) {
			if (newGeometry.rectangleAttributes.length) {
				$formData.geometry.rectangleAttributes.length =
					newGeometry.rectangleAttributes.length;
			}
			if (newGeometry.rectangleAttributes.width) {
				$formData.geometry.rectangleAttributes.width =
					newGeometry.rectangleAttributes.width;
			}
		}
		if (newGeometry.polygonAttributes) {
			if (newGeometry.polygonAttributes.numSides) {
				$formData.geometry.polygonAttributes.numSides =
					newGeometry.polygonAttributes.numSides;
			}
			if (newGeometry.polygonAttributes.radius) {
				$formData.geometry.polygonAttributes.radius =
					newGeometry.polygonAttributes.radius;
			}
		}
		if (newGeometry.ellipseAttributes) {
			if (newGeometry.ellipseAttributes.lengthDiameter) {
				$formData.geometry.ellipseAttributes.lengthDiameter =
					newGeometry.ellipseAttributes.lengthDiameter;
			}
			if (newGeometry.ellipseAttributes.widthDiameter) {
				$formData.geometry.ellipseAttributes.widthDiameter =
					newGeometry.ellipseAttributes.widthDiameter;
			}
		}
		if (newGeometry.linesAttributes) {
			if (newGeometry.linesAttributes.coordinates) {
				// @ts-expect-error - the types on the newGeometry object is too broad
				$formData.geometry.linesAttributes.coordinates =
					newGeometry.linesAttributes.coordinates;
			}
		}
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
	name={$formData.name}
	showName={true}
	position={$formData.location.coordinate}
	geometry={$formData.geometry as unknown as Geometry}
	grid={$formData.grid}
	editable={true}
	selected={true}
	{onTranslate}
	{onTransform}
/>
