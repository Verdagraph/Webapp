<script lang="ts">
	import Icon from '@iconify/svelte';

	import { ScrollArea, Sheet, iconIds } from '@vdg-webapp/ui';

	import Tree from './Tree.svelte';
</script>

<Sheet.Root>
	<Sheet.Trigger>
		<Icon icon={iconIds.gardenDrawerIcon} width="2rem" />
	</Sheet.Trigger>
	<Sheet.Content>
		<ScrollArea.Root class="h-full">
			<Tree />
		</ScrollArea.Root>
	</Sheet.Content>
</Sheet.Root>
