<script lang="ts">
	import { Button } from '../../ui/button/index.js';
	import { type EditableAttributeProps } from './types';
	import iconIds from '../../../../assets/icons';
	import Icon from '@iconify/svelte';

	let { editing, onChange }: EditableAttributeProps<undefined> = $props();
</script>

{#if editing}
	<Button
		class="flex w-full select-none items-center justify-center"
		onclick={() => {
			onChange(undefined);
		}}
	>
		<Icon icon={iconIds.addIcon} width="1.5rem" class="text-neutral-11" />
	</Button>
{:else}
	<Button class="flex w-full select-none items-center justify-center" disabled={true}>
		<Icon icon={iconIds.addIcon} width="1.5rem" class="text-neutral-11" />
	</Button>
{/if}
