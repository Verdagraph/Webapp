<script lang="ts">
	import { Textarea } from '../../../core/textarea/index.js';
	import DefaultStaticValue from './DefaultStaticValue.svelte';
	import { type EditableAttributeProps } from './types';
	import { getOninputString } from './utils';

	let { value, editing, onChange }: EditableAttributeProps<string> = $props();
</script>

{#if editing}
	<Textarea
		{value}
		class="select-none"
		oninput={getOninputString<HTMLTextAreaElement>(onChange)}
	/>
{:else}
	<DefaultStaticValue {value} />
{/if}
