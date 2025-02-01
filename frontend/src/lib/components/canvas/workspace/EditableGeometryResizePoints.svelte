<script lang="ts">
	import type { Coordinate, DeepPartial, Geometry } from '@vdt-webapp/common';
	import { getContext, onDestroy } from 'svelte';
	import { GeometryTypeEnum } from '@vdt-webapp/common';
	import Konva from 'konva';
	import { getGeometryResizePoints } from './utils';
	import type { CanvasContext } from '../state';
	import { AppError } from '@vdt-webapp/common/src/errors';

	type Props = {
		/** The ID of the canvas. */
		canvasId: string;
		/* The geometry to add points for. */
		geometry: Omit<Geometry, 'id' | 'gardenId'>;
		/** A konva group already made that stores the geometry's shapes. */
		geometryGroup: Konva.Group;
		/** Colors to make the points. */
		strokeColor: string;
		fillColor: string;
		/** Called when the geometry is transformed in the canvas. */
		onTransform?: (
			/** The updated geometry attributes after transformation. */
			newGeometry: DeepPartial<Geometry>,
			/** If true, the transform has ended.*/
			transformOver: boolean
		) => void;
	};
	let {
		canvasId,
		geometry,
		geometryGroup,
		strokeColor,
		fillColor,
		onTransform
	}: Props = $props();

	/** Retrieve canvas and initialize Konva constructs. */
	const canvas = getContext<CanvasContext>(canvasId);

	let group = new Konva.Group();
	geometryGroup.add(group);
	let resizePoints: Array<Konva.Circle> = [];

	let previousGeometryType: (typeof GeometryTypeEnum)[number] = geometry.type;
	let previousNumResizePoints: number = 0;

	function handleResizePointDrag(index: number): DeepPartial<Geometry> {
		const newGeometry: DeepPartial<Geometry> = {};

		switch (geometry.type) {
			case 'RECTANGLE':
				newGeometry.type = 'RECTANGLE';
				/**
				 * If the index is even,
				 * calculate the new width and height.
				 */
				if (index % 2 === 0) {
					const newLength = Math.abs(resizePoints[index].x()) * 2;
					const newWidth = Math.abs(resizePoints[index].y()) * 2;
					newGeometry.rectangleAttributes = {
						length: canvas.transform.modelDistance(newLength),
						width: canvas.transform.modelDistance(newWidth)
					};

					/**
					 * If the index is odd,
					 * calculate the new width or height
					 * and constrain movement to an axis.
					 */
				} else {
					/** Top or bottom point. */
					if (index === 1 || index === 5) {
						resizePoints[index].x(0);
						const newWidth = Math.abs(resizePoints[index].y()) * 2;
						newGeometry.rectangleAttributes = {
							width: canvas.transform.modelDistance(newWidth)
						};

						/** Side points. */
					} else {
						resizePoints[index].y(0);
						const newLength = Math.abs(resizePoints[index].x()) * 2;
						newGeometry.rectangleAttributes = {
							length: canvas.transform.modelDistance(newLength)
						};
					}
				}

			case 'POLYGON':
				/**
				 * Calculate the new radius,
				 * and constrain the movement to
				 * a straight line from the center.
				 */
				break;

			case 'ELLIPSE':
				/**
				 * If the index is even, calculate the
				 * new width and constrain movement
				 * to the Y axis.
				 */

				/**
				 * If the index is odd, calculate the new
				 * length and constrain movement to the X axis.
				 */
				break;

			case 'LINES':
				/**
				 * Each index changes its own point in the array.
				 */
				break;
		}
		return newGeometry;
	}

	$effect(() => {
		const coordinates = getGeometryResizePoints(geometry);
		/**
		 * If the points haven't been created yet,
		 * or the geometry type has switched,
		 * or another point has been added,
		 * re-initialize the points.
		 * Otherwise, update their positions.
		 */
		if (
			previousNumResizePoints === 0 ||
			previousGeometryType != geometry.type ||
			previousNumResizePoints != coordinates.length
		) {
			console.log('this should happen once');
			resizePoints = [];
			group.destroyChildren();
			coordinates.forEach((coordinate, index) => {
				const point = new Konva.Circle({
					radius: 6,
					strokeWidth: 3,
					x: canvas.transform.canvasXPos(coordinate.x),
					y: canvas.transform.canvasYPos(coordinate.y),
					draggable: true,
					stroke: strokeColor,
					fill: fillColor
				});
				point.on('mouseover', (event) => {
					document.body.style.cursor = 'grab';
					event.cancelBubble = true;
				});
				point.on('mouseout', (event) => {
					document.body.style.cursor = 'default';
					event.cancelBubble = true;
				});
				point.on('dragmove', (event) => {
					if (onTransform) {
						onTransform(handleResizePointDrag(index), false);
					}
					event.cancelBubble = true;
				});
				point.on('dragend', (event) => {
					if (onTransform) {
						onTransform(handleResizePointDrag(index), true);
					}
					event.cancelBubble = true;
				});
				resizePoints.push(point);
				group.add(point);
			});
		} else {
			coordinates.forEach((coordinate, index) => {
				if (resizePoints[index]) {
					resizePoints[index].x(canvas.transform.canvasXPos(coordinate.x));
					resizePoints[index].y(canvas.transform.canvasYPos(coordinate.y));
				}
			});
		}

		/** Update color on change. */
		$effect(() => {
			resizePoints.forEach((point) => {
				point.stroke(strokeColor);
				point.fill(fillColor);
			});
		});

		previousGeometryType = geometry.type;
		previousNumResizePoints = coordinates.length;
	});

	onDestroy(() => {
		group.destroy();
	});
</script>
