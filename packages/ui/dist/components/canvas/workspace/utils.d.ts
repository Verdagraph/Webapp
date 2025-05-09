import { type Geometry } from '@vdg-webapp/models';
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
 *    0
 *  /   \
 *  \   /
 *   ---
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
export declare function getGeometryResizePoints(
	geometry: Omit<Geometry, 'id' | 'gardenId' | 'linesCoordinateIds' | 'date'>
): Array<{
	x: number;
	y: number;
}>;
//# sourceMappingURL=utils.d.ts.map
