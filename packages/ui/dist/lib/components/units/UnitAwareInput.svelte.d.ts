import type { UnitAwareQuantity } from '$state/userSettings.svelte';
type Props = {
    /** The output value. Guarnteed to be in metric. */
    value: number;
    /** The type of quantity represented. */
    quantityType: UnitAwareQuantity;
    /** Callback in case we can't bind to the input. */
    oninput?: (newData: number) => void;
    /** The number of decimal places to prefer for conversions. */
    decimalPlaces?: number;
    /** The input properties, in meters. */
    step?: number;
    min?: number;
    max?: number;
};
declare const UnitAwareInput: import("svelte").Component<Props, {}, "value">;
type UnitAwareInput = ReturnType<typeof UnitAwareInput>;
export default UnitAwareInput;
//# sourceMappingURL=UnitAwareInput.svelte.d.ts.map