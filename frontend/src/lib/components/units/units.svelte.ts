import type { UnitAwareQuantity, UnitSystem } from '$state/userSettings.svelte';
import userSettings from '$state/userSettings.svelte';

/** The amount of decimal places to prefer when converting units. */
const DECIMAL_PLACES = 3;

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
export function roundToDecimalPlaces(num: number, places: number) {
	const factor = 10 ** places;
	return Math.round(num * factor) / factor;
}

/**
 * Retrieve the string symbol for a unit.
 * @param unitSystem The unit system.
 * @param quantityType The type of quantity being represented.
 * @returns The unit symbol as a string.
 */
export function quantityToUnitSymbol(
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
export function swapUnit(unitSystem: UnitSystem): UnitSystem {
	return unitSystem === 'metric' ? 'imperial' : 'metric';
}

/**
 * Convert a quantity to the other unit system.
 * @param quantity The quantity to convert.
 * @param unitSystem The unit system the quanity is currently in.
 * @param quantityType The type of the quantity
 * @returns The quantity represented in the other unit system.
 */
export function convertQuantity(
	quantity: number,
	unitSystem: UnitSystem,
	quantityType: UnitAwareQuantity
): number {
	return units[quantityType].conversions[unitSystem](quantity);
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
 * Creates a set of runes for tracking and changing the unit system of an array of values.
 * @param quantityType The type of quantity to represent.
 * @param initialValuesMetric The initial values, in metric.
 * @returns A unit aware value.
 */
export function createUnitAwareValue(
	quantityType: UnitAwareQuantity,
	initialValuesMetric: Array<number>
) {
	/** The current unit system for this value. Defaults to user preferences. */
	let unitSystem: UnitSystem = $state(userSettings.value.units[quantityType]);

	/** The value displayed in the component. */
	let displayValues: Array<number> = $state(
		userSettings.value.units[quantityType] === 'metric'
			? initialValuesMetric
			: initialValuesMetric.map((value) =>
					convertQuantity(value, 'metric', quantityType)
				)
	);

	/** A version of the display values guaranteed to be metric. */
	const metricValues = $derived(
		displayValues.map((value) =>
			convertQuantityToMetric(value, unitSystem, quantityType)
		)
	);

	/** The symbol displayed in the component.*/
	const unitSymbol = $derived(quantityToUnitSymbol(unitSystem, quantityType));

	/**
	 * Sets the display value from an external source.
	 * @param newVal The new values, in metric.
	 */
	function setDisplayValues(newVal: Array<number>) {
		const newDisplayValues =
			unitSystem === 'metric'
				? newVal
				: newVal.map((value) => convertQuantity(value, 'metric', quantityType));
		newDisplayValues.forEach((value, index) => {
			if (value != displayValues[index]) {
				displayValues[index] = newDisplayValues[index];
			}
		});
	}

	/**
	 * When the units are swapped, the intermediate quantity is converted
	 * to the other unit system and the unit system is swapped.
	 */
	function swapUnits() {
		displayValues = displayValues.map((value) =>
			convertQuantity(value, unitSystem, quantityType)
		);
		unitSystem = swapUnit(unitSystem);
	}

	return {
		get unitSystem() {
			return unitSystem;
		},
		get displayValues() {
			return displayValues;
		},
		get metricValues() {
			return metricValues;
		},
		get unitSymbol() {
			return unitSymbol;
		},
		set displayValues(newVal) {
			displayValues = newVal;
		},
		setDisplayValues,
		swapUnits
	};
}
