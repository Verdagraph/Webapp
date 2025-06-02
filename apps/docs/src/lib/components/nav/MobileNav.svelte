<script lang="ts">
	import Icon from '@iconify/svelte';

	import { ScrollArea, Sheet, iconIds } from '@vdg-webapp/ui';

	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import Tree from './Tree.svelte';
</script>

<!--
@component The collapsible navigation menu on small screens.
-->
<Sheet.Root>
	<Sheet.Trigger>
		<Icon icon={iconIds.gardenDrawerIcon} width="2rem" />
	</Sheet.Trigger>
	<Sheet.Content>
		<ThemeSwitcher showLabel={true} />
		<ScrollArea.Root class="h-full">
			<Tree />
		</ScrollArea.Root>
	</Sheet.Content>
</Sheet.Root>
