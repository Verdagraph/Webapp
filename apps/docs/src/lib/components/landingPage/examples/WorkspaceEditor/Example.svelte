<script lang="ts">
	import { mode } from 'mode-watcher';

	import darkUrl from './workspaceDark.png';
	import lightUrl from './workspaceLight.png';
</script>

{#if mode.current === 'dark'}
	<enhanced:img src={darkUrl || ''} alt="" class="h-full w-full" />
{:else}
	<enhanced:img src={lightUrl || ''} alt="" class="h-full w-full" />
{/if}
