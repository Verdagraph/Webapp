<script lang="ts">
	import { Card, Separator } from '@vdg-webapp/ui';
</script>

<svelte:head>
	<title>Traits - Verdagraph</title>
</svelte:head>

<div class="m-auto mt-12 flex w-3/4 flex-col items-center">
	<h1 class="text-4xl">Traits</h1>
	<p>
		Verdagraph's flexible system for specifying model behaviour and sharing data amongst
		gardens and users.
	</p>
</div>

<Card.Root class="m-auto mt-12 w-3/4 md:w-1/2 lg:w-1/3">
	<Card.Header class="m-auto flex flex-col items-center">
		<Card.Title>Cultivars</Card.Title>
		<Card.Description>Describes the behaviour of plant species.</Card.Description>
		<Separator.Root class="bg-neutral-7" />
	</Card.Header>
	<Card.Content>
		<div>Public Data - discover button</div>
		<div>Your Data</div>
		<Separator.Root class="bg-neutral-7" />
	</Card.Content>
</Card.Root>
