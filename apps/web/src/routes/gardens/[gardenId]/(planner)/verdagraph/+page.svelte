<script lang="ts">
	import { Verdagraph } from '@vdg-webapp/ui';

	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};
	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Verdagraph - Verdagraph</title>
</svelte:head>

{#if data.defaultWorkspaceId}
	<Verdagraph contextParams={{ defaultSelectedWorkspaceId: data.defaultWorkspaceId }} />
{:else}
	<div class="flex h-full w-full items-center justify-center">
		<span class="italic">This garden has no workspaces yet.</span>
	</div>
{/if}
