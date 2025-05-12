<script lang="ts">
	import iconIds from '../../assets/icons';
	import * as Popover from '../../core/popover';
	import Icon from '@iconify/svelte';

	type Props = { errors: string[] };

	let { errors }: Props = $props();
</script>

<Popover.Root>
	<Popover.Trigger class="w-8">
		<Icon
			icon={iconIds.formFieldDescriptionIcon}
			width="1rem"
			class="text-destructive-9 hover:text-destructive-10 ml-2"
		/>
	</Popover.Trigger>
	<Popover.Content class="max-w-2xl">
		{errors.join(' ')}
	</Popover.Content>
</Popover.Root>
