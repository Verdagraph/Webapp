<script lang="ts">
	import Konva from 'konva';
	import { getShape, type SupportedShape } from '../utils';
	import { getContext, onMount } from 'svelte';
	import type { CanvasContext } from '../state';
	import { plantingAreaLayerId } from './consts';
	import { getColor } from '$lib/utils';
	import mode from '$state/theme.svelte';
	import {
		getLocationAtDate,
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
		/** The current date at which to render the PlantingArea. */
		currentDate: DateValue;

		/** PlantingArea properties. */
		grid: GridAttributes;
		movable: boolean;
		locationHistory: LocationHistory;
		geometry: Geometry;
	};
	let {
		canvasId,
		currentDate,
		grid,
		movable,
		locationHistory = $bindable(),
		geometry = $bindable()
	}: Props = $props();

	/** Retrieve canvas and initialize Konva constructs. */
	const canvas = getContext<CanvasContext>(canvasId);
	const layer = canvas.container.getLayer(plantingAreaLayerId);
	const group: Konva.Group = new Konva.Group({ draggable: movable });
	layer.add(group);

	/** Border shape of the planting area. */
	let plantingAreaShape: SupportedShape | null = null;

	setTimeout(() => {
		console.log('changing2')
		console.log(locationHistory)
	}, 2000)

	$effect(() => {
		console.log('location history update')
		console.log(locationHistory)
	})

	/**
	 * The current position of the planting area in this workspace
	 * at the current date.
	 */
	let position: Coordinate | null = $derived.by(() => {
		console.log('position update 1')
		console.log(locationHistory)
		const location = getLocationAtDate(
			[...locationHistory.locations],
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

		plantingAreaShape = getShape(canvas, geometry, {
			stroke: getColor('neutral', 9, mode.value),
			fill: getColor('neutral', 4, mode.value)
		});
		group.add(plantingAreaShape);
	});

	/** Whenever the position changes, update the group's position. */
	$effect(() => {
		console.log('position update')
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
		if (geometry) {
			plantingAreaShape = getShape(canvas, geometry, {
				stroke: getColor('neutral', 9, mode.value),
				fill: getColor('neutral', 4, mode.value)
			});
			group.destroyChildren();
			group.add(plantingAreaShape);
		}
	});
</script>
