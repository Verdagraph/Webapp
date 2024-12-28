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
	Geometry
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
 * @param position The position of the shape.
 * @param geometry The geometry of the shape.
 * @param config Any additional config to pass to the shape.
 * @returns The Konva shape.
 */
export function getShape(
	canvas: CanvasContext,
	position: Coordinate,
	geometry: Geometry,
	config: Partial<ShapeConfig>
): SupportedShape {
	const commonShapeConfig: Partial<ShapeConfig> = {
		x: canvas.transform.canvasXPos(position.x),
		y: canvas.transform.canvasYPos(position.y),
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
				radiusX: canvas.transform.canvasDistance(attributes.lengthDiameter),
				radiusY: canvas.transform.canvasDistance(attributes.widthDiameter),
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
				closed: attributes.closed,
				...commonShapeConfig
			});
	}

	/** Should not reach here. */
	throw new AppError('Geometry type undefined.');
}
