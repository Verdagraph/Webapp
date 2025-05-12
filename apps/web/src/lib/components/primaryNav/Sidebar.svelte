<script lang="ts">
	import { Button } from 'bits-ui';

	import { ClientAvatarIcon, Separator, VdgLogo } from '@vdg-webapp/ui';

	import gardenContext from '$state/gardenContext.svelte';

	import Tab from './Tab.svelte';
	import type { PrimaryTabSpec } from './tabs.svelte';

	type Props = {
		gardensTab: PrimaryTabSpec;
		gardenTabs: PrimaryTabSpec[];
		bottomTabs: PrimaryTabSpec[];
		profileTab: PrimaryTabSpec;
	};
	let { gardensTab, gardenTabs, bottomTabs, profileTab }: Props = $props();
</script>

{#snippet clientProfileIcon()}
	<ClientAvatarIcon size="2rem" />
{/snippet}

<!--
@component
Large screens sidebar.
-->
<nav
	class="border-neutral-8 bg-neutral-2 fixed top-0 flex h-full flex-col justify-between border-r"
>
	<!-- Links displayed at the top. -->
	<ul>
		<!-- Verdagraph logo. -->
		<li class="hover:bg-neutral-3 p-2">
			<Button.Root class="flex items-center justify-center" href="/">
				<VdgLogo size="2rem" />
			</Button.Root>
		</li>

		<!-- Gardens tab. -->
		<Tab spec={gardensTab} side="right" iconSize="2rem" />

		{#if gardenContext.id}
			<Separator.Root class="bg-neutral-6" />

			<!-- Garden specific links. -->
			{#each gardenTabs as tab}
				<Tab spec={tab} side="right" iconSize="2rem" />
			{/each}
		{/if}
	</ul>

	<!-- Links displayed at the bottom. -->
	<ul>
		{#each bottomTabs as tab}
			<Tab spec={tab} flipped={true} side="right" iconSize="2rem" />
		{/each}

		<Tab
			spec={profileTab}
			flipped={true}
			side="right"
			iconSize="2rem"
			altIcon={clientProfileIcon}
		/>
	</ul>
</nav>
