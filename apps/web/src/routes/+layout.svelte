<script lang="ts">
	import { JazzProvider } from 'jazz-tools/svelte';
	import { ModeWatcher } from 'mode-watcher';
	import 'tailwindcss/tailwind.css';

	import AppShell from '$components/AppShell.svelte';
	import { getJazzConfig } from '$data/jazz';
	import { userLogin } from '$data/users/auth';

	import '../app.pcss';

	let { children } = $props();

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
<!--<Toaster richColors />-->

{#if initialized}
	<!-- AppShell (setAppContext) must be inside JazzProvider: gardenContext.svelte.ts
	     reads Jazz's Svelte context (getSession()/getDb()) during its own init. -->
	<JazzProvider {...getJazzConfig()}>
		<AppShell>
			{@render children()}
		</AppShell>
	</JazzProvider>
{/if}
