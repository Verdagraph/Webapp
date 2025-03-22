<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { type EditableAttributeProps } from './types';

	let { value, editing, onChange, errors }: EditableAttributeProps<boolean> = $props();
</script>

{#if editing}
	<Checkbox
		checked={value}
		class="select-none"
		onCheckedChange={(value) => {
			onChange(false, value);
		}}
	/>
{:else}
	<Checkbox checked={value} class="select-none" disabled={true} />
{/if}
