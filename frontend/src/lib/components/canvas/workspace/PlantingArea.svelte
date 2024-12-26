<script lang="ts">
	import Konva from 'konva';
	import { getShape } from '../utils';
	import { getContext } from 'svelte';
	import type { CanvasContext } from '../state';
	import { plantingAreaLayerId } from './consts';
	import { getColor } from '$lib/utils';
	import mode from '$state/theme.svelte';
	import { GeometryTypeEnum } from '@vdt-webapp/common';

	/** Props. */
	type Props = {
		canvasId: string;
	};
	let { canvasId }: Props = $props();

	let canvas = getContext<CanvasContext>(canvasId);
	const layer = canvas.container.getLayer(plantingAreaLayerId);

	const plantingArea = {
		grid: {
			numRows: 4,
			numColumns: 5
		},
		locationHistory: {
			locations: [
				{
					coordinate: {
						id: 'aaresont',
						gardenId: 'arenstoeirasnt',
						x: 10,
						y: 8,
						z: null
					}
				}
			]
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
                radius: 3,
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

	const group: Konva.Group = new Konva.Group();
	layer.add(group);

	let shape = getShape(
		canvas,
		plantingArea.locationHistory.locations[0].coordinate,
		plantingArea.geometry,
		{
			stroke: getColor('neutral', 9, mode.value),
			fill: getColor('neutral', 4, mode.value)
		}
	);
    group.add(shape)
</script>
