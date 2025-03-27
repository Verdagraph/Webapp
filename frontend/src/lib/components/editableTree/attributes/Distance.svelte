<script lang="ts">
	import UnitAwareInput from '$components/units/UnitAwareInput.svelte';
	import { type EditableAttributeProps } from './types';
	import DefaultStaticValue from './DefaultStaticValue.svelte';

	let { value, editing, onChange, errors }: EditableAttributeProps<number> = $props();
</script>

{#if editing}
	<UnitAwareInput
		oninput={(newData) => {
			onChange(newData);
		}}
		{value}
		quantityType="distance"
	/>
{:else}
	<DefaultStaticValue {value} />
{/if}
