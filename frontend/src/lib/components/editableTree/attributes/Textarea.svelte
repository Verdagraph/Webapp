<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { type EditableAttributeProps } from './types';
	import DefaultStaticValue from './DefaultStaticValue.svelte';
	import { getOninput } from './utils';

	let { value, editing, onChange, errors }: EditableAttributeProps = $props();
</script>

{#if editing}
	<Textarea
		{value}
		class="select-none"
		oninput={getOninput<HTMLTextAreaElement>(onChange)}
	/>
{:else}
	<DefaultStaticValue {value} />
{/if}
