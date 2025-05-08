<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { type EditableAttributeProps } from './types';
	import iconIds from '../../../../assets/icons';
	import Icon from '@iconify/svelte';

	let { editing, onChange }: EditableAttributeProps<undefined> = $props();
</script>

{#if editing}
	<Button
		class="bg-destructive-6 text-destructive-12 w-full select-none"
		onclick={() => {
			onChange(undefined);
		}}
	>
		<Icon icon={iconIds.deleteIcon} width="1.5rem" class="text-neutral-11" />
	</Button>
{:else}
	<Button
		class="bg-destructive-6 text-destructive-12 w-full select-none"
		disabled={true}
	>
		<Icon icon={iconIds.deleteIcon} width="1.5rem" class="text-neutral-11" />
	</Button>
{/if}
