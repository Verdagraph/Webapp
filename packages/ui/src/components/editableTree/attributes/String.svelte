<script lang="ts">
	import { Input } from '$core/input/index.js';

	import DefaultStaticValue from './DefaultStaticValue.svelte';
	import { type EditableAttributeProps } from './types';
	import { getOninputString } from './utils';

	let { value, editing, onChange }: EditableAttributeProps<string> = $props();
</script>

{#if editing}
	<Input
		{value}
		class="select-none"
		oninput={getOninputString<HTMLInputElement>(onChange)}
	/>
{:else}
	<DefaultStaticValue {value} />
{/if}
