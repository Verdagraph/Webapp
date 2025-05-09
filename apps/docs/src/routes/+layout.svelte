<script lang="ts">
	import 'tailwindcss/tailwind.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Tooltip } from '@vdg-webapp/ui';
	import Nav from './Nav.svelte';
	import '../app.pcss';

	let { children } = $props();
</script>

<!-- Theme switcher. -->
<ModeWatcher />

<div class="h-screen w-screen overflow-hidden">
	<Tooltip.Provider delayDuration={500}>
		<Nav />
		{@render children()}
	</Tooltip.Provider>
</div>
