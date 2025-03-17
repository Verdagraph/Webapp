<script lang="ts">
	import { Input } from '$components/ui/input/index.js';
	import { type EditableAttributeProps } from './types';
	import DefaultStaticValue from './DefaultStaticValue.svelte';
	import { getOninput } from './utils';
	import { type DateValue } from '@internationalized/date';
	import DatePicker from '$components/ui/datepicker';

	let { value, editing, onChange, errors }: EditableAttributeProps<DateValue> =
		$props();
</script>

{#if editing}
	<DatePicker
		{value}
		onValueChange={(newVal) => {
			if (newVal) {
				onChange(false, newVal);
			}
		}}
	/>
{:else}
	<DefaultStaticValue {value} />
{/if}
