import { externalLinks } from '@vdg-webapp/ui';

import env from '$lib/env';

export type NavTreeItem = {
	label: string;
	url?: string;

	children?: NavTreeItem[];
};

export const navItems: NavTreeItem[] = [
	{
		label: 'Application',
		children: [
			{ label: 'Start the Application', url: env.APP_URL },
			{ label: 'View the Demonstration', url: '/demo' }
		]
	},
	{
		label: 'Project',
		children: [
			{ label: 'About', url: '/about' },
			{ label: 'Support the Project', url: '/about#support-the-project' },
			{ label: 'Donation', url: '/about#financial' },
			{ label: 'Contributing', url: '/about#development' },
			{ label: 'Source Code', url: externalLinks.repository }
		]
	},
	{
		label: 'Community',
		children: [
			{ label: 'Newsletter', url: 'newsletter.verdagraph.org' },
			{ label: 'Blog', url: '/blog' },
			{ label: 'Email', url: 'mailto:contact@verdagraph.org' }
		]
	}
];

export const docsNavItems: NavTreeItem[] = [
	{
		label: 'Documentation',
		children: [
			{ label: 'Introduction', url: '/docs' },
			{ label: 'Concepts', url: '/docs/concepts' },
			{ label: 'Self Hosting Instructions', url: '/docs/self-hosting' },
			{
				label: 'General Usage',
				children: [
					{ label: 'Gardens Management', url: '' },
					{ label: 'Workspace & Environment Configuration', url: '' },
					{ label: 'Cutivar Configuration', url: '' },
					{ label: 'Plant Modelling', url: '' }
				]
			},
			{ label: 'Tutorials', children: [{ label: 'Creating your First Plan', url: '' }] }
		]
	}
];

export const blogNavItems: NavTreeItem[] = [];
