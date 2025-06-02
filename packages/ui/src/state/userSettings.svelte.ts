import { getContext, setContext } from 'svelte';

import { LocalStore } from '@vdg-webapp/ui';

const SETTINGS_CONTEXT_ID = 'userSettingsContext';

export type UnitSystem = 'metric' | 'imperial';
export type UnitAwareQuantity = 'distance' | 'temperature' | 'mass' | 'volume';

type PreferredUnitSettings = {
	distance: UnitSystem;
	temperature: UnitSystem;
	mass: UnitSystem;
	volume: UnitSystem;
};

/**
 * Holds persisted user settings.
 */
function createSettingsContext() {
	/** Unit settings. */
	const units = new LocalStore<PreferredUnitSettings>('unitSettings', {
		distance: 'metric',
		temperature: 'metric',
		mass: 'metric',
		volume: 'metric'
	});

	return {
		get units() {
			return units.value;
		},
		set units(newVal) {
			units.value = newVal;
		}
	};
}
export type SettingsContext = ReturnType<typeof createSettingsContext>;

export function setSettingsContext() {
	return setContext(SETTINGS_CONTEXT_ID, createSettingsContext());
}

export function getSettingsContext() {
	return getContext<SettingsContext>(SETTINGS_CONTEXT_ID);
}
