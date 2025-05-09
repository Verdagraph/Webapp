import Konva from 'konva';
import { AppError } from '@vdg-webapp/models';
/**
 * Constructs a Konva shape from geometry and position objects.
 * @param canvas The canvas context.
 * @param geometry The geometry of the shape. Must have the linesCoordinates included.
 * @param forceLinesClosed If true, the lines geometry will be closed regardless of its attributes.
 * @param config Any additional config to pass to the shape.
 * @param position The position of the shape, if any.
 * @returns The Konva shape. Null, if the geometry is not well-defined.
 */
function getClosedOrUnclosedShape(
	canvas,
	geometry,
	forceLinesClosed = false,
	config,
	position
) {
	const commonShapeConfig = {
		x: canvas.transform.canvasXPos(position?.x || 0),
		y: canvas.transform.canvasYPos(position?.y || 0),
		...config
	};
	switch (geometry.type) {
		case 'RECTANGLE':
			return new Konva.Rect({
				width: canvas.transform.canvasDistance(geometry.rectangleLength),
				height: canvas.transform.canvasDistance(geometry.rectangleWidth),
				offset: {
					x: canvas.transform.canvasDistance(geometry.rectangleLength) / 2,
					y: canvas.transform.canvasDistance(geometry.rectangleWidth) / 2
				},
				...commonShapeConfig
			});
		case 'POLYGON':
			return new Konva.RegularPolygon({
				sides: geometry.polygonNumSides,
				radius: canvas.transform.canvasDistance(geometry.polygonRadius),
				...commonShapeConfig
			});
		case 'ELLIPSE':
			return new Konva.Ellipse({
				radiusX: canvas.transform.canvasDistance(geometry.ellipseLength / 2),
				radiusY: canvas.transform.canvasDistance(geometry.ellipseWidth / 2),
				...commonShapeConfig
			});
		case 'LINES':
			return new Konva.Line({
				points: geometry.linesCoordinates.reduce((output, coordinate) => {
					output.push(
						canvas.transform.canvasXPos(coordinate.x),
						canvas.transform.canvasYPos(coordinate.y)
					);
					return output;
				}, []),
				closed: geometry.linesClosed || forceLinesClosed,
				...commonShapeConfig
			});
	}
	/** Should not reach here. */
	throw new AppError('Geometry type undefined.');
}
/**
 * Constructs a Konva shape from geometry and position objects.
 * The resulting shape may be closed or unclosed.
 * @param canvas The canvas context.
 * @param geometry The geometry of the shape.
 * @param config Any additional config to pass to the shape.
 * @param position The position of the shape, if any.
 * @returns The Konva shape. Null, if the geometry is not well-defined.
 */
export function getShape(canvas, geometry, config, position) {
	return getClosedOrUnclosedShape(canvas, geometry, false, config, position);
}
/**
 * Constructs a Konva shape from geometry and position objects.
 * The resulting shape is closed.
 * @param canvas The canvas context.
 * @param geometry The geometry of the shape.
 * @param config Any additional config to pass to the shape.
 * @param position The position of the shape, if any.
 * @returns The Konva shape. Null, if the geometry is not well-defined.
 */
export function getClosedShape(canvas, geometry, config, position) {
	return getClosedOrUnclosedShape(canvas, geometry, true, config, position);
}
/**
 * Given an existing shape object and a partial of geometry
 * updates, update the shape object.
 * @param canvas The canvas context of the shape.
 * @param newGeometry The new geometry updated attributes.
 * @param shape The existing shape object.
 */
export function updateShape(canvas, newGeometry, shape) {
	if (shape instanceof Konva.Rect) {
		if (newGeometry.rectangleLength) {
			shape.width(canvas.transform.canvasDistance(newGeometry.rectangleLength));
			shape.offsetX(canvas.transform.canvasDistance(newGeometry.rectangleLength) / 2);
		}
		if (newGeometry.rectangleWidth) {
			shape.height(canvas.transform.canvasDistance(newGeometry.rectangleWidth));
			shape.offsetY(canvas.transform.canvasDistance(newGeometry.rectangleWidth) / 2);
		}
	} else if (shape instanceof Konva.RegularPolygon) {
		if (newGeometry.polygonNumSides) {
			shape.sides(newGeometry.polygonNumSides);
		}
		if (newGeometry.polygonRadius) {
			shape.radius(canvas.transform.canvasDistance(newGeometry.polygonRadius));
		}
	} else if (shape instanceof Konva.Ellipse) {
		if (newGeometry.ellipseLength) {
			shape.radiusX(canvas.transform.canvasDistance(newGeometry.ellipseLength / 2));
		}
		if (newGeometry.ellipseWidth) {
			shape.radiusY(canvas.transform.canvasDistance(newGeometry.ellipseWidth / 2));
		}
	} else if (shape instanceof Konva.Line) {
		if (newGeometry.linesCoordinates) {
			shape.points(
				newGeometry.linesCoordinates.reduce((output, coordinate) => {
					output.push(
						canvas.transform.canvasXPos(coordinate.x),
						canvas.transform.canvasYPos(coordinate.y)
					);
					return output;
				}, [])
			);
		}
		if (newGeometry.linesClosed) {
			shape.closed(newGeometry.linesClosed);
		}
	} else {
		throw new AppError('Geometry shape of an unsupported type.');
	}
}
