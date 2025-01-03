<script lang="ts">
	import Konva from 'konva';
	import type { Vector2d } from 'konva/lib/types';
	import { getContext, onDestroy } from 'svelte';
	import {
		type Coordinate,
		type Geometry,
		type GridAttributes
	} from '@vdt-webapp/common';
	import type { CanvasContext } from '../state';
	import { getClosedShape, type SupportedShape } from '../utils';
	import { getColor } from '$lib/utils';
	import mode from '$state/theme.svelte';

	type Props = {
		/** The ID of the canvas. */
		canvasId: string;
		/** The ID of the layer which holds the planting areas. */
		plantingAreaLayerId: string;
		/** The current position of the planting area in the workspace, in model quantity (meters). */
		position: Vector2d | null;
		/** The geometry of the planting area. */
		geometry: Geometry;
		/** The grid attributes of the planting area. */
		grid?: GridAttributes;
		/** If true, the planting area may be moved and resized. */
		editable?: boolean;
		/** If true, the planting area is selected. */
		selected?: boolean;
		/** Called when the planting area is moved in the canvas. */
		onTranslate?: (
			/** The new position, in canvas quantity (pixels). */
			newPos: Vector2d
		) => void;
		/** Called when the planting area is transformed in the canvas. */
		onTransform?: (
			oldGeometry: Geometry,
			oldScale: Vector2d,
			newScale: Vector2d
		) => void;
	};
	let {
		canvasId,
		plantingAreaLayerId,
		position,
		geometry,
		grid,
		editable = false,
		selected = false,
		onTranslate,
		onTransform
	}: Props = $props();

	/** Retrieve canvas and initialize Konva constructs. */
	const canvas = getContext<CanvasContext>(canvasId);
	const layer = canvas.container.getLayer(plantingAreaLayerId);
	const group: Konva.Group = new Konva.Group({ draggable: editable });
	layer.add(group);

	/** Border shape of the planting area. */
	let plantingAreaShape: SupportedShape | null = null;

	/** Update shapes upon geometry change. */
	$effect(() => {
		group.destroyChildren();
		group.draggable(true);
		plantingAreaShape = getClosedShape(canvas, geometry, {
			strokeWidth: 2,
			fill: getColor('brown', 3, mode.value),
			stroke: getColor('brown', 10, mode.value)
		});
		if (plantingAreaShape) {
			group.add(plantingAreaShape);
			group.rotation(geometry.rotation);
		}
	});

	/** Update position upon position change. */
	$effect(() => {
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

	/** Add events. */
	if (editable) {
		group.on('mouseover', () => {
			document.body.style.cursor = 'grab';
		});
		group.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});
		group.on('dragmove', () => {
			if (onTranslate) {
				onTranslate({ x: group.x(), y: group.y() });
			}
		});
	}

	onDestroy(() => {
		group.destroy();
	});
</script>
