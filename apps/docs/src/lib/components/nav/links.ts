import type { TreeItem } from 'melt/builders';

import { externalLinks } from '@vdg-webapp/ui';

import env from '$lib/env';

export type NavTreeItem = TreeItem & {
	label: string;
	url?: string;

	children?: NavTreeItem[];
};

/**
 * The item ID should match the name of the file, if applicable.
 */
export const navItems: NavTreeItem[] = [
	{
		id: 'app',
		label: 'Application',
		children: [
			{ id: 'appStart', label: 'Start the Application', url: env.APP_URL },
			{ id: 'appDemo', label: 'View the Demonstration', url: '/demos' }
		]
	},
	{
		id: 'project',
		label: 'Project',
		children: [
			{ id: 'about', label: 'About', url: '/about' },
			{
				id: 'support',
				label: 'Support the Project',
				url: '/support'
			},
			{ id: 'donate', label: 'Donation', url: externalLinks.donation },
			{ id: 'source', label: 'Source Code', url: externalLinks.repository }
		]
	},
	{
		id: 'community',
		label: 'Community',
		children: [
			{ id: 'newsletter', label: 'Newsletter', url: env.NEWSLETTER_URL },
			{ id: 'blog', label: 'Blog', url: '/blog' },
			{ id: 'email', label: 'Email', url: 'mailto:contact@verdagraph.org' }
		]
	},
	{
		id: 'docs',
		label: 'Documentation',
		children: [
			{ id: 'introduction', label: 'Introduction', url: '/docs/introduction' },
			{ id: 'faq', label: 'Frequently Asked Questions', url: '/docs/faq' },
			{ id: 'concepts', label: 'Concepts', url: '/docs/concepts' },
			{ id: 'hosting', label: 'Self Hosting Instructions', url: '/docs/self-hosting' },
			{
				id: 'usage',
				label: 'General Usage',
				children: [
					{
						id: 'garden-management',
						label: 'Garden Management',
						url: '/docs/garden-management'
					},
					{
						id: 'workspace-environment-config',
						label: 'Workspace & Environment Configuration',
						url: '/docs/workspace-environment-config'
					},
					{
						id: 'cultivar-config',
						label: 'Cutivar Configuration',
						url: '/docs/cultivar-config'
					}
				]
			},
			{
				id: 'tutorials',
				label: 'Tutorials',
				children: [
					{
						id: 'garden-setup',
						label: 'Setup a New Garden',
						url: '/docs/garden-setup'
					},
					{
						id: 'first-plan',
						label: 'Creating your First Plan',
						url: '/docs/first-plan'
					}
				]
			}
		]
	}
];

export const blogNavItems: NavTreeItem[] = [];
