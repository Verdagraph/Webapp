import { type TableRow, schema as s } from 'jazz-tools';

import { ObservationIds } from '../../observations/ids.js';

export const observationSchema = {
	/** Observation schema. */
	observations: s.table({
		/** Garden the entity is located within, required for access control. */
		gardenId: s.ref('gardens'),
		/** Type of observation: plant/harvest, environment/air_temperature, etc. */
		type: s.enum(...ObservationIds),
		/** IDs of the primary entities which the observation applies to. */
		entityIds: s.array(s.string()).default([]),
		/** Date of the observation. */
		date: s.timestamp(),
		/**
		 * Optional unstructured data. Structure depends on the observation
		 * type. `.default({})` rather than `.optional()`: an alpha bug
		 * rejects any explicit value written to an `.optional()` json
		 * column (see SPIKE_NOTES.md) - `.default({})` writes and reads
		 * correctly.
		 */
		data: s.json().default({})
	})
};
export type JazzGenericObservation = TableRow<typeof observationSchema, 'observations'>;
export type JazzObservation<TData> = Omit<JazzGenericObservation, 'data'> & {
	data: TData;
};
