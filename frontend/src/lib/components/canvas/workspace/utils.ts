import {
	type Geometry,
	getGeometryAttributes,
	RectangleGeometry,
	LinesGeometry,
	EllipseGeometry,
	PolygonGeometry
} from '@vdt-webapp/common';

/**
 * Given a geometry, returns an array of coordinates
 * where each coordinate is a point on the shape which
 * can be dragged to resize the shape. Two geometries
 * of the same type will have exactly the same number
 * of resize points, unless the geometry is a lines geometry,
 * in which case it will have a point for each coordinate.
 *
 * The points are different for each geometry type:
 *
 * For a rectangle, there is a point at each corner,
 * and a point in the middle of each side. The points
 * start at the top left corner, meaning that even
 * points are corners and odd points are sides.
 * 0----1----2
 * |		 |
 * 7		 3
 * |		 |
 * 6----5----4
 *
 * For an ellise, there is a point at each side,
 * starting from the top.
 *     0
 *   /   \
 *  3     1
 *   \   /
 *     2
 *
 * For a polygon, there is a one point, at the top.
 *      0
 *    /   \
 *    \   /
 *     ---
 *
 * For a lines geometry described by a set of points,
 * the resize points are simply the set of points.
 * 0----1
 *  \    |
 *   \   2--3
 *    \     |
 *     \    |
 *      \   |
 *       \  |
 *        \ |
 *         \|
 * 	        4
 *
 * @param geometry The geometry to extract from.
 * @returns The list of points which can be used as resize points.
 */
export function getGeometryResizePoints(
	geometry: Omit<Geometry, 'id' | 'gardenId' | 'date'>
): Array<{ x: number; y: number }> {
	let attributes;
	switch (geometry.type) {
		case 'RECTANGLE':
			attributes = getGeometryAttributes<'RECTANGLE'>(geometry as RectangleGeometry);

			const halfLength = attributes.length / 2;
			const halfWidth = attributes.width / 2;

			return [
				{ x: -halfLength, y: halfWidth },
				{ x: 0, y: halfWidth },
				{ x: halfLength, y: halfWidth },
				{ x: halfLength, y: 0 },
				{ x: halfLength, y: -halfWidth },
				{ x: 0, y: -halfWidth },
				{ x: -halfLength, y: -halfWidth },
				{ x: -halfLength, y: 0 }
			];

		case 'POLYGON':
			attributes = getGeometryAttributes<'POLYGON'>(geometry as PolygonGeometry);
			/** TODO */
			return [];

		case 'ELLIPSE':
			attributes = getGeometryAttributes<'ELLIPSE'>(geometry as EllipseGeometry);

			const radiusLength = attributes.lengthDiameter / 2;
			const radiusWidth = attributes.widthDiameter / 2;

			return [
				{ x: 0, y: radiusWidth },
				{ x: radiusLength, y: 0 },
				{ x: 0, y: -radiusWidth },
				{ x: -radiusLength, y: 0 }
			];

		case 'LINES':
			attributes = getGeometryAttributes<'LINES'>(geometry as LinesGeometry);

			return attributes.coordinates as Array<{ x: number; y: number }>;
	}
}
