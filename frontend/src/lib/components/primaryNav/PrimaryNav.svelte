<script lang="ts">
	import { Button } from 'bits-ui';
	import Logo from '$lib/assets/logo.svelte';
	import * as Sidebar from "$lib/components/ui/sidebar/index.ts";
  </script>
   
  <Sidebar.Root collapsible={"icon"}>
	<Sidebar.Header>
		<Button.Root
		href="/"
		class="bg-neutral-3 hover:bg-neutral-4 inline-flex h-16 w-full items-center justify-center whitespace-nowrap rounded-none transition-colors"
	>
		<Logo size="3rem" />
	</Button.Root>
	</Sidebar.Header>
	<Sidebar.Content>
	  <Sidebar.Group />
	  <Sidebar.Group />
	</Sidebar.Content>
	<Sidebar.Footer />
  </Sidebar.Root>
  
  