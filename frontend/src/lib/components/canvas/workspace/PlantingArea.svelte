<script lang="ts">
	import Konva from 'konva';
	import type { Vector2d } from 'konva/lib/types';
	import { getContext, onDestroy } from 'svelte';
	import {
		getGeometryHeight,
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
		/** Name of the planting area. Can be disabled */
		name: string;
		showName: boolean;
		/** The current position of the planting area in the workspace, in model quantity (meters). */
		position: Vector2d | null;
		/** The geometry of the planting area. */
		geometry: Omit<Geometry, 'id' | 'gardenId'>;
		/** If true, the planting area may be moved and resized. */
		editable: boolean;
		/** If true, the planting area is selected. */
		selected: boolean;
		/** The grid attributes of the planting area. */
		grid?: GridAttributes;
		/** Called when the planting area is moved in the canvas. */
		onTranslate?: (
			/** The new position, in canvas quantity (pixels). */
			newPos: Vector2d,
			/** If true, the movement has ended (dragend).*/
			movementOver: boolean
		) => void;
		/** Called when the planting area is transformed in the canvas. */
		onTransform?: (newGeometry: Geometry) => void;
		/** Called when the planting area is clicked. */
		onClick?: () => void;
	};
	let {
		canvasId,
		plantingAreaLayerId,
		name,
		showName = true,
		position,
		geometry,
		editable,
		selected,
		grid,
		onTranslate,
		onTransform,
		onClick
	}: Props = $props();

	/** Retrieve canvas and initialize Konva constructs. */
	const canvas = getContext<CanvasContext>(canvasId);
	const layer = canvas.container.getLayer(plantingAreaLayerId);
	const group: Konva.Group = new Konva.Group({ draggable: editable });
	layer.add(group);

	/** Shapes of the planting area. */
	let plantingAreaShape: SupportedShape | null = null;
	let nameText = new Konva.Text({
		fontFamily: 'sans',
		fontSize: 15,
		opacity: 0.7,
		text: name,
		visible: showName
	});
	group.add(nameText);

	/**
	 * Retrives the shape settings based on state.
	 * @param selected Whether the planting area is selected.
	 */
	function getShapeConfig(selected: boolean) {
		if (selected) {
			return {
				plantingAreaShapeConfig: {
					fill: getColor('accent', 5, mode.value),
					stroke: getColor('accent', 8, mode.value),
					strokeWidth: 3
				},
				nameTextShapeConfig: {
					fill: getColor('accent', 11, mode.value)
				}
			};
		} else {
			return {
				plantingAreaShapeConfig: {
					fill: getColor('brown', 3, mode.value),
					stroke: getColor('brown', 10, mode.value),
					strokeWidth: 2
				},
				nameTextShapeConfig: {
					fill: getColor('brown', 11, mode.value)
				}
			};
		}
	}

	/** Update shapes upon geometry change. */
	$effect(() => {
		plantingAreaShape?.destroy();
		plantingAreaShape = getClosedShape(
			canvas,
			geometry,
			getShapeConfig(selected).plantingAreaShapeConfig
		);
		if (plantingAreaShape) {
			group.add(plantingAreaShape);
			group.rotation(geometry.rotation);
			nameText.y(canvas.transform.canvasYPos(getGeometryHeight(geometry)));
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

	/** Update color on selection change. */
	$effect(() => {
		const { plantingAreaShapeConfig, nameTextShapeConfig } = getShapeConfig(selected);
		plantingAreaShape?.fill(plantingAreaShapeConfig.fill);
		plantingAreaShape?.stroke(plantingAreaShapeConfig.stroke);
		plantingAreaShape?.strokeWidth(plantingAreaShapeConfig.strokeWidth);
		nameText.fill(nameTextShapeConfig.fill);
	});

	/** Update name text on name change. */
	$effect(() => {
		nameText.text(name);
		nameText.offsetX(nameText.width() / 2);
		nameText.offsetY(nameText.height() + 10);
	});

	/** Add events. */
	$effect(() => {
		if (editable) {
			group.draggable(true);
			group.on('mouseover', () => {
				document.body.style.cursor = 'grab';
			});
			group.on('mouseout', () => {
				document.body.style.cursor = 'default';
			});
			group.on('dragmove', () => {
				if (onTranslate) {
					onTranslate({ x: group.x(), y: group.y() }, false);
				}
			});
			group.on('dragend', () => {
				group.position(canvas.gridManager.snapToGrid(group.position()));
				if (onTranslate) {
					onTranslate({ x: group.x(), y: group.y() }, true);
				}
			});
			group.on('pointerclick', () => {
				if (onClick) {
					onClick();
				}
			});
		} else {
			group.draggable(false);
			group.off('mouseover mouseout dragmove dragend pointerclick');
		}
	});

	onDestroy(() => {
		group.destroy();
	});
</script>
