import { Schema as S, type Entity, or } from '@triplit/client';
import { EnvironmentAttributes } from './attributes/index.js';
import { workspaceSchema } from '../workspaces/schema.js';

/**
 * Defines the parent entity that the environment describes characteristics for.
 * - GARDEN: the environment applies to a garden.
 * - WORKSPACE: the environment applies to a workspace.
 * - PLANTING_AREA: the environment applies to a planting area.
 * - INDEPENDENT: the environment applies to an independent geometry.
 */
export const EnvironmentParentTypeEnumOptions = [
	'GARDEN',
	'WORKSPACE',
	'PLANTING_AREA',
	'INDEPENDENT'
] as const;

export const environmentSchema = S.Collections({
	...workspaceSchema,
	/** Environment schema. */
	environments: {
		schema: S.Schema({
			id: S.Id(),

			/** Non-unique name of the environment. */
			name: S.String(),

			/** Optional description. */
			description: S.String({ default: '' }),

			/** Type of the parent entity of the environment. */
			parentType: S.String({
				enum: [...EnvironmentParentTypeEnumOptions],
				default: 'GARDEN'
			}),

			/** Garden the environment exists in. Defined regardless of parentType. */
			gardenId: S.String(),

			/** The workspaces the environment applies to. Defined only if parentType = 'WORKSPACE'. */
			workspaceIds: S.Optional(S.Set(S.String())),

			/** The planting areas the environment applies to. Defined only if parentType = 'PLANTING_AREA'. */
			plantingAreaIds: S.Optional(S.Set(S.String())),

			/** The geometry the environment applies to. Defined only if parentType = 'INDEPENDENT'. */
			geometryHistoryId: S.Optional(S.String()),

			/** The locations the environment geometry exists at. Defined only if parentType = 'INDEPENDENT'. */
			locationHistoryId: S.Optional(S.String()),

			/**
			 * If true, the environment will inherit the attributes of the environments
			 * defined at higher levels, eg., that of a planting area in a workspace.
			 */
			inherit: S.Boolean({ default: true }),

			attributes: EnvironmentAttributes
		}),
		relationships: {
			garden: S.RelationById('gardens', '$gardenId'),
			workspaces: S.RelationMany('workspaces', {
				where: [['id', 'in', '$workspaceIds']]
			}),
			plantingAreas: S.RelationMany('plantingAreas', {
				where: [['id', 'in', '$plantingAreaIds']]
			}),
			geometriHistory: S.RelationById('geometryHistories', '$geometryHistoryId'),
			locationHistory: S.RelationById('locationHistories', '$locationHistoryId')
		},
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the garden is not hidden. */
					filter: [['garden.visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is not hidden or the user is a member. */
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
					/** Allow new environments to be created by admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					/** Restrict environment updates to admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					/** Restrict environment deletes to admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	}
});
export type Environment = Entity<typeof environmentSchema, 'environments'>;
export type EnvironmentParent = (typeof EnvironmentParentTypeEnumOptions)[number];
