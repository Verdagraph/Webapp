import { type TableRow, schema as s } from 'jazz-tools';

import { GeometryTypeEnumOptions } from '../../workspaces/schema.js';

export { GeometryTypeEnumOptions };

export const workspaceSchema = {
	/** Coordinate schema. */
	coordinates: s.table({
		/** Garden the entity is located within, required for access control. */
		gardenId: s.ref('gardens'),
		/** The horizontal X component of the coordinate in meters. */
		x: s.float(),
		/** The vertical Y component of the coordinate in meters. */
		y: s.float(),
		/** The depth/altitude component of the coordinate in meters. */
		z: s.float().default(0)
		/**
		 * No explicit ordering column: `linesCoordinateIds` is a plain array
		 * that already preserves insertion order, unlike Triplit's
		 * `RelationMany`, which needed a `createdAt` sort key since sets
		 * there have no reliable iteration order.
		 */
	}),
	/** Geometries schema. */
	geometries: s.table({
		/** Garden the entity is located within, required for access control. */
		gardenId: s.ref('gardens'),
		/**
		 * Optional label for this geometry, e.g. the lifecycle milestone it
		 * represents ("Seed", "First Harvest") when generated automatically.
		 * Not every geometry has one (manually-added entries can be left
		 * unnamed).
		 */
		name: s.string().optional(),
		/**
		 * Describes the type of the geometry. Each geometry object may be of
		 * any type. The type determines which of the attributes objects is
		 * used in the application. For example, if the type is 'ELLIPSE',
		 * only the ellipse attributes are used and other attributes are
		 * ignored.
		 */
		type: s.enum(...GeometryTypeEnumOptions),
		/** The date at which this geometry applies. */
		date: s.timestamp(),
		/** Scalar size multiplier. */
		scaleFactor: s.float().default(1),
		/** Rotation of the geometry about its center or location, in degrees. */
		rotation: s.float().default(0),
		/** Horizontal length of the rectangle in meters. */
		rectangleLength: s.float().default(1),
		/** Vertical width of the rectangle in meters. */
		rectangleWidth: s.float().default(1),
		/** Number of sides to the polygon. */
		polygonNumSides: s.float().default(3),
		/** Polygon radius. */
		polygonRadius: s.float().default(1),
		/** The length of the horizontal diameter in meters. */
		ellipseLength: s.float().default(1),
		/** The width of the vertical diameter in meters. */
		ellipseWidth: s.float().default(1),
		/** A set of coordinates which describe an open or closed shape of line segments. */
		linesCoordinateIds: s.array(s.string()).default([]),
		/** If true the lines form a closed shape. */
		linesClosed: s.boolean().default(true)
	}),
	/** GeometricHistory schema. */
	geometryHistories: s.table({
		/** Garden the entity is located within, required for access control. */
		gardenId: s.ref('gardens'),
		/** A set of geometries which describe a history of geometric change. */
		geometryIds: s.array(s.string()).default([])
	}),
	/** Location schema. */
	locations: s.table({
		/** Garden the entity is located within, required for access control. */
		gardenId: s.ref('gardens'),
		/** The workspace the coordinate is located in. */
		workspaceId: s.ref('workspaces'),
		/** The horizontal X component of the location in meters. */
		x: s.float(),
		/** The vertical Y component of the location in meters. */
		y: s.float(),
		/** The depth/altitude component of the location in meters. */
		z: s.float().default(0),
		/** The date at which the location applies. */
		date: s.timestamp()
	}),
	/** Location history schema. */
	locationHistories: s.table({
		/** Garden the entity is located within, required for access control. */
		gardenId: s.ref('gardens'),
		/** A set of locations which describe a history of locational change. */
		locationIds: s.array(s.string()).default([]),
		/** Denormalized set of workspace IDs that are represented by the locations. */
		workspaceIds: s.array(s.string()).default([])
	}),
	/** Planting area schema. */
	plantingAreas: s.table({
		/** Garden the entity is located within, required for access control. */
		gardenId: s.ref('gardens'),
		/** Name. */
		name: s.string(),
		/** The geometry of the planting area. */
		geometryId: s.ref('geometries'),
		/** The location history of the planting area. */
		locationHistoryId: s.ref('locationHistories'),
		/** The depth of the planting area in meters. Used to calculate volume. */
		depth: s.float().default(0),
		/** Optional description. */
		description: s.string().default('')
	}),
	/** Workspace schema. */
	workspaces: s.table({
		/** Garden the entity is located within. */
		gardenId: s.ref('gardens'),
		/** Name of the workspace. */
		name: s.string(),
		/** URL-friendly shorthand of the name, unique within a garden. */
		slug: s.string(),
		/** Optional description. */
		description: s.string().default('')
	})
};

export type JazzCoordinate = TableRow<typeof workspaceSchema, 'coordinates'>;
export type JazzGeometry = TableRow<typeof workspaceSchema, 'geometries'>;
export type JazzGeometryHistory = TableRow<typeof workspaceSchema, 'geometryHistories'>;
export type JazzLocation = TableRow<typeof workspaceSchema, 'locations'>;
export type JazzLocationHistory = TableRow<typeof workspaceSchema, 'locationHistories'>;
export type JazzPlantingArea = TableRow<typeof workspaceSchema, 'plantingAreas'>;
export type JazzWorkspace = TableRow<typeof workspaceSchema, 'workspaces'>;
