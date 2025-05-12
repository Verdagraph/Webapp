<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import 'tailwindcss/tailwind.css';

	import { Tooltip } from '@vdg-webapp/ui';

	import '../app.pcss';
	import Footer from './Footer.svelte';
	import Nav from './Nav.svelte';

	let { children } = $props();
</script>

<!-- Theme switcher. -->
<ModeWatcher />

<div class="h-screen w-screen">
	<Tooltip.Provider delayDuration={500}>
		<div class="flex flex-col">
			<Nav />
			<div class="min-h-screen">
				{@render children()}
			</div>
			<Footer />
		</div>
	</Tooltip.Provider>
</div>
