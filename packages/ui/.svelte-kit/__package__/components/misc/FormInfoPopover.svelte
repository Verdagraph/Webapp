<script lang="ts">
	import Icon from '@iconify/svelte';
	import iconIds from '../../assets/icons';
	import * as Popover from '../ui/popover';

	type Props = { description: string };

	let { description }: Props = $props();
</script>

<Popover.Root>
	<Popover.Trigger class="w-8">
		<Icon
			icon={iconIds.formFieldDescriptionIcon}
			width="1rem"
			class="text-neutral-11 hover:text-neutral-10 ml-2"
		/>
	</Popover.Trigger>
	<Popover.Content class="max-w-2xl">
		{description}
	</Popover.Content>
</Popover.Root>
