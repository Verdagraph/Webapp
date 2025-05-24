<script lang="ts">
	import '@fontsource/atkinson-hyperlegible';
	import { ModeWatcher } from 'mode-watcher';
	import 'tailwindcss/tailwind.css';

	import { Tooltip } from '@vdg-webapp/ui';

	import Nav from '$components/nav/Nav.svelte';

	import '../app.pcss';

	let { children } = $props();
</script>

<!-- Theme switcher. -->
<ModeWatcher />

<Tooltip.Provider delayDuration={500}>
	{@render children()}
</Tooltip.Provider>
