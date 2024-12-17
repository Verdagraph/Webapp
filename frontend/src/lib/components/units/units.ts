import type { UnitAwareQuantity, UnitSystem } from '$state/userSettings.svelte';

type UnitInfo = {
	symbols: Record<UnitSystem, string>;
	conversions: Record<UnitSystem, (input: number) => number>;
};

const units: Record<UnitAwareQuantity, UnitInfo> = {
	distance: {
		symbols: {
			metric: 'm',
			imperial: 'ft'
		},
		conversions: {
			metric: (meters: number) => {
				return meters * 3.280839895;
			},
			imperial: (feet: number) => {
				return feet * 0.3048;
			}
		}
	},
	temperature: {
		symbols: {
			metric: '°C',
			imperial: '°F'
		},
		conversions: {
			metric: (celsius: number) => {
				return celsius * (9 / 5) + 32;
			},
			imperial: (farenheight: number) => {
				return (farenheight - 32) * (5 / 9);
			}
		}
	},
	mass: {
		symbols: {
			metric: 'kgs',
			imperial: 'lbs'
		},
		conversions: {
			metric: (kilograms: number) => {
				return kilograms * 2.20462262185;
			},
			imperial: (pounds: number) => {
				return pounds * 0.45359237;
			}
		}
	},
	volume: {
		symbols: {
			metric: 'L',
			imperial: 'gal (US)'
		},
		conversions: {
			metric: (liters: number) => {
				return liters * 0.2641720524;
			},
			imperial: (gallons: number) => {
				return gallons * 3.785411784;
			}
		}
	}
};

/**
 * Retrieve the string symbol for a unit.
 * @param quantityType The type of quantity being represented.
 * @param unit The unit system.
 * @returns The unit symbol as a string.
 */
export function quantityToUnitSymbol(
	quantityType: UnitAwareQuantity,
	unit: UnitSystem
): string {
	return units[quantityType].symbols[unit];
}

/**
 * Swap one unit system to the other.
 * @param unitSystem The unit system to swap.
 * @returns The opposite unit system.
 */
export function swapUnit(unitSystem: UnitSystem): UnitSystem {
	return unitSystem === 'metric' ? 'imperial' : 'metric';
}

/**
 * Convert a quantity to the other unit system.
 * @param quantity The quantity to convert.
 * @param quantityType The type of the quantity
 * @param unitSystem The unit system the quanity is currently in.
 * @returns The quantity represented in the other unit system.
 */
export function convertQuantity(
	quantity: number,
	quantityType: UnitAwareQuantity,
	unitSystem: UnitSystem
): number {
	return units[quantityType].conversions[unitSystem](quantity);
}

/**
 * Converts a quantity to the metric system.
 * If it is already in the metric system, it is returned unchanged.
 * @param quantity The quantity to convert.
 * @param quantityType The type of the quantity
 * @param unitSystem The unit system the quanity is currently in.
 * @returns The quantity represented in the metric system.
 */
export function convertQuantityToMetric(
	quantity: number,
	quantityType: UnitAwareQuantity,
	unitSystem: UnitSystem
): number {
	return unitSystem === 'metric'
		? quantity
		: convertQuantity(quantity, quantityType, unitSystem);
}

/**
 * Converts a quantity to the imperial system.
 * If it is already in the imperial system, it is returned unchanged.
 * @param quantity The quantity to convert.
 * @param quantityType The type of the quantity
 * @param unitSystem The unit system the quanity is currently in.
 * @returns The quantity represented in the imperial system.
 */
export function convertQuantityToImperial(
	quantity: number,
	quantityType: UnitAwareQuantity,
	unitSystem: UnitSystem
): number {
	return unitSystem === 'imperial'
		? quantity
		: convertQuantity(quantity, quantityType, unitSystem);
}
