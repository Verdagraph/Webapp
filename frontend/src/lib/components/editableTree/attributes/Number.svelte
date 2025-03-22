<script lang="ts">
	import { Input } from '$components/ui/input/index.js';
	import { type EditableAttributeProps } from './types';
	import DefaultStaticValue from './DefaultStaticValue.svelte';
	import { getOninputNumber } from './utils';

	let { value, editing, onChange, errors }: EditableAttributeProps<number> = $props();
</script>

{#if editing}
	<Input
		{value}
		type="number"
		class="select-none"
		oninput={getOninputNumber<HTMLInputElement>(onChange)}
	/>
{:else}
	<DefaultStaticValue {value} />
{/if}
