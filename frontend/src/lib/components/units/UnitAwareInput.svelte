<script lang="ts">
	import type { UnitAwareQuantity } from '$state/userSettings.svelte';
	import { Button } from 'bits-ui';
    import { Input } from "$lib/components/ui/input/index.js";
	import Icon from '@iconify/svelte';
	import {
		createUnitAwareValue,
	} from './units.svelte';

	type Props = {
		/** The output value. Guarnteed to be in metric. */
		value: number;
		/** The type of quantity represented. */
		quantityType: UnitAwareQuantity;
	};
	let { value = $bindable(), quantityType }: Props = $props();

    const unitAwareValue = createUnitAwareValue(quantityType, value)

</script>

<div class="flex items-center justify-between w-full gap-0">
	<Input
		bind:value={unitAwareValue.value}
		type="number"
		oninput={() => {value = unitAwareValue.metricValue}}
        class="rounded-r-none border-r-0 "
	/>
	<span class="border-y border-l border-x-neutral-5 border-neutral-7 h-10 flex items-center justify-center w-auto min-w-10 px-3 {unitAwareValue.unitSystem === 'metric' && quantityType === 'distance' ? 'text-lg': 'text-md'} text-neutral-11">{unitAwareValue.unitSymbol}</span>
	<Button.Root onclick={unitAwareValue.swapUnits} class="border border-l-neutral-5 border-neutral-7 rounded-r-md h-10 px-2 hover:bg-neutral-2">
		<Icon icon="material-symbols:swap-horiz-rounded" width="1rem" />
	</Button.Root>
</div>
