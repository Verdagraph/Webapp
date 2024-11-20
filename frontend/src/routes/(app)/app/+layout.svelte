<script>
	import PrimaryNav from '$components/primaryNav';

	let { children } = $props();
</script>

<!-- Wraps the primary nav to provide proper spacing between the nav and content. -->
		<PrimaryNav />
		<main>
		{@render children()}
    </main>