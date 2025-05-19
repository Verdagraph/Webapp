<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Button, Popover, Separator, iconIds } from '@vdg-webapp/ui';

	import env from '$lib/env';

	import MobileNav from './MobileNav.svelte';

	let navLinks = [
		{
			url: '/demo',
			label: 'Demo'
		},
		{ url: env.APP_URL, label: 'App' },
		{
			url: '/docs',
			label: 'Docs'
		}
	];
</script>

<!--
@component
Primary navigation between the docs pages and app resources.
-->
<header
	class="sticky bottom-0 left-0 w-full rounded-none border-t drop-shadow-md sm:top-0
		sm:border-b"
>
	<nav class="bg-neutral-2 flex items-center justify-between px-8 py-2">
		<!-- 
            Logo and Verdagraph text.
            Logo displayed always. Text displayed on larger screens.
        -->
		<div>
			<ul class="flex items-center gap-6 p-2 text-lg">
				<li>
					<a href="/" class="">
						<span class="font-semibold">Verdagraph</span>
					</a>
				</li>
			</ul>
		</div>

		<!-- 
            Navigation links.
            Displayed within top horizontal menu on larger screens.
        -->
		<ul class="hidden gap-4 md:flex md:gap-8 lg:gap-12">
			{#each navLinks as link}
				<li class="">
					<Button.Root href={link.url} variant="ghost">{link.label}</Button.Root>
				</li>
			{/each}
		</ul>

		<!-- 
            Navigation links.
            Displayed within dropdown menu on smaller screens.
        -->
		<div class="flex lg:hidden">
			<MobileNav />
		</div>
	</nav>
</header>
