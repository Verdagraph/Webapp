<script lang="ts">
	import { DateFormatter } from '@internationalized/date';

	import MainContentContainer from '$components/MainContentContainer.svelte';

	const df = new DateFormatter('en-US', {
		day: '2-digit',
		month: 'long',
		year: 'numeric'
	});

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<MainContentContainer>
	<article>
		<hgroup>
			<h1>{data.meta.title}</h1>
			<p class="text-neutral-10">
				Last updated {df.format(new Date(data.meta.updatedDate))}
			</p>
		</hgroup>

		<div>
			<data.content />
		</div>
	</article>
</MainContentContainer>
