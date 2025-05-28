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
	canvas.container.pixelsPerMeter = 1;
	const canvasId = canvas.canvasId;
	setContext(canvasId, canvas);

	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;

	canvas.container.addResizeFunction(() => {
		canvas.transform.position = {
			x: canvas.container.width / 2,
			y: canvas.container.height / 2
		};

		canvas.container.stage?.getChildren().forEach((layer) => {
			layer.getChildren().forEach((shape) => {
				const rect = shape.getClientRect();

				// Calculate corners of the bounding box
				const corners = [
					{ x: rect.x, y: rect.y }, // Top-left
					{ x: rect.x + rect.width, y: rect.y }, // Top-right
					{ x: rect.x, y: rect.y + rect.height }, // Bottom-left
					{ x: rect.x + rect.width, y: rect.y + rect.height } // Bottom-right
				];

				// Update min and max coordinates
				corners.forEach((corner) => {
					if (corner.x < minX) minX = corner.x;
					if (corner.y < minY) minY = corner.y;
					if (corner.x > maxX) maxX = corner.x;
					if (corner.y > maxY) maxY = corner.y;
				});
			});
		});

		const totalWidth = maxX - minX;
		const totalHeight = maxY - minY;

		canvas.transform.scaleFactor = {
			x: canvas.container.width / totalWidth - 0.3,
			y: canvas.container.width / totalWidth - 0.3
		};
	});

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
			rectangleLength: 100,
			rectangleWidth: 180,
			ellipseWidth: 100,
			ellipseLength: 180,
			polygonRadius: 29,
			polygonNumSides: 3,
			rotation: 0,
			scaleFactor: 1,
			linesClosed: true,
			linesCoordinates: [
				{ x: 280, y: 0 },
				{ x: 180, y: 0 },
				{ x: 180, y: -100 },
				{ x: -270, y: -100 },
				{ x: -270, y: -160 },
				{ x: 280, y: -160 }
			]
		};
	}

	type Example = {
		name: string;
		position: Vector2d;
		geometry: Omit<Geometry, 'id' | 'gardenId' | 'linesCoordinateIds' | 'date'>;
		labelTranslate?: Vector2d;
	};
	const examples: Example[] = [
		{
			name: 'Garden Bed 1',
			position: { x: -220, y: 50 },
			/** @ts-expect-error We don't need more than {x: , y: }*/
			geometry: defaultGeometry('RECTANGLE')
		},
		{
			name: 'Garden Bed 2',
			position: { x: -50, y: 50 },
			/** @ts-expect-error We don't need more than {x: , y: }*/
			geometry: defaultGeometry('RECTANGLE')
		},
		{
			name: 'Garden Bed 3',
			position: { x: 200, y: 100 },
			/** @ts-expect-error We don't need more than {x: , y: }*/
			geometry: defaultGeometry('ELLIPSE')
		},
		{
			name: 'Garden Bed 4',
			position: { x: 0.5, y: 0.3 },
			/** @ts-expect-error We don't need more than {x: , y: }*/
			geometry: defaultGeometry('LINES'),
			labelTranslate: { x: 0, y: -100 }
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
				name={example.name}
				showName={true}
				position={example.position}
				geometry={example.geometry}
				editable={false}
				selected={false}
				labelTranslate={example.labelTranslate}
			></PlantingArea>
		{/each}
	</PlantingAreas>
</Canvas>
