<script lang="ts">
	import ClientAvatarIcon from '$components/misc/ClientAvatarIcon.svelte';
	import type { PrimaryTabSpec } from './tabs.svelte';
	import Tab from './Tab.svelte';
	import BottombarGardenDrawer from './BottombarGardenDrawer.svelte';
	import activeGardenId from '$state/activeGarden.svelte';

	type Props = {
		gardensTab: PrimaryTabSpec;
		gardenTabs: PrimaryTabSpec[];
		traitsTab: PrimaryTabSpec;
		resourcesTab: PrimaryTabSpec;
		profileTab: PrimaryTabSpec;
	};
	let { gardensTab, gardenTabs, traitsTab, resourcesTab, profileTab }: Props = $props();
</script>

{#snippet clientProfileIcon()}
	<ClientAvatarIcon size="3rem" />
{/snippet}

<!--
@component
Small screens bottom bar.
-->
<nav class="border-neutral-6 bg-neutral-2 fixed bottom-0 h-16 w-full border-t">
	<ul class="flex flex-row items-center justify-around">
		<Tab
			spec={profileTab}
			side="top"
			flipped={true}
			iconSize="3rem"
			altIcon={clientProfileIcon}
		/>
		<Tab spec={resourcesTab} side="top" flipped={true} iconSize="3rem" />
		<Tab spec={traitsTab} side="top" flipped={true} iconSize="3rem" />
		<Tab spec={gardensTab} side="top" flipped={true} iconSize="3rem" />
		{#if activeGardenId.value}
			<BottombarGardenDrawer {gardenTabs} />
		{/if}
	</ul>
</nav>
