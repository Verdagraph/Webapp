<script lang="ts">
	import type { Geometry, GeometryUpdateCommand, Position } from '@vdg-webapp/models';

	import { PlantingArea, getWorkspaceEditorContext } from '$components';

	/** Contexts.*/
	const workspaceEditor = getWorkspaceEditorContext();
	const canvas = workspaceEditor.layoutCanvasContext;
	const form = workspaceEditor.plantingAreaCreateForm.form;

	function onTranslate(newPos: Position) {
		form.data.location.coordinate = {
			x: canvas.transform.modelXPos(newPos.x),
			y: canvas.transform.modelYPos(newPos.y)
		};
	}

	function onTransform(newGeometry: GeometryUpdateCommand) {
		if (newGeometry.rectangleLength) {
			form.data.geometry.rectangleLength = newGeometry.rectangleLength;
		}
		if (newGeometry.rectangleWidth) {
			form.data.geometry.rectangleWidth = newGeometry.rectangleWidth;
		}
		if (newGeometry.polygonNumSides) {
			form.data.geometry.polygonNumSides = newGeometry.polygonNumSides;
		}
		if (newGeometry.polygonRadius) {
			form.data.geometry.polygonRadius = newGeometry.polygonRadius;
		}
		if (newGeometry.ellipseLength) {
			form.data.geometry.ellipseLength = newGeometry.ellipseLength;
		}
		if (newGeometry.ellipseWidth) {
			form.data.geometry.ellipseWidth = newGeometry.ellipseWidth;
		}

		if (newGeometry.linesCoordinates) {
			form.data.geometry.linesCoordinates = newGeometry.linesCoordinates;
		}
	}
</script>

<!--
@component
Renders a planting area in the canvas representing the
planting area creation form.

Should only render this component if the planting area
creation tool is active.
-->
<PlantingArea
	canvasId={canvas.canvasId}
	name={form.data.name}
	showName={true}
	position={form.data.location.coordinate}
	geometry={form.data.geometry as Geometry}
	editable={true}
	selected={true}
	{onTranslate}
	{onTransform}
/>
