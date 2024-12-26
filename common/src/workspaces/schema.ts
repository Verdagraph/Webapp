import {
	Schema as S,
	ClientSchema,
	Entity,
	or,
	EntityWithSelection
} from '@triplit/client';

/**
 * Specifies a type of geometry.
 * Each geometry type is associated with a different record type
 * describing its features.
 * RECTANGLE: a closed shape specified by width and height.
 * POLYGON: a closed shape specified by a number of sides and their length.
 * ELLIPSE: a closed shape specified by a major and minor radius.
 * LINES: a closed or open shape specified by a set of joined line segments.`
 */
export const GeometryTypeEnum = ['RECTANGLE', 'POLYGON', 'ELLIPSE', 'LINES'] as const;

export const workspaceSchema = {
	/** Coordinate schema. */
	coordinates: {
		schema: S.Schema({
			id: S.Id(),

			/** Garden the entity is located within - required for access control. */
			gardenId: S.String(),
			garden: S.RelationOne('gardens', { where: [['id', '=', '$gardenId']] }),

			/** The horizontal X component of the coordinate in meters. */
			x: S.Number(),

			/** The vertical Y component of the coordinate in meters. */
			y: S.Number(),

			/** The depth/altitude component of the coordinate in meters. */
			z: S.Number({ nullable: true, default: 0 })
		}),
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the garden is public. */
					filter: [['garden.visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is public or the user is a member. */
					filter: [
						or([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					/** Allow new coordinates to be created by admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					/** Restrict coordinates updates to admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					/** Restrict coordinates deletes to admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	},
	/** Geometries schema. */
	geometries: {
		schema: S.Schema({
			id: S.Id(),

			/** Garden the entity is located within - required for access control. */
			gardenId: S.String(),
			garden: S.RelationOne('gardens', { where: [['id', '=', '$gardenId']] }),

			/**
			 * Describes the type of the geometry.
			 * Each geometry object may be of any type. The type determines
			 * which of the attributes objects is used in the application.
			 * For example, if the type is 'ELLIPSE', only the ellipseAttribute
			 * object is used and other attributes are ignored.
			 */
			type: S.String({ enum: GeometryTypeEnum }),

			/** The date at which this geometry applies. */
			date: S.Date(),

			/** Scalar size multiplier. */
			scaleFactor: S.Number({ default: 1 }),

			/** Rotation of the geometry about its center or location, in degrees. */
			rotation: S.Number({ default: 0 }),

			/** Attributes. */

			/** Rectangular geometry attributes. */
			rectangleAttributes: S.Optional(
				S.Record({
					/** Horizontal length of the rectangle in meters. */
					length: S.Number(),

					/** Vertical width of the rectangle in meters. */
					width: S.Number()
				})
			),

			/** Polygon geometry attributes. */
			polygonAttributes: S.Optional(
				S.Record({
					/** Number of sides to the polygon. */
					numSides: S.Number(),

					/** Polygon radius. */
					radius: S.Number()
				})
			),

			/** Ellipe geometry attributes. */
			ellipseAttributes: S.Optional(
				S.Record({
					/** The length of the horizontal diameter in meters. */
					lengthDiameter: S.Number(),

					/** The width of the vertical diameter in meters. */
					widthDiameter: S.Number()
				})
			),

			/** Lines geometry attributes. */
			linesAttributes: S.Optional(
				S.Record({
					/** A set of coordinates which describe an open or closed shape of line segments. */
					coordinateIds: S.Set(S.String()),
					coordinates: S.RelationMany('coordinates', {
						where: [['id', 'in', '$linesAttributes.coordinateIds']]
					}),

					/** If true the lines form a closed shape. */
					closed: S.Boolean({default: true})
				})
			)
		}),
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the garden is public. */
					filter: [['garden.visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is public or the user is a member. */
					filter: [
						or([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					/** Allow new geometries to be created by admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					/** Restrict geometry updates to admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					/** Restrict geometry deletes to admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	},
	/** GeometricHistory schema. */
	geometryHistories: {
		schema: S.Schema({
			id: S.Id(),

			/** Garden the entity is located within - required for access control. */
			gardenId: S.String(),
			garden: S.RelationOne('gardens', { where: [['id', '=', '$gardenId']] }),

			/** A set of geometries which describe a history of geometric change. */
			geometryIds: S.Set(S.String()),
			geometries: S.RelationMany('geometries', {
				where: [['id', 'in', '$geometryIds']]
			})
		}),
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the garden is public. */
					filter: [['garden.visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is public or the user is a member. */
					filter: [
						or([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					/** Allow new geometry history to be created by admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					/** Restrict geometry history updates to admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					/** Restrict geometry histories deletes to admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	},
	/** Location schema. */
	locations: {
		schema: S.Schema({
			id: S.Id(),

			/** Garden the entity is located within - required for access control. */
			gardenId: S.String(),
			garden: S.RelationOne('gardens', { where: [['id', '=', '$gardenId']] }),

			/** The workspace the cordinate is located in. */
			workspaceId: S.String(),
			workspace: S.RelationOne('workspaces', { where: [['id', '=', '$workspaceId']] }),

			/** The coordinate describing the location in the workspace. */
			coordinateId: S.String(),
			coordinate: S.RelationOne('coordinates', {
				where: [['id', '=', '$coordinateId']]
			}),

			/** The date at which the location applies. */
			date: S.Date()
		}),
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the garden is public. */
					filter: [['garden.visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is public or the user is a member. */
					filter: [
						or([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					/** Allow new locations to be created by admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					/** Restrict locations updates to admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					/** Restrict locations deletes to admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	},
	/** Location history schema. */
	locationHistories: {
		schema: S.Schema({
			id: S.Id(),

			/** Garden the entity is located within - required for access control. */
			gardenId: S.String(),
			garden: S.RelationOne('gardens', { where: [['id', '=', '$gardenId']] }),

			/** A set of locations which describe a history of locational change. */
			locationIds: S.Set(S.String()),
			locations: S.RelationMany('locations', { where: [['id', 'in', '$locationIds']] }),

			/** Denormalized set of workspace IDs that are represented by the locations. */
			workspaceIds: S.Set(S.String())
		}),
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the garden is public. */
					filter: [['garden.visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is public or the user is a member. */
					filter: [
						or([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					/** Allow new location history to be created by admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					/** Restrict location history updates to admins. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					/** Restrict location histories deletes to admins. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	},
	/** Planting area schema. */
	plantingAreas: {
		schema: S.Schema({
			id: S.Id(),

			/** Garden the entity is located within - required for access control. */
			gardenId: S.String(),
			garden: S.RelationOne('gardens', { where: [['id', '=', '$gardenId']] }),

			/** The geometry of the planting area. */
			geometryId: S.String(),
			geometry: S.RelationOne('geometries', {
				where: [['id', '=', '$geometryId']]
			}),

			/**
			 * Describes a grid overlaid onto the geometry.
			 * Used for placing plants.
			 */
			grid: S.Optional(
				S.Record({
					numRows: S.Number(),
					numColumns: S.Number()
				})
			),

			/** The location history of the planting area. */
			locationHistoryId: S.String(),
			locationHistory: S.RelationOne('locationHistories', {
				where: [['id', '=', '$locationHistoryId']]
			}),

			/** The depth of the planting area in meters. Used to calculate volume. */
			depth: S.Number({ default: 0 }),

			/**
			 * Whether the planting area can be moved easily.
			 * For example, may be true for a pot but false for a bed.
			 */
			movable: S.Boolean({ default: false }),

			/** Optional description. */
			description: S.String({ default: '' })
		}),
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the garden is public. */
					filter: [['garden.visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is public or the user is a member. */
					filter: [
						or([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					/** Allow new planting areas to be created by admins. */
					filter: [['garden.adminIds', 'has', '$role.profileId']]
				},
				update: {
					/** Restrict planting area updates to admins. */
					filter: [['garden.adminIds', 'has', '$role.profileId']]
				},
				delete: {
					/** Restrict planting area deletes to admins. */
					filter: [['garden.adminIds', 'has', '$role.profileId']]
				}
			}
		}
	},
	/** Workspace schema. */
	workspaces: {
		schema: S.Schema({
			id: S.Id(),

			/** Garden the entity is located within. */
			gardenId: S.String(),
			garden: S.RelationOne('gardens', { where: [['id', '=', '$gardenId']] }),

			/** Name of the workspace. */
			name: S.String(),

			/** URL-friendly shorthand of the name. */
			slug: S.String(),

			/** Optional description. */
			description: S.String({ default: '' })
		}),
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the garden is public. */
					filter: [['garden.visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is public or the user is a member. */
					filter: [
						or([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					/** Allow new workspaces to be created by admins. */
					filter: [['garden.adminIds', 'has', '$role.profileId']]
				},
				update: {
					/** Restrict workspace updates to admins. */
					filter: [['garden.adminIds', 'has', '$role.profileId']]
				},
				delete: {
					/** Restrict workspace deletes to admins. */
					filter: [['garden.adminIds', 'has', '$role.profileId']]
				}
			}
		}
	}
} satisfies ClientSchema;

export type Coordinate = Entity<typeof workspaceSchema, 'coordinates'>;

export type Geometry = Entity<typeof workspaceSchema, 'geometries'>;
export type RectangleAttributes = NonNullable<Geometry['rectangleAttributes']>
export type PolygonAttributes = NonNullable<Geometry['polygonAttributes']>
export type EllipseAttributes = NonNullable<Geometry['ellipseAttributes']>
export type LinesAttributes = NonNullable<Geometry['linesAttributes']>
export type GeometryAttributesMap = {
    'RECTANGLE': RectangleAttributes;
    'POLYGON': PolygonAttributes;
    'ELLIPSE': EllipseAttributes;
    'LINES': LinesAttributes;
}
export type RectangleGeometry = Extract<Geometry, { type: 'RECTANGLE' }>
export type PolygonGeometry = Extract<Geometry, { type: 'POLYGON' }>
export type EllipseGeometry = Extract<Geometry, { type: 'ELLIPSE' }>
export type LinesGeometry = Extract<Geometry, { type: 'LINES' }>

export type GeometryHistory = Entity<typeof workspaceSchema, 'geometryHistories'>;
export type Location = Entity<typeof workspaceSchema, 'locations'>;
export type LocationHistory = Entity<typeof workspaceSchema, 'locationHistories'>;
export type PlantingArea = Entity<typeof workspaceSchema, 'plantingAreas'>;
export type Workspace = Entity<typeof workspaceSchema, 'workspaces'>;