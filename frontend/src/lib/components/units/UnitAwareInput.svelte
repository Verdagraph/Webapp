<script lang="ts">
	import type { UnitAwareQuantity } from '$state/userSettings.svelte';
	import { Button } from 'bits-ui';
	import { Input } from '$lib/components/ui/input/index.js';
	import Icon from '@iconify/svelte';
	import { createUnitAwareValue, convertQuantity } from './units.svelte';

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
		value = $bindable(),
		quantityType,
		step = 0.01,
		min,
		max,
		...restProps
	}: Props = $props();

	/** Track external value changes. */
	$effect(() => {
		/** Note: This effect currently causes circular
		 * dependency which makes the input essentially non-functional
		 * when units are swapped.
		 * TODO: fix this
		 */
		unitAwareValue.setDisplayValue(value);
	});

	const unitAwareValue = createUnitAwareValue(quantityType, value);

	/** The input properties, in the unit system. */
	let unitAwareMin = $derived.by(() => {
		if (min) {
			return unitAwareValue.unitSystem === 'metric'
				? min
				: convertQuantity(min, 'metric', quantityType);
		} else {
			return '';
		}
	});
	let unitAwareMax = $derived.by(() => {
		if (max) {
			return unitAwareValue.unitSystem === 'metric'
				? max
				: convertQuantity(max, 'metric', quantityType);
		} else {
			return '';
		}
	});
</script>

<div class="flex w-full items-center justify-between gap-0">
	<Input
		bind:value={unitAwareValue.displayValue}
		type="number"
		{step}
		min={unitAwareMin}
		max={unitAwareMax}
		{...restProps}
		oninput={(s) => {
			externalUpdate = false;
			value = unitAwareValue.metricValue;
		}}
		class="rounded-r-none border-r-0 "
	/>
	<span
		class="border-x-neutral-5 border-neutral-7 flex h-10 w-auto min-w-10 items-center justify-center border-y border-l px-3 {unitAwareValue.unitSystem ===
			'metric' && quantityType === 'distance'
			? 'text-lg'
			: 'text-md'} text-neutral-11">{unitAwareValue.unitSymbol}</span
	>
	<Button.Root
		onclick={unitAwareValue.swapUnits}
		type="button"
		class="border-l-neutral-5 border-neutral-7 hover:bg-neutral-2 h-10 rounded-r-md border px-2"
	>
		<Icon icon="material-symbols:swap-horiz-rounded" width="1rem" />
	</Button.Root>
</div>
