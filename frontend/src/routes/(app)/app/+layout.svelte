<script>
	import * as Sidebar from '$lib/components/ui/sidebar/index.ts';
	import PrimaryNav from '$components/primaryNav';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<PrimaryNav />
	<main>
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
