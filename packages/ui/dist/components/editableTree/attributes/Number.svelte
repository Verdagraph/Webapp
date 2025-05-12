<script lang="ts">
	import { Input } from '../../../core/input/index.js';

	import DefaultStaticValue from './DefaultStaticValue.svelte';
	import { type EditableAttributeProps } from './types';
	import { getOninputNumber } from './utils';

	let { value, editing, onChange }: EditableAttributeProps<number> = $props();
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
