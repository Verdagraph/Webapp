import { type UnitAwareQuantity, type UnitSystem } from './units.svelte';
type Props = {
	/** The output value. Guarnteed to be in metric. */
	value: number;
	/** The type of quantity represented. */
	quantityType: UnitAwareQuantity;
	/** The initial unit system of the component. */
	initialUnitSystem: UnitSystem;
	/** Callback in case we can't bind to the input. */
	oninput?: (newData: number) => void;
	/** The number of decimal places to prefer for conversions. */
	decimalPlaces?: number;
	/** The input properties, in meters. */
	step?: number;
	min?: number;
	max?: number;
};
declare const UnitAwareInput: import('svelte').Component<Props, {}, 'value'>;
type UnitAwareInput = ReturnType<typeof UnitAwareInput>;
export default UnitAwareInput;
//# sourceMappingURL=UnitAwareInput.svelte.d.ts.map
