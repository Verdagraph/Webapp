<script lang="ts">
	import { mode } from 'mode-watcher';

	import darkUrl from './workspaceDark.png';
	import lightUrl from './workspaceLight.png';

	const alt =
		'A screenshot of the workspace editor section of the application, where workspaces and other entities such as planting areas may be edited.';
</script>

{#if mode.current === 'dark'}
	<enhanced:img src={darkUrl || ''} {alt} class="" />
{:else}
	<enhanced:img src={lightUrl || ''} {alt} class="" />
{/if}
