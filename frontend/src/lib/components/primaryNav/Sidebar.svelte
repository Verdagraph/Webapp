	
<script lang="ts">
	import Logo from '$lib/assets/logo.svelte';
	import { Button } from 'bits-ui';
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
	import SidebarTab from './SidebarTab.svelte';
	import { getGardenSpecifcTabs } from './tabs';

	const gardenTabs = getGardenSpecifcTabs({id: 'gardenId', name: 'GardenName', visibility: 'HIDDEN', creatorId: null, adminIds: new Set(), editorIds: new Set(), viewerIds: new Set()})
  </script>
   
  <Sidebar.Root collapsible="none" class="border-r">
	<Sidebar.Header class="hover:bg-neutral-2">
		<!-- VerdanTech logo. -->
			<Button.Root
				href="/"
			>
				<Logo size="2rem" />
			</Button.Root>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Menu class="rounded-none">
			{#each gardenTabs as tab}
				<SidebarTab spec={tab} />
			{/each}
		</Sidebar.Menu>
	</Sidebar.Content>
	<Sidebar.Footer>

	</Sidebar.Footer>
  </Sidebar.Root>
  
  