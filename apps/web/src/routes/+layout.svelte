<script lang="ts">
	import 'tailwindcss/tailwind.css';
	import PrimaryNav from '$components/primaryNav';
	import { Toaster } from '$components/ui/sonner';
	import * as Tooltip from '$components/ui/tooltip';
	import { ModeWatcher } from 'mode-watcher';
	import mode from '$state/theme.svelte';
	import { mode as modeWatcher } from 'mode-watcher';
	import { userLogin } from '$data/users/auth';
	import '../app.pcss';

	let { children } = $props();

	/**
	 * Track ModeWatcher's value into a svelte 5 rune.
	 * TODO: Remove once ModeWatcher is updated to svelte 5.
	 */
	modeWatcher.subscribe((value) => {
		mode.value = value;
	});

	/**
	 * For development purposes, automatically log the user in.
	 * TODO: Make this conditional based on environment variables.
	 */
	const autoLogIn = true;
	let initialized = $state(false);
	if (autoLogIn) {
		setTimeout(() => {
			userLogin
				.mutation({ email: 'test@Verdagraph.com', password: 'password' })
				.then(() => {
					initialized = true;
				});
		}, 1000);
	} else {
		initialized = true;
	}
</script>

<!-- Theme switcher. -->
<ModeWatcher />

<!-- Sonner toaster from Shadcn-svelte -->
<Toaster richColors />

{#if initialized}
	<div class="h-screen w-screen overflow-hidden">
		<Tooltip.Provider delayDuration={500}>
			<PrimaryNav>
				{@render children()}
			</PrimaryNav>			
		</Tooltip.Provider>
	</div>
{/if}
