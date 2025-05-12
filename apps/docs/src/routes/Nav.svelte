<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Button, Popover, Separator, iconIds } from '@vdg-webapp/ui';

	import env from '$lib/env';

	let navLinks = [
		{
			url: '/demo',
			label: 'Demonstration'
		},
		{
			url: '/docs',
			label: 'Documentation'
		},
		{
			url: '/about',
			label: 'About'
		},
		{ url: '/support', label: 'Support' }
	];
</script>

<!--
@component
Primary navigation between the docs pages and app resources.
-->
<header
	class="border-neutral-6 sticky left-0 top-0 w-full rounded-none border-b
		drop-shadow-md"
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
			<Popover.Root>
				<Popover.Trigger>
					<Icon icon={iconIds.dropdownMenuIcon} width="3rem" />
				</Popover.Trigger>
				<Popover.Content class="w-auto">
					<ul class="flex flex-col">
						<!-- 
							Navigation menu link snippet.
						-->
						{#snippet menuLink(url: string, label: string)}
							<Button.Root href={url} variant="link">
								{label}
							</Button.Root>
						{/snippet}

						{#each navLinks as link}
							<li>
								{@render menuLink(link.url, link.label)}
							</li>
						{/each}
						<Separator.Root class="bg-neutral-6 w-full opacity-50" />
						<li>
							{@render menuLink(env.APP_URL, 'Start the Application')}
						</li>
					</ul>
				</Popover.Content>
			</Popover.Root>
		</div>

		<!-- 
        Rightmost button links.
        Displayed with a top horizontal menu on larger screens.
    	-->
		<ul class="hidden gap-8 text-lg md:flex">
			<li class="hidden lg:block">
				<Button.Root href={env.APP_URL} variant="default">Get Started</Button.Root>
			</li>
		</ul>
	</nav>
</header>
