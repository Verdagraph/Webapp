<script lang="ts">
	import Konva from 'konva';
	import { getShape, SupportedShape } from '../utils';
	import { getContext } from 'svelte';
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
		type Location
	} from '@vdt-webapp/common';
	import { getLocalTimeZone, type DateValue } from '@internationalized/date';

	/** Props. */
	type Props = {
        /** The ID of the canvas. */
		canvasId: string;
		currentDate: DateValue;
		locationHistory: LocationHistory;
		geometry: Geometry;
		grid: GridAttributes;
		movable: boolean;
	};
	let {
		canvasId,
		currentDate,
		grid,
		movable,
		locationHistory = $bindable(),
		geometry = $bindable()
	}: Props = $props();

	let canvas = getContext<CanvasContext>(canvasId);
	const layer = canvas.container.getLayer(plantingAreaLayerId);
	const group: Konva.Group = new Konva.Group();
	layer.add(group);

	let plantingAreaShape: SupportedShape | null = null;

	let location: Location | null = getLocationAtDate(
		locationHistory,
		currentDate.toDate(getLocalTimeZone())
	);
	if (location?.workspaceId != workspaceId) {
	}

	/** Whenever the date changes, update the location .*/
	$effect(() => {
		const newLocation = getLocationAtDate(
			locationHistory,
			currentDate.toDate(getLocalTimeZone())
		);

		/** If the position has changed. */
		if (newLocation != location) {
			/** If the planting area has moved outside of the workspace, remove it. */
			if (newLocation.workspaceId != workspaceId && plantingAreaShape != null) {
				group.destroyChildren();
				plantingAreaShape = null;
			}

			location = newLocation;
		}
	});

	/** Whenever the location changes, update the group's position. */

	/** Whenever the geometry changes, update the shape. */

	/*
	let shape = getShape(
		canvas,
		locationHistory.locations[0].coordinate,
		geometry,
		{
			stroke: getColor('neutral', 9, mode.value),
			fill: getColor('neutral', 4, mode.value)
		}
	);
    group.add(shape) */
</script>
