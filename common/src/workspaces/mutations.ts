import z from 'zod';
import { GeometryTypeEnum, type GeometryType } from './schema';

/** The maximum supported magnitude of a coordinate. */
const maxCoordinateMagnitude = 1000000;

/** Field specifications. */
export const workspaceFields = {
	coordinate: z
		.object({
			x: z.number().describe('The horizontal X component of the coordinate.'),
			y: z.number().describe('The vertical Y component of the coordinate.')
		})
		.describe('A position relative to the origin of a workspace.')
		.refine(
			(data) => {
				if (data.x ** 2 + data.y ** 2 > maxCoordinateMagnitude ** 2) {
					return false;
				}
				return true;
			},
			{
				message: 'Coordinate magnitude limited to 1 000 000 meters.',
				path: ['x', 'y']
			}
		),
	geometryType: z
		.enum(GeometryTypeEnum)
		.describe(
			'Describes the type of geometry. Each type has a unique set of attributes associated with it.'
		),
	geometryDate: z
		.date()
		.describe('The date at which the geometry applies to the object.'),
	geometryScaleFactor: z
		.number()
		.min(0.01, 'Must be at least 1%.')
		.max(10, 'May be at most 1000$')
		.describe(
			'Factor used to scale the geometry up or down. Must be within 1 and 1000 percent.'
		),
	geometryRotation: z
		.number()
		.min(-360, 'Must be at least negative 360 degrees.')
		.max(360, 'May be at most 360 degrees.')
		.describe(
			'The rotation of the geometry in degrees. Must be between 0 and 360 degrees.'
		),

	workspaceName: z
		.string()
		.trim()
		.min(3, 'Must be at least 3 characters.')
		.max(30, 'May be at most 30 characters.')
		.regex(
			/^[a-zA-Z0-9 _-]*$/,
			'Must contain only alphanumeric characters, spaces, hyphens, and underscores.'
		)
		.describe(
			'Must be between 3 and 30 characters long and contain only alphanumeric characters, spaces, hyphens, and  underscores. Must be unique within a garden.'
		),
	workspaceDescription: z
		.string()
		.trim()
		.max(700, 'May be at most 1400 characters.')
		.describe('May be at most 1400 characters.')
		.default(''),
	plantingAreaName: z
		.string()
		.trim()
		.min(3, 'Must be at least 3 characters.')
		.max(30, 'May be at most 30 characters.')
		.regex(
			/^[a-zA-Z0-9 _-]*$/,
			'Must contain only alphanumeric characters, spaces, hyphens, and underscores.'
		)
		.describe(
			'The name of the planting area. Must be between 3 and 30 characters long and contain only alphanumeric characters, spaces, hyphens, and  underscores.'
		),
	plantingAreaDescription: z
		.string()
		.trim()
		.max(700, 'May be at most 1400 characters.')
		.describe('May be at most 1400 characters.')
		.default(''),
	plantingAreaDepth: z
		.number()
		.min(0, 'May not be negative')
		.max(1000, 'May be at most 1000m.')
		.describe('The depth of the planting area.'),
	plantingAreaGridNumRows: z
		.number()
		.int()
		.min(2)
		.max(100)
		.describe(
			'The number of rows in the grid. Must be between 2 and 100, and be whole number.'
		)
		.default(2),
	plantingAreaGridNumColumns: z
		.number()
		.int()
		.min(2)
		.max(100)
		.describe(
			'The number of columns in the grid. Must be between 2 and 100, and be a whole number.'
		)
		.default(2)
};

/**
 * Given a geometry type, ensure the associated attributes are included.
 * @param type The geometry type.
 * @param rectangleAttributesNullish True if the rectangle attributes aren't included.
 * @param polygonAttributesNullish True if the polygon attributes aren't included.
 * @param ellipseAttributesNullish True if the ellipse attributes aren't included.
 * @param linesAttributesNullish True if the lines attributes aren't included.
 * @returns
 */
function validateGeometryAttributes(
	type: GeometryType,
	rectangleAttributesNullish: boolean,
	polygonAttributesNullish: boolean,
	ellipseAttributesNullish: boolean,
	linesAttributesNullish: boolean
): boolean {
	if (type == 'RECTANGLE' && rectangleAttributesNullish) {
		return false;
	} else if (type == 'POLYGON' && polygonAttributesNullish) {
		return false;
	} else if (type == 'ELLIPSE' && ellipseAttributesNullish) {
		return false;
	} else if (type == 'LINES' && linesAttributesNullish) {
		return false;
	}
	return true;
}

export const LocationCreateCommandSchema = z.object({
	gardenId: z.string(),
	workspaceId: z.string(),
	coordinate: workspaceFields.coordinate,
	date: z.date()
});

const RectangleAttributesCreateUpdateCommand = z.object({
	length: z
		.number()
		.min(0, 'May not be negative.')
		.max(1000, 'May be at most 1000m')
		.describe(
			'The horizontal, or x-axis length of the rectangle. Must be between 0 and 1000 meters.'
		)
		.optional()
		.default(1),
	width: z
		.number()
		.min(0, 'May not be negative.')
		.max(1000, 'May be at most 1000m')
		.describe(
			'The vertical, or y-axis width of the rectangle. Must be between 0 and 1000 meters.'
		)
		.optional()
		.default(1)
});

const PolygonAttributesCreateUpdateCommand = z.object({
	numSides: z
		.number()
		.min(3, 'Must have at least 3 sides.')
		.max(20, 'May have at most 20 sides.')
		.describe('The amount of sides the polygon has. Must be between 3 and 20 sides.')
		.default(3),
	radius: z
		.number()
		.min(0, 'May not be negative')
		.max(1000, 'May be at most 1000m')
		.describe(
			'The distance from the center to any vertex of the polygon. Must be between 0 and 1000 meters.'
		)
		.default(1)
});

const EllipseAttributesCreateUpdateCommand = z.object({
	lengthDiameter: z
		.number()
		.min(0, 'May not be negative')
		.max(1000, 'May be at most 1000m')
		.describe(
			'The horizontal, or x-axis diameter of the ellipse. Must be between 0 and 1000 meters.'
		)
		.default(1),
	widthDiameter: z
		.number()
		.min(0, 'May not be negative')
		.max(1000, 'May be at most 1000m')
		.describe(
			'The vertical, or y-axis diameter of the ellipse. Must be between 0 and 1000 meters.'
		)
		.default(1)
});

const LinesAttributesCreateUpdateCommand = z.object({
	coordinates: z
		.array(workspaceFields.coordinate)
		.min(3)
		.describe(
			'A list of coordinates relative to the position of the geometry which define a custom.'
		)
		.default([
			{ x: -1, y: -1 },
			{ x: 1, y: -1 },
			{ x: 0, y: 1 }
		]),
	closed: z
		.boolean()
		.describe('If true, the line segments form a closed shape.')
		.default(true)
});

export const GeometryCreateCommandSchema = z
	.object({
		type: workspaceFields.geometryType,
		date: workspaceFields.geometryDate,
		scaleFactor: workspaceFields.geometryScaleFactor.default(1),
		rotation: workspaceFields.geometryRotation.default(0),
		rectangleAttributes: RectangleAttributesCreateUpdateCommand,
		polygonAttributes: PolygonAttributesCreateUpdateCommand,
		ellipseAttributes: EllipseAttributesCreateUpdateCommand,
		linesAttributes: LinesAttributesCreateUpdateCommand
	})
	.refine(
		(data) => {
			return validateGeometryAttributes(
				data.type,
				!data.rectangleAttributes,
				!data.polygonAttributes,
				!data.ellipseAttributes,
				!data.linesAttributes
			);
		},
		{
			message: 'Included geometry attributes do not satisfy geometry type.',
			path: ['type']
		}
	);

/**
 * Command to create a new workspace.
 */
export const WorkspaceCreateCommandSchema = z.object({
	gardenId: z.string(),
	name: workspaceFields.workspaceName,
	description: workspaceFields.workspaceDescription.optional()
});

export const PlantingAreaCreateCommandSchema = z.object({
	gardenId: z.string(),
	workspaceId: z.string(),
	name: workspaceFields.plantingAreaName,
	description: workspaceFields.plantingAreaDescription.optional(),
	location: LocationCreateCommandSchema,
	geometry: GeometryCreateCommandSchema,
	includeGrid: z.boolean().default(true),
	gridNumRows: workspaceFields.plantingAreaGridNumRows.optional(),
	gridNumCols: workspaceFields.plantingAreaGridNumColumns.optional(),
	depth: workspaceFields.plantingAreaDepth
});

export const PlantingAreaUpdateCommandSchema = z.object({
	plantingAreaId: z.string(),
	name: workspaceFields.plantingAreaName.optional(),
	description: workspaceFields.plantingAreaDescription.optional(),
	includeGrid: z.boolean().optional(),
	gridNumRows: workspaceFields.plantingAreaGridNumRows.optional(),
	gridNumCols: workspaceFields.plantingAreaGridNumColumns.optional(),
	depth: workspaceFields.plantingAreaDepth.optional()
});

export type LocationCreateCommand = z.infer<typeof LocationCreateCommandSchema>;
export type GeometryCreateCommand = z.infer<typeof GeometryCreateCommandSchema>;
export type WorkspaceCreateCommand = z.infer<typeof WorkspaceCreateCommandSchema>;
export type PlantingAreaCreateCommand = z.infer<typeof PlantingAreaCreateCommandSchema>;
export type PlantingAreaUpdateCommand = z.infer<typeof PlantingAreaUpdateCommandSchema>;
