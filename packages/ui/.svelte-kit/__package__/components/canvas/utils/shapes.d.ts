import Konva from 'konva';
import type { ShapeConfig } from 'konva/lib/Shape';
import { type Coordinate, type Geometry, type GeometryUpdateCommand } from '@vdg-webapp/models';
import type { CanvasContext } from '../state';
/**
 * Union of supported shape types in Konva for geometry objects.
 */
export type SupportedShape = Konva.Rect | Konva.Ellipse | Konva.RegularPolygon | Konva.Line;
/**
 * Constructs a Konva shape from geometry and position objects.
 * The resulting shape may be closed or unclosed.
 * @param canvas The canvas context.
 * @param geometry The geometry of the shape.
 * @param config Any additional config to pass to the shape.
 * @param position The position of the shape, if any.
 * @returns The Konva shape. Null, if the geometry is not well-defined.
 */
export declare function getShape(canvas: CanvasContext, geometry: Omit<Geometry, 'id' | 'gardenId' | 'linesCoordinateIds'>, config?: Partial<ShapeConfig>, position?: Coordinate): SupportedShape | null;
/**
 * Constructs a Konva shape from geometry and position objects.
 * The resulting shape is closed.
 * @param canvas The canvas context.
 * @param geometry The geometry of the shape.
 * @param config Any additional config to pass to the shape.
 * @param position The position of the shape, if any.
 * @returns The Konva shape. Null, if the geometry is not well-defined.
 */
export declare function getClosedShape(canvas: CanvasContext, geometry: Omit<Geometry, 'id' | 'gardenId' | 'linesCoordinateIds'>, config?: Partial<ShapeConfig>, position?: Coordinate): SupportedShape | null;
/**
 * Given an existing shape object and a partial of geometry
 * updates, update the shape object.
 * @param canvas The canvas context of the shape.
 * @param newGeometry The new geometry updated attributes.
 * @param shape The existing shape object.
 */
export declare function updateShape(canvas: CanvasContext, newGeometry: GeometryUpdateCommand, shape: SupportedShape): void;
//# sourceMappingURL=shapes.d.ts.map