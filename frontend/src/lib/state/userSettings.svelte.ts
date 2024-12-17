import { LocalStore } from './localStore.svelte';

export type UnitSystem = 'metric' | 'imperial';
export type UnitAwareQuantity = 'distance' | 'temperature' | 'mass' | 'volume';

type PreferredUnitSettings = {
	distance: UnitSystem;
	temperature: UnitSystem;
	mass: UnitSystem;
	volume: UnitSystem;
};

type UserSettings = {
	units: PreferredUnitSettings;
};

let _rune = new LocalStore<UserSettings>('userSettings', {
	units: {
		distance: 'metric',
		temperature: 'metric',
		mass: 'metric',
		volume: 'metric'
	}
});

/* Exported state methods. */
export const userSettings = {
	/* Getter. */
	get value(): UserSettings {
		return _rune.value;
	},

	/* Setter. */
	set value(newVal: UserSettings) {
		_rune.value = newVal;
	}
};
export default userSettings;
