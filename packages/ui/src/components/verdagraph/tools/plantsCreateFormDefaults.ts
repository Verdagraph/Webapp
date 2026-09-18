import { type PlantsCreateCommand } from '@vdg-webapp/models';

/** A fresh, unconfigured plant for the Single mode form/stamp. */
export function defaultSinglePlant(): PlantsCreateCommand['plants'][number] {
	return {
		cultivarName: '',
		origin: 'DIRECT_SEED',
		locationHistory: { gardenId: '', locations: [] },
		geometryHistory: { gardenId: '', geometries: [] },
		cultivarOverride: {},
		quantity: 1
	};
}
