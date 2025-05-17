<script lang="ts">
	import type { Vector2d } from 'konva/lib/types';
	import { mode } from 'mode-watcher';
	import { setContext } from 'svelte';

	import type { Geometry, GeometryType } from '@vdg-webapp/models';
	import {
		Canvas,
		Gridlines,
		PlantingArea,
		PlantingAreas,
		createCanvasContext
	} from '@vdg-webapp/ui';

	const canvas = createCanvasContext(
		'workspaceGeometryCanvasId',
		'none',
		mode,
		false,
		false
	);
	const canvasId = canvas.canvasId;
	setContext(canvasId, canvas);
	canvas.container.pixelsPerMeter = 1;

	/**
	 * Adjust the canvas's scaling to fit the current size and so that it is 1 meter wide.
	 */
	/**
	 * 
	 function autoScaleCanvas () {
		canvas.container.pixelsPerMeter = canvas.container.width
	}
	canvas.container.addResizeFunction(autoScaleCanvas)
	*/

	const plantingAreaLayerId = 'plantingAreas';

	function defaultGeometry(type: GeometryType) {
		return {
			type: type,
			rectangleLength: 200,
			rectangleWidth: 200,
			ellipseWidth: 200,
			ellipseLength: 200,
			polygonRadius: 29,
			polygonNumSides: 3,
			rotation: 45,
			scaleFactor: 1,
			linesClosed: true,
			linesCoordinates: [
				{ x: 0.1, y: 0.01 },
				{ x: -0.25, y: 0.05 },
				{ x: 0, y: -0.14 }
			]
		};
	}

	type Example = {
		position: Vector2d;
		geometry: Omit<Geometry, 'id' | 'gardenId' | 'linesCoordinateIds' | 'date'>;
	};
	const examples: Example[] = [
		{
			position: { x: 30, y: 20 },
			geometry: defaultGeometry('RECTANGLE')
		},
		{
			position: { x: 0.8, y: 0.3 },
			geometry: defaultGeometry('ELLIPSE')
		},
		{
			position: { x: 0.5, y: 0.3 },
			geometry: defaultGeometry('LINES')
		}
	];

	/**
	 * TODO: Remove editable status if the planting area create form is active
	 */
</script>

{#snippet overlay()}
	<!--
	<TransformControls {canvasId} />
-->
{/snippet}

<Canvas {canvasId} {overlay}>
	<!--
		<Gridlines {canvasId} />
	-->

	<PlantingAreas {canvasId} {plantingAreaLayerId}>
		{#each examples as example}
			<PlantingArea
				{canvasId}
				{plantingAreaLayerId}
				name="none"
				showName={false}
				position={example.position}
				geometry={example.geometry}
				editable={false}
				selected={false}
			></PlantingArea>
		{/each}
	</PlantingAreas>
</Canvas>
