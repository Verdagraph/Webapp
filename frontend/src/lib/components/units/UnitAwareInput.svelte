<script lang="ts">
	import { Button } from 'bits-ui';
	import { Input } from '$lib/components/ui/input/index.js';
	import Icon from '@iconify/svelte';
	import {
		createUnitAwareValue,
		convertQuantity,
		quantityToUnitSymbol,
		swapUnit,
		roundToDecimalPlaces
	} from './units.svelte';
	import type { UnitAwareQuantity, UnitSystem } from '$state/userSettings.svelte';
	import userSettings from '$state/userSettings.svelte';
	import { untrack } from 'svelte';

	type Props = {
		/** The output value. Guarnteed to be in metric. */
		value: number;
		/** The type of quantity represented. */
		quantityType: UnitAwareQuantity;
		/** The input properties, in meters. */
		step?: number;
		min?: number;
		max?: number;
	};
	let {
		value: metricValue = $bindable(),
		quantityType,
		step = 0.01,
		min,
		max,
		...restProps
	}: Props = $props();

	/** The current unit system for this value. Defaults to user preferences. */
	let unitSystem = $state(userSettings.value.units[quantityType]);

	let displayValue: number = $state(
		userSettings.value.units[quantityType] === 'metric'
			? metricValue
			: convertQuantity(metricValue, 'metric', quantityType)
	);

	/** The symbol displayed in the component.*/
	const unitSymbol = $derived(quantityToUnitSymbol(unitSystem, quantityType));

	/** Track external value changes. */
	$effect(() => {
		const newDisplayValue =
			unitSystem === 'metric'
				? metricValue
				: roundToDecimalPlaces(convertQuantity(metricValue, 'metric', quantityType), 2);
		if (untrack(() => displayValue) != newDisplayValue) {
			console.log('secondupdate');
			displayValue = newDisplayValue;
		}
	});

	function swapUnits() {
		//console.warn('Swapping units not currently supported.');
		displayValue = roundToDecimalPlaces(convertQuantity(displayValue, unitSystem, quantityType), 2);
		unitSystem = swapUnit(unitSystem);
	}

	/** The input properties, in the unit system. */
	let unitAwareMin = $derived.by(() => {
		if (min) {
			return unitSystem === 'metric'
				? min
				: convertQuantity(min, 'metric', quantityType);
		} else {
			return '';
		}
	});
	let unitAwareMax = $derived.by(() => {
		if (max) {
			return unitSystem === 'metric'
				? max
				: convertQuantity(max, 'metric', quantityType);
		} else {
			return '';
		}
	});
</script>

<div class="flex w-full items-center justify-between gap-0">
	<Input
		value={displayValue}
		type="number"
		{step}
		min={unitAwareMin}
		max={unitAwareMax}
		{...restProps}
		oninput={({ target }) => {
			console.log('handler');
			if (target) {
				const newValue = parseFloat(target.value);
				metricValue =
					unitSystem === 'metric'
						? newValue
						: convertQuantity(newValue, 'imperial', quantityType);
				displayValue = newValue;
				console.log(newValue);
				console.log(metricValue);
			}
		}}
		class="rounded-r-none border-r-0 "
	/>
	<span
		class="border-x-neutral-5 border-neutral-7 flex h-10 w-auto min-w-10 items-center justify-center border-y border-l px-3 {unitSystem ===
			'metric' && quantityType === 'distance'
			? 'text-lg'
			: 'text-md'} text-neutral-11">{unitSymbol}</span
	>
	<Button.Root
		onclick={swapUnits}
		type="button"
		class="border-l-neutral-5 border-neutral-7 hover:bg-neutral-2 h-10 rounded-r-md border px-2"
	>
		<Icon icon="material-symbols:swap-horiz-rounded" width="1rem" />
	</Button.Root>
</div>
