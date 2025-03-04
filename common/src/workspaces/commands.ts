import { type } from 'arktype';
import { GeometryTypeEnum, type GeometryType } from './schema';
import { commonFields } from '@common/commands';

/** The maximum supported magnitude of a coordinate. */
const maxCoordinateMagnitude = 1000000;
const maxCoordinateMagnitudeSquared = maxCoordinateMagnitude ** 2;

/** Field specifications. */
export const workspaceFields = {
	/** Geometries. */
	coordinate: type({
		x: type('number').configure({
			details: 'The horizontal X component of the coordinate.'
		}),
		y: type('number').configure({
			details: 'The vertical Y component of the coordinate.'
		})
	})
		.configure({ details: 'A position relative to the origin of a workspace.' })
		.narrow((data, ctx) => {
			if (data.x ** 2 + data.y ** 2 > maxCoordinateMagnitudeSquared) {
				return true;
			}
			return ctx.reject({
				expected: 'a magnitude less than 1 000 000 meters',
				actual: '',
				path: []
			});
		}),
	geometryType: type.enumerated(...GeometryTypeEnum).configure({
		details:
			'Describes the type of geometry. Each type has a unique set of attributes associated with it.'
	}),
	geometryDate: type('Date').configure({
		details: 'The date at which the geometry applies to the object.'
	}),
	geometryScaleFactor: type('0 <= number <= 100')
		.describe('between 0 and 10000 percent')
		.configure({ details: 'Factor used to scale the geometry up or down.' }),
	geometryRotation: type('-360 <= number <= 360')
		.describe('between negative and positive 360 degrees')
		.configure({ details: 'The rotation of the geometry in degrees.' }),

	/** Workspaces. */
	workspaceName: commonFields.name.configure({ details: 'Name of the workspace.' }),
	workspaceDescription: commonFields.description.configure({
		details: 'Optional description.'
	}),

	/** Planting areas. */
	plantingAreaName: commonFields.name.configure({
		details: 'Name of the planting area.'
	}),
	plantingAreaDescription: commonFields.description.configure({
		details: 'Optional description.'
	}),
	plantingAreaDepth: type('0 <= number <= 1000')
		.describe('between 0 and 1000 meters')
		.configure({ details: 'The depth the planting area. Used for calculating volume.' })
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
/*
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
}*/

/** Creates a new location. */
export const LocationCreateCommandSchema = type({
	gardenId: 'string',
	workspaceId: 'string',
	coordinate: workspaceFields.coordinate,
	date: 'Date'
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

export const GeometryCommand = type({
	type: workspaceFields.geometryType,
	date: workspaceFields.geometryDate,
	scaleFactor: workspaceFields.geometryScaleFactor.default(1),
	rotation: workspaceFields.geometryRotation.default(0),
	rectangle: "number"
}).narrow((data, ctx) => {
	if (data.type === 'RECTANGLE' && !data.rectangle) {
		ctx.mustBe('defined')
	}
	return true
})

export const GeometryCreateCommand = z
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
export const WorkspaceCreateCommand = z.object({
	gardenId: z.string(),
	name: workspaceFields.workspaceName,
	description: workspaceFields.workspaceDescription.optional()
});

export const PlantingAreaCreateCommand = z.object({
	gardenId: z.string(),
	workspaceId: z.string(),
	name: workspaceFields.plantingAreaName,
	description: workspaceFields.plantingAreaDescription.optional(),
	location: LocationCreateCommand,
	geometry: GeometryCreateCommand,
	includeGrid: z.boolean().default(true),
	grid: workspaceFields.plantingAreaGrid,
	depth: workspaceFields.plantingAreaDepth,
	movable: workspaceFields.plantingAreaMovable
});
