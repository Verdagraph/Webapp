import { type UnitSystem } from './units.svelte';
type Props = {
	/** The output X value. Guarnteed to be in metric. */
	x: number;
	/** The output Y value. Guarnteed to be in metric. */
	y: number;
	/** The initial unit system of the component. */
	initialUnitSystem: UnitSystem;
	/** The number of decimal places to prefer for conversions. */
	decimalPlaces?: number;
};
declare const CoordinateSpan: import('svelte').Component<Props, {}, 'x' | 'y'>;
type CoordinateSpan = ReturnType<typeof CoordinateSpan>;
export default CoordinateSpan;
//# sourceMappingURL=CoordinateSpan.svelte.d.ts.map
