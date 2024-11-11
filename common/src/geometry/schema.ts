import { Schema as S, ClientSchema, Entity, or } from '@triplit/client';

export const GeometryTypeEnum = ['RECTANGLE', 'POLYGON', 'ELLIPSE', 'LINES'] as const;

export const workspaceSchema = {
	/** Coordinate schema. */
	coordinates: {
		schema: S.Schema({
			id: S.Id(),
			x: S.Number(),
			y: S.Number(),
			z: S.Number({ nullable: true, default: null })
		}),
		permissions: {}
	},
	/** Geometries schema. */
	geometries: {
		schema: S.Schema({
			id: S.Id(),
			type: S.String({ enum: GeometryTypeEnum }),
			date: S.Date(),
			scaleFactor: S.Number({ default: 1 }),
			rotation: S.Number({ default: 0 }),
			nulled: S.Boolean({ default: false }),
			rectangleAttributes: S.Optional(
				S.Record({
					length: S.Number(),
					width: S.Number()
				})
			),
			polygonAttributes: S.Optional(
				S.Record({
					shellCoordinateIds: S.Set(S.String()),
					shellCoordinates: S.RelationMany('coordinates', {
						where: [['id', 'in', '$polygonAttributes.shellCoordinateIds']]
					})
				})
			),
			ellipseAttributes: S.Optional(
				S.Record({
					width: S.Number(),
					height: S.Number()
				})
			),
			linesAttributes: S.Optional(
				S.Record({
					coordinateIds: S.Set(S.String()),
					coordinates: S.RelationMany('coordinates', {
						where: [['id', 'in', '$linesAttributes.coordinateIds']]
					})
				})
			)
		}),
		permissions: {}
	},
	geometryHistories: {
		schema: S.Schema({
			id: S.Id(),
			geometryIds: S.Set(S.String()),
			geometries: S.RelationMany('geometries', {
				where: [['id', 'in', '$geometryIds']]
			})
		}),
		permissions: {}
	},
	locations: {
		schema: S.Schema({
			id: S.Id(),
			workspaceId: S.String(),
			workspace: S.RelationOne('workspaces', { where: [['id', '=', '$workspaceId']] }),
			coordinateId: S.String(),
			coordinate: S.RelationOne('coordinates', {
				where: [['id', '=', '$coordinateId']]
			})
		})
	},
	locationHistories: {
		schema: S.Schema({
			id: S.Id(),
			locationIds: S.Set(S.String()),
			locations: S.RelationMany('locations', { where: [['id', 'in', '$locationIds']] })
		})
	},
	plantingAreas: {
		schema: S.Schema({
			id: S.Id(),
			geometryHistoryId: S.String(),
			geometryHistory: S.RelationOne('geometryHistories', {
				where: [['id', '=', '$geometryHistoryId']]
			}),
			locationHistoryId: S.String(),
			locationHistory: S.RelationOne('locationHistories', {
				where: [['id', '=', '$locationHistoryId']]
			}),
			depth: S.Number({ default: 0 }),
			movable: S.Boolean({ default: false }),
			description: S.String({ default: '' })
		})
	},
	workspaces: {
		schema: S.Schema({
			id: S.Id(),
			gardenId: S.String(),
			garden: S.RelationOne('gardens', { where: [['id', '=', '$gardenId']] }),
			name: S.String(),
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
