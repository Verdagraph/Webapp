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
	GeometryPartial,
	GeometryType
} from '@vdt-webapp/common';
import { getGeometryAttributes } from '@vdt-webapp/common';

/**
 * Union of supported shape types in Konva for geometry objects.
 */
export type SupportedShape =
	| Konva.Rect
	| Konva.Ellipse
	| Konva.RegularPolygon
	| Konva.Line;

/**
 * Maps native application geometry enum to Konva class name.
 */
const konvaShapeClassNames: Record<GeometryType, string> = {
	RECTANGLE: 'Rect',
	POLYGON: 'RegularPolygon',
	ELLIPSE: 'Ellipse',
	LINES: 'Line'
};

/**
 * Throws an error if the supported shape does not match the geometry type.
 * @param shape The shape to validate.
 * @param geometryType The geometry type to validate against.
 */
function validateShapeGeometry(shape: SupportedShape, geometryType: GeometryType) {
	if (shape.getClassName() !== konvaShapeClassNames[geometryType]) {
		throw new AppError(
			`Attempted to update a shape of type ${shape.getClassName()} with a different geometry type of ${geometryType}`
		);
	}
}

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

/**
 * Given an existing shape object and a partial of geometry
 * updates, update the shape object.
 * The shape object must match the type of the geometry update.
 * @param canvas The canvas context of the shape.
 * @param newGeometry The new geometry updated attributes.
 * @param shape The existing shape object.
 */
export function updateShape(
	canvas: CanvasContext,
	newGeometry: GeometryPartial,
	shape: SupportedShape
) {
	if (!newGeometry.type) {
		return;
	}
	validateShapeGeometry(shape, newGeometry.type);

	switch (newGeometry.type) {
		case 'RECTANGLE':
			if (!newGeometry.rectangleAttributes) {
				return;
			}

			const rectangle = shape as Konva.Rect;

			if (newGeometry.rectangleAttributes.length) {
				rectangle.width(
					canvas.transform.canvasDistance(newGeometry.rectangleAttributes.length)
				);
				rectangle.offsetX(
					canvas.transform.canvasDistance(newGeometry.rectangleAttributes.length) / 2
				);
			}
			if (newGeometry.rectangleAttributes.width) {
				rectangle.height(
					canvas.transform.canvasDistance(newGeometry.rectangleAttributes.width)
				);
				rectangle.offsetY(
					canvas.transform.canvasDistance(newGeometry.rectangleAttributes.width) / 2
				);
			}
			break;

		case 'POLYGON':
			if (!newGeometry.polygonAttributes) {
				return;
			}

			const polygon = shape as Konva.RegularPolygon;

			if (newGeometry.polygonAttributes.numSides) {
				polygon.sides(newGeometry.polygonAttributes.numSides);
			}
			if (newGeometry.polygonAttributes.radius) {
				polygon.radius(
					canvas.transform.canvasDistance(newGeometry.polygonAttributes.radius)
				);
			}
			break;

		case 'ELLIPSE':
			if (!newGeometry.ellipseAttributes) {
				return;
			}

			const ellipse = shape as Konva.Ellipse;

			if (newGeometry.ellipseAttributes.lengthDiameter) {
				ellipse.radiusX(
					canvas.transform.canvasDistance(
						newGeometry.ellipseAttributes.lengthDiameter / 2
					)
				);
			}
			if (newGeometry.ellipseAttributes.widthDiameter) {
				ellipse.radiusY(
					canvas.transform.canvasDistance(
						newGeometry.ellipseAttributes.widthDiameter / 2
					)
				);
			}
			break;

		case 'LINES':
			if (!newGeometry.linesAttributes) {
				return;
			}

			const lines = shape as Konva.Line;

			if (newGeometry.linesAttributes.coordinates) {
				lines.points(
					newGeometry.linesAttributes.coordinates.reduce<number[]>(
						(output, coordinate) => {
							output.push(
								canvas.transform.canvasXPos(coordinate.x),
								canvas.transform.canvasYPos(coordinate.y)
							);
							return output;
						},
						[]
					)
				);
			}
			if (newGeometry.linesAttributes.closed) {
				lines.closed(newGeometry.linesAttributes.closed);
			}
			break;
	}
}
