<script lang="ts">
	import type { Coordinate, Geometry } from '@vdt-webapp/common';
	import { GeometryTypeEnum } from '@vdt-webapp/common';
	import Konva from 'konva';
	import { getGeometryResizePoints } from './utils';

	type Props = {
		geometry: Geometry;
		plantingAreaGroup: Konva.Group;
	};
	let { geometry = $bindable(), plantingAreaGroup }: Props = $props();

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
		switch (geometryType) {
			case 'RECTANGLE':
				/** Corner indices: 1, 3, 5, 7: change w and height
				 * Side indices: 2, 4, 6, 8: change w or height
				 */
				break;

			case 'POLYGON':
				/**
				 * Vertices indices: all, changes radius:
				 */
				break;

			case 'ELLIPSE':
				/**
				 * Top&bottom indices: change height
				 * Side indicies: change w
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
