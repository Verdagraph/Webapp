	
<script lang="ts">
	import Logo from '$lib/assets/logo.svelte';
	import { Button } from 'bits-ui';
	import {NavigationMenu } from "bits-ui"
	import SidebarTab from './SidebarTab.svelte';
	import { getGardenSpecifcTabs } from './tabs';

	const gardenTabs = getGardenSpecifcTabs({id: 'gardenId', name: 'GardenName', visibility: 'HIDDEN', creatorId: null, adminIds: new Set(), editorIds: new Set(), viewerIds: new Set()})
  </script>

  <NavigationMenu.Root orientation="vertical" class="border-neutral-6 bg-neutral-3 fixed top-0 z-10 hidden h-full w-10 flex-col items-center justify-between border-r lg:flex">
	  <NavigationMenu.List>
		<!-- VerdanTech logo. -->
		<NavigationMenu.Item>
			<NavigationMenu.Link href="/">
				<Logo size="2rem" />
			</NavigationMenu.Link>
		</NavigationMenu.Item>

		<!-- Garden specific links. -->
		{#each gardenTabs as tab}
		<SidebarTab spec={tab} />
		{/each}
	</NavigationMenu.List>

		<NavigationMenu.Viewport class=""
		/>
  </NavigationMenu.Root>