import z from 'zod';
import { GeometryTypeEnum } from './schema';
import { commonDescriptionSchema, commonNameSchema } from '../commands';

/** Field specifications. */

/** Workspaces. */
export const workspaceNameSchema = commonNameSchema.describe(
	'Name of the workspace. Must be unique within a garden.'
);
export const workspaceDescriptionSchema = commonDescriptionSchema;

/** Planting areas. */
export const plantingAreaNameSchema = commonNameSchema.describe(
	'The name of the planting area.'
);
export const plantingAreaDescriptionSchema = commonDescriptionSchema;
export const plantingAreaDepthSchema = z
	.number()
	.min(0, 'May not be negative')
	.max(1000, 'May be at most 1000m.')
	.describe('The depth of the planting area.');

/** Geometries.  */
export const coordinateXSchema = z
	.number()
	.min(-1000000, 'Limited to 1 000 000 meters.')
	.max(1000000, 'Limited to 1 000 000 meters.')
	.describe('The horizontal X component of the coordinate.');
export const coordinateYSchema = z
	.number()
	.min(-1000000, 'Limited to 1 000 000 meters.')
	.max(1000000, 'Limited to 1 000 000 meters.')
	.describe('The vertical Y component of the coordinate.');
export const coordinateSchema = z
	.object({
		x: coordinateXSchema,
		y: coordinateYSchema
	})
	.describe('A position relative to the origin of a workspace.');
export const geometryTypeSchema = z
	.enum(GeometryTypeEnum)
	.describe(
		'Describes the type of geometry. Each type has a unique set of attributes associated with it.'
	);
export const geometryDateSchema = z
	.date()
	.describe('The date at which the geometry applies to the object.');
export const geometryScaleFactorSchema = z
	.number()
	.min(0.01, 'Must be at least 1%.')
	.max(100, 'May be at most 10000%')
	.describe(
		'Factor used to scale the geometry up or down. Must be within 1 and 1000 percent.'
	);
export const geometryRotationSchema = z
	.number()
	.min(-360, 'Must be at least negative 360 degrees.')
	.max(360, 'May be at most 360 degrees.')
	.describe(
		'The rotation of the geometry in degrees. Must be between 0 and 360 degrees.'
	);
export const geometryRectangleLengthSchema = z
	.number()
	.min(0, 'May not be negative.')
	.max(1000, 'May be at most 1000m')
	.describe('The horizontal, or x-axis length of the rectangle.');
export const geometryRectangleWidthSchema = z
	.number()
	.min(0, 'May not be negative.')
	.max(1000, 'May be at most 1000m')
	.describe('The vertical, or y-axis width of the rectangle.');
export const geometryPolygonNumSidesSchema = z
	.number()
	.min(3, 'Must have at least 3 sides.')
	.max(20, 'May have at most 20 sides.')
	.describe('The amount of sides the polygon has.');
export const geometryPolygonRadiusSchema = z
	.number()
	.min(0, 'May not be negative')
	.max(1000, 'May be at most 1000m')
	.describe('The distance from the center to any vertex of the polygon.');
export const geometryEllipseLengthDiameterSchema = z
	.number()
	.min(0, 'May not be negative')
	.max(1000, 'May be at most 1000m')
	.describe('The horizontal, or x-axis diameter of the ellipse.');
export const geometryEllipseWidthDiameterSchema = z
	.number()
	.min(0, 'May not be negative')
	.max(1000, 'May be at most 1000m')
	.describe(
		'The vertical, or y-axis diameter of the ellipse. Must be between 0 and 1000 meters.'
	);
export const geometryLinesCoordinatesSchema = z
	.array(coordinateSchema)
	.min(3, 'Must have at least 3 points.')
	.describe(
		'A list of coordinates relative to the position of the geometry which define an irregular polygonal.'
	);
export const geometryLinesClosedSchema = z
	.boolean()
	.describe('If true, the line segments form a closed shape.');

/** Commands. */

/**
 * Create a new location.
 */
export const LocationCreateCommandSchema = z.object({
	gardenId: z.string(),
	workspaceId: z.string(),
	coordinate: coordinateSchema,
	date: z.date()
});
export type LocationCreateCommand = z.infer<typeof LocationCreateCommandSchema>;

/**
 * Create a new geometry.
 */
export const GeometryCreateCommandSchema = z.object({
	type: geometryTypeSchema.default('RECTANGLE'),
	date: geometryDateSchema,
	scaleFactor: geometryScaleFactorSchema.default(1),
	rotation: geometryRotationSchema.default(0),
	rectangleAttributes: z.object({
		length: geometryRectangleLengthSchema.default(1),
		width: geometryRectangleWidthSchema.default(1)
	}),
	polygonAttributes: z.object({
		numSides: geometryPolygonNumSidesSchema.default(3),
		radius: geometryPolygonRadiusSchema.default(1)
	}),
	ellipseAttributes: z.object({
		lengthDiameter: geometryEllipseLengthDiameterSchema.default(1),
		widthDiameter: geometryEllipseWidthDiameterSchema.default(1)
	}),
	linesAttributes: z.object({
		coordinates: geometryLinesCoordinatesSchema.default([
			{ x: -1, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 0 }
		]),
		closed: geometryLinesClosedSchema.default(true)
	})
});
export type GeometryCreateCommand = z.infer<typeof GeometryCreateCommandSchema>;

/**
 * Create a new workspace.
 */
export const WorkspaceCreateCommandSchema = z.object({
	gardenId: z.string(),
	name: workspaceNameSchema,
	description: workspaceDescriptionSchema.optional()
});
export type WorkspaceCreateCommand = z.infer<typeof WorkspaceCreateCommandSchema>;

/**
 * Create a new planting area.
 */
export const PlantingAreaCreateCommandSchema = z.object({
	gardenId: z.string(),
	workspaceId: z.string(),
	name: plantingAreaNameSchema,
	description: plantingAreaDescriptionSchema.default(''),
	location: LocationCreateCommandSchema,
	geometry: GeometryCreateCommandSchema,
	depth: plantingAreaDepthSchema.default(0)
});
export type PlantingAreaCreateCommand = z.infer<typeof PlantingAreaCreateCommandSchema>;
