import Konva from 'konva';
import type { ShapeConfig } from 'konva/lib/Shape';
import type { CanvasContext } from '../state';
import { AppError } from '@vdt-webapp/common/src/errors';
import type {
	EllipseGeometry,
	LinesGeometry,
	PolygonGeometry,
	RectangleGeometry,
	Coordinate,
	Geometry,
	DeepPartial
} from '@vdt-webapp/common';
import { getGeometryAttributes } from '@vdt-webapp/common';

export type SupportedShape =
	| Konva.Rect
	| Konva.Ellipse
	| Konva.RegularPolygon
	| Konva.Line;

/**
 * Constructs a Konva shape from geometry and position objects.
 * @param canvas The canvas context.
 * @param geometry The geometry of the shape. Must have the linesAttributes coordinates included.
 * @param forceLinesClosed If true, the lines geometry will be closed regardless of its attributes.
 * @param config Any additional config to pass to the shape.
 * @param position The position of the shape, if any.
 * @returns The Konva shape. Null, if the geometry is not well-defined.
 */
function getClosedOrUnclosedShape(
	canvas: CanvasContext,
	geometry: Omit<Geometry, 'id' | 'gardenId' | 'date'>,
	forceLinesClosed: boolean = false,
	config?: Partial<ShapeConfig>,
	position?: Coordinate
): SupportedShape | null {
	const commonShapeConfig: Partial<ShapeConfig> = {
		x: canvas.transform.canvasXPos(position?.x || 0),
		y: canvas.transform.canvasYPos(position?.y || 0),
		...config
	};

	let attributes;
	switch (geometry.type) {
		case 'RECTANGLE':
			attributes = getGeometryAttributes<'RECTANGLE'>(geometry as RectangleGeometry);

			return new Konva.Rect({
				width: canvas.transform.canvasDistance(attributes.length),
				height: canvas.transform.canvasDistance(attributes.width),
				offset: {
					x: canvas.transform.canvasDistance(attributes.length) / 2,
					y: canvas.transform.canvasDistance(attributes.width) / 2
				},
				...commonShapeConfig
			});

		case 'POLYGON':
			attributes = getGeometryAttributes<'POLYGON'>(geometry as PolygonGeometry);

			return new Konva.RegularPolygon({
				sides: attributes.numSides,
				radius: canvas.transform.canvasDistance(attributes.radius),
				...commonShapeConfig
			});

		case 'ELLIPSE':
			attributes = getGeometryAttributes<'ELLIPSE'>(geometry as EllipseGeometry);

			return new Konva.Ellipse({
				radiusX: canvas.transform.canvasDistance(attributes.lengthDiameter / 2),
				radiusY: canvas.transform.canvasDistance(attributes.widthDiameter / 2),
				...commonShapeConfig
			});

		case 'LINES':
			attributes = getGeometryAttributes<'LINES'>(geometry as LinesGeometry);

			return new Konva.Line({
				points: attributes.coordinates.reduce<number[]>((output, coordinate) => {
					output.push(
						canvas.transform.canvasXPos(coordinate.x),
						canvas.transform.canvasYPos(coordinate.y)
					);
					return output;
				}, []),
				closed: attributes.closed || forceLinesClosed,
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
export function getShape(
	canvas: CanvasContext,
	geometry: Omit<Geometry, 'id' | 'gardenId'>,
	config?: Partial<ShapeConfig>,
	position?: Coordinate
): SupportedShape | null {
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
export function getClosedShape(
	canvas: CanvasContext,
	geometry: Omit<Geometry, 'id' | 'gardenId'>,
	config?: Partial<ShapeConfig>,
	position?: Coordinate
): SupportedShape | null {
	return getClosedOrUnclosedShape(canvas, geometry, true, config, position);
}

export function updateShape(
	canvas: CanvasContext,
	newGeometry: DeepPartial<Geometry>,
	shape: SupportedShape
) {
	if (!newGeometry.type) {
		return;
	}

	switch (newGeometry.type) {
		case 'RECTANGLE':
			if (!newGeometry.rectangleAttributes) {
				return;
			}

			if (newGeometry.rectangleAttributes.length) {
				shape.width(
					canvas.transform.canvasDistance(newGeometry.rectangleAttributes.length)
				);
				shape.offsetX(
					canvas.transform.canvasDistance(newGeometry.rectangleAttributes.length) / 2
				);
			}
			if (newGeometry.rectangleAttributes.width) {
				shape.height(
					canvas.transform.canvasDistance(newGeometry.rectangleAttributes.width)
				);
				shape.offsetY(
					canvas.transform.canvasDistance(newGeometry.rectangleAttributes.width) / 2
				);
			}
			break;
	}
}
