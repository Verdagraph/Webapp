<script lang="ts">
	import type { Coordinate, Geometry } from '@vdt-webapp/common';
	import { getContext } from 'svelte';
	import { GeometryTypeEnum } from '@vdt-webapp/common';
	import Konva from 'konva';
	import { getGeometryResizePoints } from './utils';
	import type { CanvasContext } from '../state';

	type Props = {
		/** The ID of the canvas. */
		canvasId: string;
		geometry: Geometry;
		plantingAreaGroup: Konva.Group;
	};
	let { canvasId, geometry = $bindable(), plantingAreaGroup }: Props = $props();

	/** Retrieve canvas and initialize Konva constructs. */
	const canvas = getContext<CanvasContext>(canvasId);

	let group = new Konva.Group();
	plantingAreaGroup.add(group);
	let coordinates: Array<Pick<Coordinate, 'x' | 'y'>> = [];
	let resizePoints: Array<Konva.Ellipse> = [];

	let previousGeometryType: (typeof GeometryTypeEnum)[number] = geometry.type;
	let previousNumResizePoints: number = 0;

	/**
	 * Rectangle:
	 */

	function handleResizePointDrag(
		index: number,
		geometryType: (typeof GeometryTypeEnum)[number]
	) {
		const point = resizePoints[index];

		switch (geometryType) {
			case 'RECTANGLE':
				/**
				 * If the index is even,
				 * calculate the new width and height.
				 */
				if (index % 2 === 0) {
					const newLength = Math.abs(point.x()) * 2;
					const newWidth = Math.abs(point.y()) * 2;

					geometry.rectangleAttributes.length =
						canvas.transform.modelDistance(newLength);
					geometry.rectangleAttributes.width = canvas.transform.modelDistance(newWidth);

					/**
					 * If the index is odd,
					 * calculate the new width or height
					 * and constrain movement to an axis.
					 */
				} else {
				}

				break;

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
	}

	$effect(() => {
		coordinates = getGeometryResizePoints(geometry);
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
			group.destroyChildren();
			coordinates.forEach((coordinate) => {
				const point = new Konva.Ellipse({
					radiusX: 5,
					radiusY: 5,
					x: coordinate.x,
					y: coordinate.y,
					draggable: true
				});
				point.on('dragmove dragend', () => {});
				resizePoints.push(point);
				group.add(point);
			});
		} else {
			coordinates.forEach((coordinate, index) => {
				if (resizePoints[index]) {
					resizePoints[index].x(coordinate.x);
					resizePoints[index].y(coordinate.y);
				}
			});
		}

		previousGeometryType = geometry.type;
		previousNumResizePoints = coordinates.length;
	});
</script>
