<script lang="ts">
	import { Textarea } from '$components/ui/textarea/index.js';
	import { type EditableAttributeProps } from './types';
	import DefaultStaticValue from './DefaultStaticValue.svelte';
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
