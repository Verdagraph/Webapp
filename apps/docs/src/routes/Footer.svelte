<script lang="ts">
	import { Button, externalLinks } from '@vdg-webapp/ui';

	import env from '$lib/env';

	type LinkCategory = {
		label: string;
		links: { label: string; href: string }[];
	};
	const linkCategories: LinkCategory[] = [
		{
			label: 'Project',
			links: [
				{ label: 'Documentation', href: '/docs' },
				{ label: 'About', href: '/about' },
				{ label: 'Source Code', href: externalLinks.repository }
			]
		},
		{
			label: 'Application',
			links: [
				{ label: 'Start the application', href: env.APP_URL },
				{ label: 'View the Demonstration', href: '/demo' },
				/** TODO: Update once this href is known. */
				{ label: 'Self-hosting Instructions', href: '/docs' }
			]
		},
		/** TODO: Update once this href is known. */
		{
			label: 'Contact',
			links: [
				{ label: 'Blog', href: '/blog' },
				{ label: 'Newsletter', href: env.NEWSLETTER_URL },
				{ label: 'Email', href: 'mailto:contact@verdagraph.org' },
				{ label: 'Support the Project', href: '/support' },
				{ label: 'Liberapay', href: externalLinks.donation },
				{ label: 'Contributing', href: '' }
			]
		}
	];
</script>

<footer
	class="bg-neutral-2 border-neutral-6 mt-8 flex w-full justify-around border-t py-12"
>
	{#each linkCategories as linkCategory}
		<ul class="flex flex-col">
			<span class="text-neutral-10 mb-4 text-sm">{linkCategory.label}</span>
			{#each linkCategory.links as link}
				<li>
					<Button.Root
						variant="link"
						href={link.href}
						class="text-neutral-11 h-8 p-0 text-xs"
					>
						{link.label}
					</Button.Root>
				</li>
			{/each}
		</ul>
	{/each}
</footer>
