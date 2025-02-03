import { Schema as S, ClientSchema, Entity, or } from '@triplit/client';
import { EnvironmentAttributes } from './attributes';

/**
 * Defines the parent entity that the environment describes characteristics for.
 * - GARDEN: the environment applies to a garden.
 * - WORKSPACE: the environment applies to a workspace.
 * - PLANTING_AREA: the environment applies to a planting area.
 * - INDEPENDENT: the environment applies to an independent geometry.
 */
export const EnvironmentParentTypeEnum = [
	'GARDEN',
	'WORKSPACE',
	'PLANTING_AREA',
	'INDEPENDENT'
] as const;

export const environmentSchema = {
	/** Environment schema. */
	environments: {
		schema: S.Schema({
			id: S.Id(),

			/** Non-unique name of the environment. */
			name: S.String(),

			/** Optional description. */
			description: S.String({ default: '' }),

			/** Type of the parent entity of the environment. */
			parentType: S.String({ enum: EnvironmentParentTypeEnum, default: 'GARDEN' }),

			/** Garden the environment exists in. Defined regardless of parentType. */
			gardenId: S.String(),
			garden: S.RelationOne('gardens', {
				where: [['id', '=', '$gardenId']]
			}),

			/** The workspace the garden environment to. Defined only if parentType = 'WORKSPACE'. */
			workspaceId: S.Optional(S.String()),
			workspace: S.RelationOne('workspaces', {
				where: [['id', '=', '$workspaceId']]
			}),

			/** The planting area the environment applies to. Defined only if parentType = 'PLANTING_AREA'. */
			plantingAreaId: S.Optional(S.String()),
			plantingArea: S.RelationOne('plantingAreas', {
				where: [['id', '=', '$plantingAreaId']]
			}),

			/** The geometry the environment applies to. Defined only if parentType = 'INDEPENDENT'. */
			geometryHistoryId: S.Optional(S.String()),
			geometriHistory: S.RelationOne('geometryHistories', {
				where: [['id', '=', '$geometryHistoryId']]
			}),

			/** The locations the environment geometry exists at. Defined only if parentType = 'INDEPENDENT'. */
			locationHistoryId: S.Optional(S.String()),
			locationHistory: S.RelationOne('locationHistories', {
				where: [['id', '=', '$locationHistoryId']]
			}),

			/**
			 * If true, the environment will inherit the attributes of the environments
			 * defined at higher levels, eg., that of a planting area in a workspace.
			 */
			inherit: S.Boolean({ default: true }),

			attributes: EnvironmentAttributes
		}),
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
} satisfies ClientSchema;
export type Environment = Entity<typeof environmentSchema, 'environments'>;
