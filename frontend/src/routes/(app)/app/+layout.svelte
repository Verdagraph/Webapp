<script>
	import PrimaryNav from '$components/primaryNav';
	import { userLogin } from '$data/users/auth';

	let { children } = $props();

	/**
	 * For development purposes, automatically log the user in.
	 * TODO: Make this conditional based on environment variables.
	 */
	const autoLogIn = false;
	let initialized = $state(false);

	if (autoLogIn) {
		setTimeout(() => {
			userLogin
				.mutation({ email: 'nathanielarking@gmail.com', password: 'password' })
				.then(() => {
					initialized = true;
				});
		}, 1000);
	} else {
		initialized = true;
	}
</script>

{#if initialized}
	<PrimaryNav {children}></PrimaryNav>
{/if}
