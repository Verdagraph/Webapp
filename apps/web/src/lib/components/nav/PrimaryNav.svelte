<script lang="ts">
	import type { Snippet } from 'svelte';

	import { IsMobile } from '@vdg-webapp/ui';

	import Bottombar from './Bottombar.svelte';
	import Sidebar from './Sidebar.svelte';
	import { type PrimaryTabSpec } from './tabs.svelte';

	type Props = {
		gardensTab: PrimaryTabSpec;
		gardenTabs: PrimaryTabSpec[];
		profileTab: PrimaryTabSpec;
		traitsTab: PrimaryTabSpec;
		resourcesTab: PrimaryTabSpec;
		children: Snippet;
	};
	let { gardensTab, gardenTabs, profileTab, traitsTab, resourcesTab, children }: Props =
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
