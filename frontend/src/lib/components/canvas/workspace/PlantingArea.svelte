<script lang="ts">
	import Konva from 'konva';
	import type { Vector2d } from 'konva/lib/types';
	import { getContext, onDestroy } from 'svelte';
	import {
		getGeometryHeight,
		type GeometryType,
		type Geometry,
		type GridAttributes,
		type DeepPartial
	} from '@vdt-webapp/common';
	import type { CanvasContext } from '../state';
	import { getClosedShape, updateShape, type SupportedShape } from '../utils';
	import { getColor } from '$lib/utils';
	import mode from '$state/theme.svelte';
	import EditableGeometryResizePoints from './EditableGeometryResizePoints.svelte';

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
		/** Called when the position is moved in the canvas. */
		onTranslate?: (
			/** The new position, in canvas quantity (pixels). */
			newPos: Vector2d,
			/** If true, the movement has ended (dragend).*/
			movementOver: boolean
		) => void;
		/** Called when the geometry is transformed in the canvas. */
		onTransform?: (
			/** The updated geometry attributes after transformation. */
			newGeometry: DeepPartial<Geometry>,
			/** If true, the transform has ended.*/
			transformOver: boolean
		) => void;
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
		onTransform: onTransformContainer,
		onClick
	}: Props = $props();

	/** Retrieve canvas and initialize Konva constructs. */
	const canvas = getContext<CanvasContext>(canvasId);
	const layer = canvas.container.getLayer(plantingAreaLayerId);
	const group: Konva.Group = new Konva.Group({ draggable: editable });
	layer.add(group);

	/** Shapes. */
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
	 * Store the geometry type.
	 * If the geometry type is changed, a new shape may be rendered.
	 * Otherwise, the current shape can simply be updated.
	 */
	let previousGeometryType: GeometryType = geometry.type;

	let strokeColor = $derived(
		selected ? getColor('accent', 8, mode.value) : getColor('brown', 10, mode.value)
	);
	let fillColor = $derived(
		selected ? getColor('accent', 5, mode.value) : getColor('brown', 3, mode.value)
	);
	let strokeWidth = $derived(selected ? 3 : 2);
	let nameTextFillColor = $derived(
		selected ? getColor('accent', 11, mode.value) : getColor('brown', 11, mode.value)
	);

	/** Update shapes upon geometry change. */
	$effect(() => {
		if (geometry.type !== previousGeometryType || !plantingAreaShape) {
			plantingAreaShape?.destroy();
			plantingAreaShape = getClosedShape(canvas, geometry, {
				stroke: strokeColor,
				fill: fillColor,
				strokeWidth: strokeWidth
			});
			if (plantingAreaShape) {
				group.add(plantingAreaShape);
				group.rotation(geometry.rotation);
				nameText.y(canvas.transform.canvasYPos(getGeometryHeight(geometry)));
			}
		} else {
			updateShape(canvas, geometry, plantingAreaShape);
		}

		previousGeometryType = geometry.type;
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
		plantingAreaShape?.fill(fillColor);
		plantingAreaShape?.stroke(strokeColor);
		plantingAreaShape?.strokeWidth(strokeWidth);
		nameText.fill(nameTextFillColor);
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
			plantingAreaShape?.on('mouseover', () => {
				document.body.style.cursor = 'move';
			});
			plantingAreaShape?.on('mouseout', () => {
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

	function onTransform(newGeometry: DeepPartial<Geometry>, transformOver: boolean) {
		if (plantingAreaShape) {
			updateShape(canvas, newGeometry, plantingAreaShape);
		}
		if (onTransformContainer) {
			onTransformContainer(newGeometry, transformOver);
		}
	}

	onDestroy(() => {
		group.destroy();
	});
</script>

{#if editable}
	<EditableGeometryResizePoints
		{canvasId}
		{geometry}
		{strokeColor}
		{fillColor}
		geometryGroup={group}
		{onTransform}
	/>
{/if}
