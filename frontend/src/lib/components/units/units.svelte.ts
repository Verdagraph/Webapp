import type { UnitAwareQuantity, UnitSystem } from '$state/userSettings.svelte';
import userSettings from '$state/userSettings.svelte';

/** The amount of decimal places to prefer when converting units. */
const DECIMAL_PLACES = 4

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
			imperial: 'gal(US)'
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
 * Rounds a number to the specified amount of decimal places.
 * @param num The number to round.
 * @param places The number of decimal places.
 * @returns The rounded number.
 */
function roundToDecimalPlaces(num: number, places: number) {
	const factor = 10 ** places;
	return Math.round(num * factor) / factor;
  };

/**
 * Retrieve the string symbol for a unit.
 * @param unitSystem The unit system.
 * @param quantityType The type of quantity being represented.
 * @returns The unit symbol as a string.
 */
function quantityToUnitSymbol(
	unitSystem: UnitSystem,
	quantityType: UnitAwareQuantity
): string {
	return units[quantityType].symbols[unitSystem];
}

/**
 * Swap one unit system to the other.
 * @param unitSystem The unit system to swap.
 * @returns The opposite unit system.
 */
function swapUnit(unitSystem: UnitSystem): UnitSystem {
	return unitSystem === 'metric' ? 'imperial' : 'metric';
}

/**
 * Convert a quantity to the other unit system.
 * @param quantity The quantity to convert.
 * @param unitSystem The unit system the quanity is currently in.
 * @param quantityType The type of the quantity
 * @returns The quantity represented in the other unit system.
 */
function convertQuantity(
	quantity: number,
	unitSystem: UnitSystem,
	quantityType: UnitAwareQuantity
): number {
	return roundToDecimalPlaces(units[quantityType].conversions[unitSystem](quantity), DECIMAL_PLACES);
}

/**
 * Converts a quantity to the metric system.
 * If it is already in the metric system, it is returned unchanged.
 * @param quantity The quantity to convert.
 * @param unitSystem The unit system the quanity is currently in.
 * @param quantityType The type of the quantity
 * @returns The quantity represented in the metric system.
 */
function convertQuantityToMetric(
	quantity: number,
	unitSystem: UnitSystem,
	quantityType: UnitAwareQuantity
): number {
	return unitSystem === 'metric'
		? quantity
		: convertQuantity(quantity, unitSystem, quantityType);
}

/**
 * Creates a set of runes for tracking and changing the unit system of value.
 * @param quantityType The type of quantity to represent.
 * @param initialValueMetric The initial value of the quantity, in metric.
 * @returns A unit aware value.
 */
export function createUnitAwareValue(
	quantityType: UnitAwareQuantity,
	initialValueMetric: number
) {
	/** The current unit system for this value. Defaults to user preferences. */
	let unitSystem = $state(userSettings.value.units[quantityType]);

	/** The value displayed in the component. */
	let value = $state(
		userSettings.value.units[quantityType] === 'metric'
			? initialValueMetric
			: convertQuantity(initialValueMetric, 'metric', quantityType)
	);

	/** A version of the value guarnteed to be metric. */
	let metricValue = $derived(convertQuantityToMetric(value, unitSystem, quantityType));

	/** The symbol displayed in the component.*/
	let unitSymbol = $derived(quantityToUnitSymbol(unitSystem, quantityType));

	/**
	 * When the units are swapped, the intermediate quantity is converted
	 * to the other unit system and the unit system is swapped.
	 */
	function swapUnits() {
		const oldUnitSystem = unitSystem;
		unitSystem = swapUnit(unitSystem);
		value = convertQuantity(value, oldUnitSystem, quantityType);
	}

	return {
		get unitSystem() {
			return unitSystem;
		},
		get value() {
			return value;
		},
		get metricValue() {
			return metricValue;
		},
		get unitSymbol() {
			return unitSymbol;
		},
		set value(newVal) {
			value = newVal;
		},
		swapUnits
	};
}
