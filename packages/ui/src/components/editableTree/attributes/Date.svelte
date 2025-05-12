<script lang="ts">
	import { type DateValue } from '@internationalized/date';

	import DatePicker from '$core/datepicker';

	import { type EditableAttributeProps } from './types';

	let { value, editing, onChange }: EditableAttributeProps<DateValue> = $props();
</script>

{#if editing}
	<DatePicker
		{value}
		onValueChange={(newVal) => {
			if (newVal) {
				onChange(newVal);
			}
		}}
	/>
{:else}
	<DatePicker {value} disabled={true} />
{/if}
