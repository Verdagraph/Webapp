export type UnitSystem = 'metric' | 'imperial';
export type UnitAwareQuantity = 'distance' | 'temperature' | 'mass' | 'volume';
/**
 * Creates a set of runes for tracking and changing the unit system of an array of values.
 * @param quantityType The type of quantity to represent.
 * @param initialValuesMetric The initial values, in metric.
 * @param decimalPlaces The number of decimal places to prefer when converting values.
 * @returns A unit aware value.
 */
export declare function createUnitAwareValues(
	quantityType: UnitAwareQuantity,
	initialValuesMetric: Array<number>,
	initialUnitSystem?: UnitSystem,
	decimalPlaces?: number
): {
	readonly unitSystem: UnitSystem;
	displayValues: number[];
	readonly metricValues: number[];
	readonly unitSymbol: string;
	setDisplayValues: (newVal: Array<number>) => void;
	handleInput: (
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		},
		index: number
	) => void;
	swapUnits: () => void;
	metricToCurrentUnit: (metricValue: number) => number;
};
export type UnitAwareValues = ReturnType<typeof createUnitAwareValues>;
//# sourceMappingURL=units.svelte.d.ts.map
