<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import CreateWorkspaceForm from './CreateWorkspaceForm.svelte';
</script>

<svelte:head>
	<title>New Workspace - Verdagraph</title>
</svelte:head>

<Card.Root class="m-auto mt-12 w-3/4 md:w-1/2 lg:w-1/3">
	<Card.Header>
		<Card.Title>Create a Workspace</Card.Title>
	</Card.Header>
	<Card.Content>
		<CreateWorkspaceForm />
	</Card.Content>
</Card.Root>
