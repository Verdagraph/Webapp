import z from 'zod';
import { GeometryTypeEnum } from './schema';

/** Field specifications. */
export const workspaceFields = {
	coordinate: z.object({
		x: z
			.number()
			.min(-100000, 'Must be at least negative 100000 meters.')
			.max(100000, 'May be at most 100000 meters.')
			.describe(
				'The horizontal X component of the coordinate. Must be between -100000 and 100000'
			),
		y: z
			.number()
			.min(-100000, 'Must be at least negative 100000 meters.')
			.max(100000, 'May be at most 100000 meters.')
			.describe(
				'The vertical Y component of the coordinate. Must be between -100000 and 100000'
			)
	}),
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
		.min(0, 'Must not be negative.')
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
		.describe('May be at most 1400 characters.'),
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
			'Must be between 3 and 30 characters long and contain only alphanumeric characters, spaces, hyphens, and  underscores. Must be unique within a garden.'
		),
	plantingAreaDescription: z
		.string()
		.trim()
		.max(700, 'May be at most 1400 characters.')
		.describe('May be at most 1400 characters.'),
	plantingAreaDepth: z
		.number()
		.min(0, 'May not be negative')
		.max(1000, 'May be at most 1000m.')
		.describe('The depth of the planting area.'),
	plantingAreaMovable: z
		.boolean()
		.default(false)
		.describe('If true the planting area may change location.'),
	plantingAreaGrid: z.object({
		numRows: z
			.number()
			.min(2)
			.max(100)
			.describe('The number of rows in the grid. Must be between 2 and 100.'),
		numColumns: z
			.number()
			.min(2)
			.max(100)
			.describe('The number of columns in the grid. Must be between 2 and 100.')
	})
};

function validateGeometryAttributes(
	type: (typeof GeometryTypeEnum)[number],
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

const LocationCreateCommand = z.object({
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
		.default(0),
	width: z
		.number()
		.min(0, 'May not be negative.')
		.max(1000, 'May be at most 1000m')
		.describe(
			'The vertical, or y-axis width of the rectangle. Must be between 0 and 1000 meters.'
		)
		.optional()
		.default(0)
});

const PolygonAttributesCreateUpdateCommand = z.object({
	numSides: z
		.number()
		.min(3, 'Must have at least 3 sides.')
		.max(20, 'May have at most 20 sides.')
		.describe('The amount of sides the polygon has. Must be between 3 and 20 sides.')
		.default(3),
	sideLength: z
		.number()
		.min(0, 'May not be negative')
		.max(1000, 'May be at most 1000m')
		.describe(
			'The length of each side of the polygon.  Must be between 0 and 1000 meters.'
		)
		.default(0)
});

const EllipseAttributesCreateUpdateCommand = z.object({
	lengthDiameter: z
		.number()
		.min(0, 'May not be negative')
		.max(1000, 'May be at most 1000m')
		.describe(
			'The horizontal, or x-axis diameter of the ellipse. Must be between 0 and 1000 meters.'
		),
	widthDiameter: z
		.number()
		.max(0, 'May not be negative')
		.max(1000, 'May be at most 1000m')
		.describe(
			'The vertical, or y-axis diameter of the ellipse. Must be between 0 and 1000 meters.'
		)
});

const LinesAttributesCreateUpdateCommand = z.object({
	coordinates: z.array(workspaceFields.coordinate)
});

const GeometryCreateCommand = z
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
			message: 'Included geometry attributes does not satisfy geometry type.',
			path: ['type']
		}
	);

const GeometryUpdateCommand = z
	.object({
		type: z.enum(GeometryTypeEnum),
		date: z.date().optional(),
		scaleFactor: workspaceFields.geometryScaleFactor.optional(),
		rotation: workspaceFields.geometryRotation.optional(),
		rectangleAttributes: RectangleAttributesCreateUpdateCommand.optional(),
		polygonAttributes: PolygonAttributesCreateUpdateCommand.optional(),
		ellipseAttributes: EllipseAttributesCreateUpdateCommand.optional(),
		linesAttributes: LinesAttributesCreateUpdateCommand.optional()
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
			message: 'Included geometry attributes does not satisfy geometry type.',
			path: ['type']
		}
	);

/**
 * Command to create a new workspace.
 */
export const WorkspaceCreateCommand = z.object({
	gardenId: z.string(),
	name: workspaceFields.workspaceName,
	description: workspaceFields.workspaceDescription.optional()
});

export const PlantingAreaCreateCommand = z.object({
	workspaceId: z.string(),
	name: workspaceFields.plantingAreaName,
	description: workspaceFields.plantingAreaDescription.optional(),
	location: LocationCreateCommand,
	geometry: GeometryCreateCommand,
	grid: workspaceFields.plantingAreaGrid,
	depth: workspaceFields.plantingAreaDepth,
	movable: workspaceFields.plantingAreaMovable
});
