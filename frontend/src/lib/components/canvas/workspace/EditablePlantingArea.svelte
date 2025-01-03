<script lang="ts">
	import Konva from 'konva';
	import { getShape, type SupportedShape } from '../utils';
	import { getContext, onMount } from 'svelte';
	import type { CanvasContext } from '../state';
	import { plantingAreaLayerId } from './consts';
	import { getColor } from '$lib/utils';
	import mode from '$state/theme.svelte';
	import {
		historySelect,
		type LocationHistory,
		type Geometry,
		type GeometryTypeEnum,
		type GridAttributes,
		type Location,
		type Coordinate
	} from '@vdt-webapp/common';
	import { getLocalTimeZone, type DateValue } from '@internationalized/date';

	/** Props. */
	type Props = {
		/** The ID of the canvas. */
		canvasId: string;
		/** The ID of the planting area. */
		plantingAreaId: string;
		/** The current date at which to render the PlantingArea. */
		currentDate: DateValue;
	};
	let { canvasId, plantingAreaId, currentDate }: Props = $props();

	const plantingArea = $state({
		grid: {
			numRows: 4,
			numColumns: 5
		},
		locationHistory: {
			locations: new Set([
				{
					workspaceId: 'f4b3b1b0-0b3b-4b3b-8b3b-0b3b1b0b3b1b',
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
			type: 'RECTANGLE',
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
	});

	/** Retrieve canvas and initialize Konva constructs. */
	const canvas = getContext<CanvasContext>(canvasId);
	const layer = canvas.container.getLayer(plantingAreaLayerId);
	const group: Konva.Group = new Konva.Group({ draggable: true });
	layer.add(group);

	/** Border shape of the planting area. */
	let plantingAreaShape: SupportedShape | null = null;

	setTimeout(() => {
		console.log('changing');
		plantingArea.locationHistory.locations.forEach((location) => {
			location.coordinate.x += 2;
			location.coordinate.y += 3;
		});
		plantingArea.locationHistory.locations = plantingArea.locationHistory.locations;
		console.log(plantingArea);
	}, 2000);

	/**
	 * The current position of the planting area in this workspace
	 * at the current date.
	 */
	let position: Coordinate | null = $derived.by(() => {
		const location = historySelect(
			[...plantingArea.locationHistory.locations],
			currentDate.toDate(getLocalTimeZone())
		);
		if (location?.workspaceId === canvas.workspaceId) {
			return location.coordinate;
		} else {
			return null;
		}
	});

	/**
	 * Initialization.
	 */
	onMount(() => {
		if (position) {
			group.position({
				x: canvas.transform.canvasXPos(position.x),
				y: canvas.transform.canvasYPos(position.y)
			});
			group.visible(true);
		} else {
			group.visible(false);
		}

		plantingAreaShape = getShape(canvas, plantingArea.geometry, {
			stroke: getColor('neutral', 9, mode.value),
			fill: getColor('neutral', 4, mode.value)
		});
		group.add(plantingAreaShape);
	});

	/** Whenever the position changes, update the group's position. */
	$effect(() => {
		console.log('position update');
		if (position) {
			group.position({
				x: canvas.transform.canvasXPos(position.x),
				y: canvas.transform.canvasYPos(position.y)
			});
			group.visible(true);
		} else {
			group.visible(false);
		}
	});

	/** Whenever the geometry changes, update the shape. */
	$effect(() => {
		if (plantingArea.geometry) {
			plantingAreaShape = getShape(canvas, plantingArea.geometry, {
				stroke: getColor('neutral', 9, mode.value),
				fill: getColor('neutral', 4, mode.value)
			});
			group.destroyChildren();
			group.add(plantingAreaShape);
		}
	});
</script>
