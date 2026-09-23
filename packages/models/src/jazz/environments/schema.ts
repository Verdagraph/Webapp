import { type TableRow, schema as s } from 'jazz-tools';

import { EnvironmentParentTypeEnumOptions } from '../../environments/schema.js';

export { EnvironmentParentTypeEnumOptions };

export type JazzFrostDateProfile = {
	lastFrostDate?: Date;
	firstFrostDate?: Date;
};
export type JazzAnnualTemperatureProfile = {
	minimum?: number;
	maximum?: number;
};
export type JazzEnvironmentAttributes = {
	frostDates?: JazzFrostDateProfile;
	annualTemperature?: JazzAnnualTemperatureProfile;
};

export const environmentSchema = {
	/** Environment schema. */
	environments: s.table({
		/** Non-unique name of the environment. */
		name: s.string(),
		/** Optional description. */
		description: s.string().default(''),
		/** Type of the parent entity of the environment. */
		parentType: s.enum(...EnvironmentParentTypeEnumOptions).default('GARDEN'),
		/** Garden the environment exists in. Defined regardless of parentType. */
		gardenId: s.ref('gardens'),
		/** The workspaces the environment applies to. Defined only if parentType = 'WORKSPACE'. */
		workspaceIds: s.array(s.string()).optional(),
		/** The planting areas the environment applies to. Defined only if parentType = 'PLANTING_AREA'. */
		plantingAreaIds: s.array(s.string()).optional(),
		/** The geometry history the environment applies to. Defined only if parentType = 'INDEPENDENT'. */
		geometryHistoryId: s.ref('geometryHistories').optional(),
		/** The location history the environment geometry exists at. Defined only if parentType = 'INDEPENDENT'. */
		locationHistoryId: s.ref('locationHistories').optional(),
		/**
		 * If true, the environment will inherit the attributes of the
		 * environments defined at higher levels, e.g. that of a planting
		 * area in a workspace.
		 */
		inherit: s.boolean().default(true),
		/**
		 * Untyped: see JazzEnvironmentAttributes for the intended shape.
		 * `.default({})` rather than `.optional()`: an alpha bug rejects any
		 * explicit value written to an `.optional()` json column (see
		 * SPIKE_NOTES.md) - `.default({})` writes and reads correctly.
		 */
		attributes: s.json().default({})
	})
};
export type JazzEnvironment = Omit<
	TableRow<typeof environmentSchema, 'environments'>,
	'attributes'
> & {
	attributes?: JazzEnvironmentAttributes;
};
export type JazzEnvironmentParent = (typeof EnvironmentParentTypeEnumOptions)[number];
