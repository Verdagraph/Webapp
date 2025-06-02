<script lang="ts">
	import Konva from 'konva';
	import type { Vector2d } from 'konva/lib/types';
	import { getContext, onDestroy } from 'svelte';

	import {
		type Geometry,
		type GeometryUpdateCommand,
		getGeometryHeight
	} from '@vdg-webapp/models';

	import { getColor } from '$utils';

	import type { CanvasContext } from '../state';
	import { type SupportedShape, getClosedShape, updateShape } from '../utils';
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
		geometry: Omit<Geometry, 'id' | 'gardenId' | 'linesCoordinateIds' | 'date'>;
		/** If true, the planting area may be moved and resized. */
		editable: boolean;
		/** If true, the planting area is selected. */
		selected: boolean;
		labelTranslate?: Vector2d;
		/** The grid attributes of the planting area. */
		grid?: { numRows: number; numCols: number };
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
			newGeometry: GeometryUpdateCommand,
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
		labelTranslate = { x: 0, y: 0 },
		// grid,
		onTranslate,
		onTransform: onTransformContainer,
		onClick
	}: Props = $props();

	/** The number of pixels the label is offset from the top of the shape. */
	const LABEL_OFFSET_PX = 10;

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
	let previousGeometryType = geometry.type;

	/**
	 * Shape config settings.
	 */
	let strokeColor = $derived(
		selected
			? getColor('accent', 8, canvas.mode.current)
			: getColor('brown', 10, canvas.mode.current)
	);
	$inspect(canvas.mode.current);
	let fillColor = $derived(
		selected
			? getColor('accent', 5, canvas.mode.current)
			: getColor('brown', 3, canvas.mode.current)
	);
	let strokeWidth = $derived(selected ? 3 : 2);
	let nameTextFillColor = $derived(
		selected
			? getColor('accent', 11, canvas.mode.current)
			: getColor('brown', 11, canvas.mode.current)
	);

	/** Update shapes upon geometry change. */
	$effect(() => {
		/** If the geometry type has changed or the shape hasn't been initialized, initialize. */
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
				nameText.y(
					canvas.transform.canvasYPos(getGeometryHeight(geometry) + labelTranslate.y)
				);
				nameText.x(canvas.transform.canvasXPos(labelTranslate.x));
			}

			/** Otherwise, update the existing shape.*/
		} else {
			updateShape(canvas, geometry, plantingAreaShape);
			nameText.y(
				canvas.transform.canvasYPos(getGeometryHeight(geometry) + labelTranslate.y)
			);
			nameText.x(canvas.transform.canvasXPos(labelTranslate.x));
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
		nameText.offsetY(nameText.height() + LABEL_OFFSET_PX);
	});

	/** Add events. */
	$effect(() => {
		if (editable) {
			group.draggable(true);
			plantingAreaShape?.on('mouseover', () => {
				document.body.style.cursor = 'move';
			});
			plantingAreaShape?.on('mouseout', () => {
				canvas.selectionGroup.setDocumentCursor();
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

	/**
	 * Wrap the container's onTransform to optimistically update
	 * the shape before the geometry is updated in Triplit.
	 */
	function onTransform(newGeometry: GeometryUpdateCommand, transformOver: boolean) {
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
