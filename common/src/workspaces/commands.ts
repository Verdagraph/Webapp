import { type } from 'arktype';
import { GeometryTypeEnum, type GeometryType } from './schema';
import { commonFields } from '@common/commands';

/** The maximum supported magnitude of a coordinate. */
const maxCoordinateMagnitude = 1000000;
const maxCoordinateMagnitudeSquared = maxCoordinateMagnitude ** 2;

/** Field specifications. */
/** Workspaces. */
export const workspaceNameSchema = commonFields.name.configure({
	details: 'Name of the workspace.'
});
export const workspaceDescriptionSchema = commonFields.description.configure({
	details: 'Optional description.'
});

/** Planting areas. */
export const plantingAreaNameSchema = commonFields.name.configure({
	details: 'Name of the planting area.'
});
export const plantingAreaDescriptionSchema = commonFields.description.configure({
	details: 'Optional description.'
});
export const plantingAreaDepthSchema = type('0 <= number <= 1000')
	.describe('between 0 and 1000 meters')
	.configure({
		details: 'The depth the planting area. Used for calculating volume.'
	});

/** Geometries. */
export const geometryCoordinateSchema = type({
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
	});
export const geometryTypeSchema = type.enumerated(...GeometryTypeEnum).configure({
	details:
		'Describes the type of geometry. Each type has a unique set of attributes associated with it.'
});
export const geometryDateSchema = type('Date').configure({
	details: 'The date at which the geometry applies to the object.'
});
export const geometryScaleFactorSchema = type('0 <= number <= 100')
	.describe('between 0 and 10000 percent')
	.configure({ details: 'Factor used to scale the geometry up or down.' });
export const geometryRotationSchema = type('-360 <= number <= 360')
	.describe('between negative and positive 360 degrees')
	.configure({ details: 'The rotation of the geometry in degrees.' });
export const geometryRectangleLengthSchema = type('0 <= number <= 1000')
	.describe('between 0 and 1000 meters')
	.configure({ details: 'The horizontal, or x-axis length of the rectangle.' });
export const geometryRectangleWidthSchema = type('0 <= number <= 1000')
	.describe('between 0 and 1000 meters')
	.configure({ details: 'The vertical, or y-axis length of the rectangle.' });
export const geometryPolygonNumSidesSchema = type('3 <= number.integer <= 20')
	.describe('between 3 and 20 sides')
	.configure({ details: 'The amount of sides the polygon has.' });
export const geometryPolygonRadiusSchema = type('0 <= number <= 1000')
	.describe('between 0 and 1000 meters')
	.configure({ details: 'The distance from the center to any vertex of the polygon.' });
export const geometryEllipseLengthDiameterSchema = type('0 <= number <= 1000')
	.describe('between 0 and 1000 meters')
	.configure({ details: 'The horizontal, or x-axis diameter of the ellipse.' });
export const geometryEllipseWidthDiameterSchema = type('0 <= number <= 1000')
	.describe('between 0 and 1000 meters')
	.configure({ details: 'The vertical, or y-axis diameter of the ellipse.' });
export const geometryLinesCoordinatesSchema = geometryCoordinateSchema
	.array()
	.atLeastLength(3)
	.describe('at least 3 points')
	.configure({
		details:
			'A list of coordinates relative to the position of the geometry which define an irregular polygon.'
	});
export const geometryLinesClosedSchema = type('boolean').configure({
	details: 'If true, the line segments form a closed shape.'
});

/** Commands. */

/** Creates a new location. */
export const LocationCreateCommandSchema = type({
	gardenId: 'string',
	workspaceId: 'string',
	coordinate: geometryLinesCoordinatesSchema,
	date: 'Date'
});

/** Creates a new geometry. */
export const GeometryCreateCommandSchema = type({
	type: geometryTypeSchema,
	date: geometryDateSchema,
	scaleFactor: geometryScaleFactorSchema.default(1),
	rotation: geometryRotationSchema.default(0),
	rectangleAttributes: type({
		length: geometryRectangleLengthSchema.default(1),
		width: geometryRectangleWidthSchema.default(1)
	}),
	polygonAttributes: type({
		numSides: geometryPolygonNumSidesSchema.default(3),
		radius: geometryPolygonRadiusSchema.default(1)
	}),
	ellipseAttributes: type({
		lengthDiameter: geometryEllipseLengthDiameterSchema.default(1),
		widthDiameter: geometryEllipseWidthDiameterSchema.default(1)
	}),
	linesAttributes: type({
		coordinates: geometryLinesCoordinatesSchema.default(() => [
			{ x: -1, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 0 }
		]),
		closed: geometryLinesClosedSchema.default(true)
	})
});

/**
 * Command to create a new workspace.
 */
export const WorkspaceCreateCommandSchema = type({
	gardenId: 'string',
	name: workspaceNameSchema,
	description: workspaceDescriptionSchema.optional()
});

/** Command to create a new planting area. */
export const PlantingAreaCreateCommandSchema = type({
	gardenId: 'string',
	workspaceId: 'string',
	name: plantingAreaNameSchema,
	description: plantingAreaDescriptionSchema.optional(),
	location: LocationCreateCommandSchema,
	geometry: GeometryCreateCommandSchema,
	depth: plantingAreaDepthSchema.default(1)
});
