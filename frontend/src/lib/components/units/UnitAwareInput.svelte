<script lang="ts">
	import type { UnitAwareQuantity } from '$state/userSettings.svelte';
	import { Button } from 'bits-ui';
	import { Input } from '$lib/components/ui/input/index.js';
	import Icon from '@iconify/svelte';
	import { createUnitAwareValue } from './units.svelte';

	type Props = {
		/** The output value. Guarnteed to be in metric. */
		value: number;
		/** The type of quantity represented. */
		quantityType: UnitAwareQuantity;
	};
	let { value = $bindable(), quantityType, ...restProps }: Props = $props();

	const unitAwareValue = createUnitAwareValue(quantityType, value);
</script>

<div class="flex w-full items-center justify-between gap-0">
	<Input
		bind:value={unitAwareValue.value}
		type="number"
		oninput={() => {
			value = unitAwareValue.metricValue;
		}}
		{...restProps}
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
		class="border-l-neutral-5 border-neutral-7 hover:bg-neutral-2 h-10 rounded-r-md border px-2"
	>
		<Icon icon="material-symbols:swap-horiz-rounded" width="1rem" />
	</Button.Root>
</div>
