<script lang="ts">
	import UnitAwareInput from '../../units/UnitAwareInput.svelte';

	import DefaultStaticValue from './DefaultStaticValue.svelte';
	import { type EditableAttributeProps } from './types';

	let { value, editing, onChange }: EditableAttributeProps<number> = $props();
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
