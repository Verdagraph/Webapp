import userSettings from '$state/userSettings.svelte';
import { roundToDecimalPlaces } from '../../../utils';
const units = {
    distance: {
        symbols: {
            metric: 'm',
            imperial: 'ft'
        },
        conversions: {
            metric: (meters) => {
                return meters * 3.280839895;
            },
            imperial: (feet) => {
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
            metric: (celsius) => {
                return celsius * (9 / 5) + 32;
            },
            imperial: (farenheight) => {
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
            metric: (kilograms) => {
                return kilograms * 2.20462262185;
            },
            imperial: (pounds) => {
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
            metric: (liters) => {
                return liters * 0.2641720524;
            },
            imperial: (gallons) => {
                return gallons * 3.785411784;
            }
        }
    }
};
/**
 * Retrieve the string symbol for a unit.
 * @param unitSystem The unit system.
 * @param quantityType The type of quantity being represented.
 * @returns The unit symbol as a string.
 */
function quantityToUnitSymbol(unitSystem, quantityType) {
    return units[quantityType].symbols[unitSystem];
}
/**
 * Swap one unit system to the other.
 * @param unitSystem The unit system to swap.
 * @returns The opposite unit system.
 */
function swapUnit(unitSystem) {
    return unitSystem === 'metric' ? 'imperial' : 'metric';
}
/**
 * Convert a quantity to the other unit system.
 * @param quantity The quantity to convert.
 * @param unitSystem The unit system the quanity is currently in.
 * @param quantityType The type of the quantity
 * @returns The quantity represented in the other unit system.
 */
function convertQuantity(quantity, unitSystem, quantityType) {
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
function convertQuantityToMetric(quantity, unitSystem, quantityType) {
    return unitSystem === 'metric'
        ? quantity
        : convertQuantity(quantity, unitSystem, quantityType);
}
/**
 * Creates a set of runes for tracking and changing the unit system of an array of values.
 * @param quantityType The type of quantity to represent.
 * @param initialValuesMetric The initial values, in metric.
 * @param decimalPlaces The number of decimal places to prefer when converting values.
 * @returns A unit aware value.
 */
export function createUnitAwareValues(quantityType, initialValuesMetric, decimalPlaces = 2) {
    /** The current unit system for this value. Defaults to user preferences. */
    let unitSystem = $state(userSettings.value.units[quantityType]);
    /** The values displayed in the component. */
    let displayValues = $state(userSettings.value.units[quantityType] === 'metric'
        ? initialValuesMetric
        : initialValuesMetric.map((value) => convertQuantity(value, 'metric', quantityType)));
    /** A version of the display values guaranteed to be metric. */
    const metricValues = $derived(displayValues.map((value) => convertQuantityToMetric(value, unitSystem, quantityType)));
    /** The symbol displayed in the component.*/
    const unitSymbol = $derived(quantityToUnitSymbol(unitSystem, quantityType));
    /**
     * Sets the display value from an external source.
     * Ensures that the new display value is different from
     * the current one to avoid double-conversion.
     * @param newVal The new values, in metric.
     */
    function setDisplayValues(newVal) {
        const newDisplayValues = unitSystem === 'metric'
            ? newVal
            : newVal.map((value) => roundToDecimalPlaces(convertQuantity(value, 'metric', quantityType), decimalPlaces));
        newDisplayValues.forEach((value, index) => {
            if (value != displayValues[index]) {
                displayValues[index] = newDisplayValues[index];
            }
        });
    }
    /**
     * Handles an input component such that the display values
     * are properly updated.
     * Requires the caller to update the output metric value from
     * metricValues after this function.
     * @param event The input component event.
     * @param index The index of the values the input handles.
     */
    function handleInput(event, index) {
        if (!(event.target instanceof HTMLInputElement) || !event.target.value) {
            return;
        }
        let newValue = parseFloat(event.target.value);
        if (!newValue) {
            newValue = 0;
        }
        displayValues[index] = newValue;
    }
    /**
     * When the units are swapped, the intermediate quantity is converted
     * to the other unit system and the unit system is swapped.
     */
    function swapUnits() {
        displayValues = displayValues.map((value) => roundToDecimalPlaces(convertQuantity(value, unitSystem, quantityType), decimalPlaces));
        unitSystem = swapUnit(unitSystem);
    }
    /**
     * Converts a metric quantity to a quantity in the current unit system.
     * @param metricValue A metric quantity.
     * @returns A quantity in the current unit system.
     */
    function metricToCurrentUnit(metricValue) {
        return unitSystem === 'metric'
            ? metricValue
            : convertQuantity(metricValue, 'metric', quantityType);
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
        handleInput,
        swapUnits,
        metricToCurrentUnit
    };
}
