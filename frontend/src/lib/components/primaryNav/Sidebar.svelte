<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index';
	import Logo from '$lib/assets/logo.svelte';
	import Icon from '@iconify/svelte';
	import * as Avatar from '$components/ui/avatar'
	import { Button } from 'bits-ui';
	import { getGardenSpecifcTabs, getGardensTab, getNonGardenSpecificTabs, getProfileTab } from './tabs';
	import type { PrimaryTabSpec } from './tabs';
	import type { Garden } from '@vdt-webapp/common';
	import SidebarTab from './SidebarTab.svelte';

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
	const bottomTabs = getNonGardenSpecificTabs()
	const profileTab = getProfileTab()
</script>


{#snippet avatarIcon()}
<Avatar.Root class="w-[2rem] h-[2rem]">
	<Avatar.Image src="" alt="" />
	<Avatar.Fallback>CN</Avatar.Fallback>
  </Avatar.Root>
{/snippet}

<nav
	class="border-neutral-6 bg-neutral-2 fixed top-0 flex h-full flex-col border-r justify-between"
>
	<!-- Links displayed at the top. -->
	<ul>
		<!-- VerdanTech logo. -->
		<li class="hover:bg-neutral-3 p-2">
			<Button.Root href="/">
				<Logo size="2rem" />
			</Button.Root>
		</li>

		<!-- Gardens tab. -->
		<SidebarTab spec={gardensTab} />

		<Separator class="bg-neutral-6" />

		<!-- Garden specific links. -->
		{#each gardenTabs as tab}
			<SidebarTab spec={tab} />
		{/each}
	</ul>

	<!-- Links displayed at the bottom. -->
	<ul>
		{#each bottomTabs as tab}
			<SidebarTab spec={tab} flipped={true} />
		{/each}

		<SidebarTab spec={profileTab} flipped={true} altIcon={avatarIcon}/>
	</ul>
</nav>
