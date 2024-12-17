<script lang="ts">
	import type { UnitAwareQuantity, UnitSystem } from '$state/userSettings.svelte';
	import userSettings from '$state/userSettings.svelte';
	import { Button } from 'bits-ui';
	import Icon from '@iconify/svelte';
	import {
		quantityToUnitSymbol,
		swapUnit,
		convertQuantity,
		convertQuantityToImperial,
		convertQuantityToMetric
	} from './units';

	type Props = {
		/** The type of quantity represented. */
		quantityType: UnitAwareQuantity;
		/** The output value. Guarnteed to be in metric. */
		value: number;
	};
	let { quantityType, value = $bindable() }: Props = $props();

	/** The current unit system for this value. */
	let unitSystem = $state(userSettings.value.units[quantityType]);

	/** The value displayed in the component. */
	let intermediateValue = $state(
		userSettings.value.units[quantityType] === 'metric'
			? value
			: convertQuantity(value, quantityType, 'metric')
	);

	/** The symbol displayed in the component.*/
	let unitSymbol = $derived(quantityToUnitSymbol(quantityType, unitSystem));

	/**
	 * When the intermediate value is updated, the bound output value is
	 * updated to the metric version of the current intermediate value.
	 */
	function updateIntermediateValue() {
		value = convertQuantityToMetric(intermediateValue, quantityType, unitSystem);
	}

	/**
	 * When the units are swapped, the intermediate quantity is converted
	 * to the other unit system and the unit system is swapped.
	 */
	function swapUnits() {
		intermediateValue = convertQuantity(intermediateValue, quantityType, unitSystem);
		unitSystem = swapUnit(unitSystem);
	}
</script>

<div class="flex w-full gap-1">
	<input
		bind:value={intermediateValue}
		type="number"
		oninput={updateIntermediateValue}
	/>
	<span>{unitSymbol}</span>
	<Button.Root onclick={swapUnits}>
		<Icon icon="material-symbols:swap-horiz-rounded" width="1rem" />
	</Button.Root>
</div>
