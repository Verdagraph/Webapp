<script lang="ts">
	import Sidebar from './Sidebar.svelte';
	import Bottombar from './Bottombar.svelte';
	import { IsMobile } from '$lib/state/isMobile.svelte';

	let { gardensTab, gardenTabs, profileTab, traitsTab, resourcesTab, children } =
		$props();

	const isMobile = new IsMobile();
</script>

{#if isMobile.current}
	<div class="flex h-screen w-screen flex-col overflow-clip">
		<div class="mb-16 ml-0 h-auto w-full grow overflow-auto">
			{@render children()}
		</div>
		<Bottombar {gardensTab} {gardenTabs} {traitsTab} {resourcesTab} {profileTab} />
	</div>
{:else}
	<div class="flex h-screen w-screen flex-row overflow-clip">
		<Sidebar
			{gardensTab}
			{gardenTabs}
			bottomTabs={[traitsTab, resourcesTab]}
			{profileTab}
		/>
		<div class="mb-0 ml-14 h-auto w-full grow overflow-auto">
			{@render children()}
		</div>
	</div>
{/if}
