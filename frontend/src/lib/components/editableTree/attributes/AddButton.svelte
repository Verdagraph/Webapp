<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { type EditableAttributeProps } from './types';
	import DefaultStaticValue from './DefaultStaticValue.svelte';
	import iconIds from '$lib/assets/icons';
	import Icon from '@iconify/svelte';

	let { value, editing, onChange, errors }: EditableAttributeProps<undefined> =
		$props();
</script>

{#if editing}
	<Button
		class="w-full select-none"
		onclick={() => {
			onChange(undefined);
		}}
	>
		<Icon icon={iconIds.addIcon} width="1.5rem" class="text-neutral-11 ml-4" />
	</Button>
{:else}
	<Button class="w-full select-none" disabled={true}>
		<Icon icon={iconIds.addIcon} width="1.5rem" class="text-neutral-11 ml-4" />
	</Button>
{/if}
