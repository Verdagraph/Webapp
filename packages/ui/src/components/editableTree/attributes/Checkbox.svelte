<script lang="ts">
	import { Checkbox } from '$core/checkbox/index.js';

	import { type EditableAttributeProps } from './types';

	let { value, editing, onChange }: EditableAttributeProps<boolean> = $props();
</script>

{#if editing}
	<Checkbox
		checked={value}
		class="select-none"
		onCheckedChange={(value) => {
			onChange(value);
		}}
	/>
{:else}
	<Checkbox checked={value} class="select-none" disabled={true} />
{/if}
