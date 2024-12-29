<script lang="ts">
	import Konva from 'konva';
	import { getContext } from 'svelte';
	import type { CanvasContext } from '../state';
	import { onMount } from 'svelte';
	import PlantingArea from './PlantingArea.svelte';
	import { GeometryTypeEnum } from '@vdt-webapp/common';
	import { ZonedDateTime } from '@internationalized/date';

	/** Props. */
	type Props = {
		canvasId: string;
	};
	let { canvasId }: Props = $props();

	let canvas = getContext<CanvasContext>(canvasId);

	const layer = canvas.container.addLayer('plantingAreas');

	const plantingArea = {
		grid: {
			numRows: 4,
			numColumns: 5
		},
		locationHistory: {
			locations: new Set([
				{
					date: new Date(),
					coordinate: {
						id: 'aaresont',
						gardenId: 'arenstoeirasnt',
						x: 10,
						y: 8,
						z: null
					}
				}
			])
		},
		geometry: {
			id: 'arsenitoa',
			gardenId: 'earstoen',
			type: GeometryTypeEnum[0],
			date: new Date(),
			scaleFactor: 1,
			rotation: 0,
			rectangleAttributes: {
				length: 5,
				width: 6
			},
			polygonAttributes: {
				numSides: 5,
				radius: 3
			},
			ellipseAttributes: {
				lengthDiameter: 3,
				widthDiameter: 3
			},
			linesAttributes: {
				coordinateIds: new Set(['aersnto', 'arestn']),
				coordinates: [
					{ x: 0, y: 0 },
					{ x: 2, y: 2 },
					{ x: 18, y: 42 }
				],
				closed: true
			}
		},
		movable: false
	};
</script>

<PlantingArea
	{canvasId}
	currentDate={new ZonedDateTime(
		// Date
		2025,
		2,
		3,
		// Time zone and UTC offset
		'America/Los_Angeles',
		-28800000,
		// Time
		9,
		15,
		0
	)}
	grid={plantingArea.grid}
	movable={true}
	locationHistory={plantingArea.locationHistory}
	geometry={plantingArea.geometry}
/>
