<script>
	import PrimaryNav from '$components/primaryNav';

	let { children } = $props();
</script>

<PrimaryNav >
	{@render children()}
</PrimaryNav>
