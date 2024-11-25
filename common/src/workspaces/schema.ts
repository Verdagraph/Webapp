import { Schema as S, ClientSchema, Entity, or } from '@triplit/client';

/**
 * Specifies a type of geometry.
 * Each geometry type is associated with a different record type
 * describing its features.
 * RECTANGLE: a closed shape specified by width and height.
 * POLYGON: a closed shape specified by a set of joined line segments.
 * ELLIPSE: a closed shape specified by a major and minor radius.
 * LINES: an open shape specified by a set of joined line segments.`
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
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds'],
							['$role.userId', 'in', 'garden.viewerIds']
						])
					]
				},
				insert: {
					/** Allow new coordinates to be created by admins and editors. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
						])
					]
				},
				update: {
					/** Restrict coordinates updates to admins. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
						])
					]
				},
				delete: {
					/** Restrict coordinates deletes to admins. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
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
					/** A set of coordinates which describe a closed shape of line segments. */
					shellCoordinateIds: S.Set(S.String()),
					shellCoordinates: S.RelationMany('coordinates', {
						where: [['id', 'in', '$polygonAttributes.shellCoordinateIds']]
					})
				})
			),

			/** Ellipe geometry attributes. */
			ellipseAttributes: S.Optional(
				S.Record({
					/** The length of the horizontal radius in meters. */
					lengthRadius: S.Number(),

					/** The width of the vertical radius in meters. */
					widthRadius: S.Number()
				})
			),

			/** Lines geometry attributes. */
			linesAttributes: S.Optional(
				S.Record({
					/** A set of coordinates which describe an open shape of line segments. */
					coordinateIds: S.Set(S.String()),
					coordinates: S.RelationMany('coordinates', {
						where: [['id', 'in', '$linesAttributes.coordinateIds']]
					})
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
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds'],
							['$role.userId', 'in', 'garden.viewerIds']
						])
					]
				},
				insert: {
					/** Allow new geometries to be created by admins and editors. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
						])
					]
				},
				update: {
					/** Restrict geometry updates to admins. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
						])
					]
				},
				delete: {
					/** Restrict geometry deletes to admins. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
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
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds'],
							['$role.userId', 'in', 'garden.viewerIds']
						])
					]
				},
				insert: {
					/** Allow new geometry history to be created by admins and editors. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
						])
					]
				},
				update: {
					/** Restrict geometry history updates to admins. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
						])
					]
				},
				delete: {
					/** Restrict geometry histories deletes to admins. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
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
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds'],
							['$role.userId', 'in', 'garden.viewerIds']
						])
					]
				},
				insert: {
					/** Allow new locations to be created by admins and editors. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
						])
					]
				},
				update: {
					/** Restrict locations updates to admins. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
						])
					]
				},
				delete: {
					/** Restrict locations deletes to admins. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
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
			locations: S.RelationMany('locations', { where: [['id', 'in', '$locationIds']] })
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
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds'],
							['$role.userId', 'in', 'garden.viewerIds']
						])
					]
				},
				insert: {
					/** Allow new location history to be created by admins and editors. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
						])
					]
				},
				update: {
					/** Restrict location history updates to admins. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
						])
					]
				},
				delete: {
					/** Restrict location histories deletes to admins. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds']
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

			/** The geometric history of the planting area. */
			geometryHistoryId: S.String(),
			geometryHistory: S.RelationOne('geometryHistories', {
				where: [['id', '=', '$geometryHistoryId']]
			}),

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
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds'],
							['$role.userId', 'in', 'garden.viewerIds']
						])
					]
				},
				insert: {
					/** Allow new planting areas to be created by admins. */
					filter: [['$role.userId', 'in', 'garden.adminIds']]
				},
				update: {
					/** Restrict planting area updates to admins. */
					filter: [['$role.userId', 'in', 'garden.adminIds']]
				},
				delete: {
					/** Restrict planting area deletes to admins. */
					filter: [['$role.userId', 'in', 'garden.adminIds']]
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
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds'],
							['$role.userId', 'in', 'garden.viewerIds']
						])
					]
				},
				insert: {
					/** Allow new workspaces to be created by admins. */
					filter: [['$role.userId', 'in', 'garden.adminIds']]
				},
				update: {
					/** Restrict workspace updates to admins. */
					filter: [['$role.userId', 'in', 'garden.adminIds']]
				},
				delete: {
					/** Restrict workspace deletes to admins. */
					filter: [['$role.userId', 'in', 'garden.adminIds']]
				}
			}
		}
	}
} satisfies ClientSchema;
export type Coordinate = Entity<typeof workspaceSchema, 'coordinates'>;
export type Geometry = Entity<typeof workspaceSchema, 'geometries'>;
export type GeometryHistory = Entity<typeof workspaceSchema, 'geometryHistories'>;
export type Location = Entity<typeof workspaceSchema, 'locations'>;
export type LocationHistory = Entity<typeof workspaceSchema, 'locationHistories'>;
export type PlantingArea = Entity<typeof workspaceSchema, 'plantingAreas'>;
export type Workspace = Entity<typeof workspaceSchema, 'workspaces'>;
