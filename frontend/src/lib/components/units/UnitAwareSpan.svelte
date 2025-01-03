<script lang="ts">
	import type { UnitAwareQuantity } from '$state/userSettings.svelte';
	import { Button } from 'bits-ui';
	import Icon from '@iconify/svelte';
	import { createUnitAwareValue } from './units.svelte';

	type Props = {
		/** The value. */
		value: number;
		/** The type of quantity represented. */
		quantityType: UnitAwareQuantity;
	};
	let { value, quantityType }: Props = $props();

	$effect(() => {
		unitAwareValue.value = value;
	});

	const unitAwareValue = createUnitAwareValue(quantityType, value);
</script>

<div class="flex w-full items-center justify-between gap-0">
	<span
		class="border-neutral-7 bg-neutral-1 ring-offset-neutral-1 focus-visible:ring-neutral-7 flex h-10 w-full rounded-md rounded-r-none border border-r-0 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
		>{unitAwareValue.value}</span
	>
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
