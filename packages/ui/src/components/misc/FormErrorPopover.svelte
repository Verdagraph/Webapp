<script lang="ts">
	import Icon from '@iconify/svelte';
	import iconIds from '../../../assets/icons';
	import * as Popover from '$components/ui/popover';

	type Props = { description: string; errorAttrs?: unknown };

	let { description, errorAttrs = {} }: Props = $props();
</script>

<Popover.Root>
	<Popover.Trigger class="w-8">
		<Icon
			icon={iconIds.formFieldDescriptionIcon}
			width="1rem"
			class="text-destructive-9 hover:text-destructive-10 ml-2"
		/>
	</Popover.Trigger>
	<Popover.Content {...errorAttrs} class="max-w-2xl">
		{description}
	</Popover.Content>
</Popover.Root>
