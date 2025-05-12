<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import 'tailwindcss/tailwind.css';

	import { Tooltip } from '@vdg-webapp/ui';

	import '../app.pcss';
	import Nav from './Nav.svelte';

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
