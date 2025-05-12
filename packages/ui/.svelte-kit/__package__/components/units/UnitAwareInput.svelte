<script lang="ts">
	import { Input } from '../../core/input/index.js';
	import Icon from '@iconify/svelte';
	import { Button } from 'bits-ui';
	import {
		createUnitAwareValues,
		type UnitAwareQuantity,
		type UnitSystem
	} from './units.svelte';

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
	let {
		value: metricValue = $bindable(),
		quantityType,
		initialUnitSystem,
		oninput,
		decimalPlaces = 2,
		step = 0.01,
		min,
		max,
		...restProps
	}: Props = $props();

	const unitAwareValues = createUnitAwareValues(
		quantityType,
		[metricValue],
		initialUnitSystem,
		decimalPlaces
	);

	/** Track external value changes. */
	$effect(() => {
		unitAwareValues.setDisplayValues([metricValue]);
	});

	/** The input properties, in the unit system. */
	let unitAwareMin = $derived.by(() => {
		if (min) {
			return unitAwareValues.metricToCurrentUnit(min);
		} else {
			return '';
		}
	});
	let unitAwareMax = $derived.by(() => {
		if (max) {
			return unitAwareValues.metricToCurrentUnit(max);
		} else {
			return '';
		}
	});
</script>

<div class="flex w-full items-center justify-between gap-0">
	<Input
		value={unitAwareValues.displayValues[0]}
		type="number"
		{step}
		min={unitAwareMin}
		max={unitAwareMax}
		{...restProps}
		oninput={(event) => {
			unitAwareValues.handleInput(event, 0);
			metricValue = unitAwareValues.metricValues[0];
			if (oninput) {
				oninput(metricValue);
			}
		}}
		class="rounded-r-none border-r-0 "
	/>
	<span
		class="border-x-neutral-5 bg-neutral-2 border-neutral-7 flex h-10 w-auto min-w-10 items-center justify-center border-y border-l px-3 {unitAwareValues.unitSystem ===
			'metric' && quantityType === 'distance'
			? 'text-lg'
			: 'text-md'} text-neutral-11">{unitAwareValues.unitSymbol}</span
	>
	<Button.Root
		onclick={unitAwareValues.swapUnits}
		type="button"
		class="border-l-neutral-5 border-neutral-7 bg-neutral-2 hover:bg-neutral-3 h-10 rounded-r-md border px-2"
	>
		<Icon icon="material-symbols:swap-horiz-rounded" width="1rem" />
	</Button.Root>
</div>
