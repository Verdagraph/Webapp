import { type PlantsCreateCommand } from '@vdg-webapp/models';

type SinglePlant = PlantsCreateCommand['plants'][number];

/**
 * A fresh plant for the Single mode form/stamp. Accepts the previous stamp's
 * cultivarName/geometryHistory/locationHistory so they can carry over to the
 * next one, stamp-style: planting several of the same cultivar at
 * (approximately) the same spot/size in a row is the common case, and
 * re-picking/re-placing/re-sizing each one from scratch is pure friction.
 * Omit a field to fall back to an empty history, which
 * PlantsCreateFormModeSingle's seeding effect then fills with the cultivar's
 * default starter geometry centered in the viewport - used for the very
 * first stamp of a cultivar, and by the form's Reset button.
 */
export function defaultSinglePlant(carryForward?: {
	cultivarName?: string;
	origin?: SinglePlant['origin'];
	geometryHistory?: SinglePlant['geometryHistory'];
	locationHistory?: SinglePlant['locationHistory'];
}): SinglePlant {
	return {
		cultivarName: carryForward?.cultivarName ?? '',
		origin: carryForward?.origin ?? 'DIRECT_SEED',
		locationHistory: carryForward?.locationHistory ?? { gardenId: '', locations: [] },
		geometryHistory: carryForward?.geometryHistory ?? { gardenId: '', geometries: [] },
		cultivarOverride: {},
		quantity: 1
	};
}
