<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index';
	import Logo from '$lib/assets/logo.svelte';
	import Icon from '@iconify/svelte';
	import { Button } from 'bits-ui';
	import { NavigationMenu } from 'bits-ui';
	import { getGardenSpecifcTabs, getGardensTab } from './tabs';
	import type { PrimaryTabSpec } from './tabs';
	import type { Garden } from '@vdt-webapp/common';

	const testGarden: Garden = {
		id: 'gardenId',
		name: 'GardenName',
		visibility: 'HIDDEN',
		creatorId: null,
		adminIds: new Set(),
		editorIds: new Set(),
		viewerIds: new Set(),
		isActive: true,
		createdAt: new Date()
	};

	const gardensTab = getGardensTab([testGarden]);

	const gardenTabs = getGardenSpecifcTabs(testGarden);
</script>

{#snippet sidebarTab(spec: PrimaryTabSpec, flipped: boolean = false)}
	<NavigationMenu.Item class="hover:bg-neutral-3 relative">
		<NavigationMenu.Trigger class="flex h-full w-full items-center p-2">
			<Icon icon={spec.iconId} width="2rem" />
		</NavigationMenu.Trigger>
		<NavigationMenu.Content class="bg-neutral-3 absolute left-full top-0 z-50">
			{#each spec.submenuItems ?? [] as item}
				<NavigationMenu.Link href={item.url}>
					{#if item.iconId}
						<Icon icon={item.iconId} width="2rem" />
					{/if}
					<span class={item.className}>
						{item.label}
					</span>
				</NavigationMenu.Link>
			{/each}
		</NavigationMenu.Content>
	</NavigationMenu.Item>
{/snippet}

<NavigationMenu.Root
	orientation="vertical"
	class="border-neutral-6 bg-neutral-2 fixed top-0 flex h-full flex-col border-r"
>
	<NavigationMenu.List class="relative">
		<!-- VerdanTech logo. -->
		<NavigationMenu.Item class="hover:bg-neutral-3 p-2">
			<NavigationMenu.Link href="/">
				<Logo size="2rem" />
			</NavigationMenu.Link>
		</NavigationMenu.Item>

		<!-- Gardens tab. -->
		{@render sidebarTab(gardensTab)}

		<Separator class="bg-neutral-6" />

		<!-- Garden specific links. -->
		{#each gardenTabs as tab}
			{@render sidebarTab(tab)}
		{/each}
	</NavigationMenu.List>
	<NavigationMenu.Viewport class="absolute" />
</NavigationMenu.Root>
