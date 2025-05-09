import type { UnitAwareQuantity } from '$state/userSettings.svelte';
type Props = {
    /** The value. */
    value: number;
    /** The type of quantity represented. */
    quantityType: UnitAwareQuantity;
    /** The number of decimal places to prefer for conversions. */
    decimalPlaces?: number;
};
declare const UnitAwareSpan: import("svelte").Component<Props, {}, "">;
type UnitAwareSpan = ReturnType<typeof UnitAwareSpan>;
export default UnitAwareSpan;
//# sourceMappingURL=UnitAwareSpan.svelte.d.ts.map