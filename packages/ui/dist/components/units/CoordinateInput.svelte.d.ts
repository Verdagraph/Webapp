import { type UnitSystem } from './units.svelte';
import { type Position } from '@vdg-webapp/models';
type Props = {
	/** The output X value. Guarnteed to be in metric. */
	x: number;
	/** The output Y value. Guarnteed to be in metric. */
	y: number;
	/** The initial unit system of the component. */
	initialUnitSystem: UnitSystem;
	/** Change handler. */
	onValueChange?: (value: Position) => void;
	/** The number of decimal places to prefer for conversions. */
	decimalPlaces?: number;
	/** The input properties, in meters. */
	step?: number;
	min?: number;
	max?: number;
};
declare const CoordinateInput: import('svelte').Component<Props, {}, 'x' | 'y'>;
type CoordinateInput = ReturnType<typeof CoordinateInput>;
export default CoordinateInput;
//# sourceMappingURL=CoordinateInput.svelte.d.ts.map
