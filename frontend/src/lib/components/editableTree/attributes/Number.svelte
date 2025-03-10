<script lang="ts">
	import { Input } from '$components/ui/input/index.js';
	import { type EditableAttributeProps } from './types';
	import DefaultStaticValue from './DefaultStaticValue.svelte';
	import { getOninput } from './utils';

	let { value, editing, onChange, errors }: EditableAttributeProps = $props();
</script>

{#if editing}
	<Input
		{value}
		type="number"
		class="select-none"
		oninput={getOninput<HTMLInputElement>(onChange)}
	/>
{:else}
	<DefaultStaticValue {value} />
{/if}
