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
			{ id: 'appDemo', label: 'View the Demonstration', url: '/demo' }
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
				url: '/about#support-the-project'
			},
			{ id: 'donate', label: 'Donation', url: '/about#financial' },
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
					{ id: 'gardensManagement', label: 'Gardens Management', url: '' },
					{
						id: 'workspaceEnvironmentManagement',
						label: 'Workspace & Environment Configuration',
						url: ''
					},
					{ id: 'cultivarConfig', label: 'Cutivar Configuration', url: '' },
					{ id: 'plantModelling', label: 'Plant Modelling', url: '' }
				]
			},
			{
				id: 'tutorials',
				label: 'Tutorials',
				children: [
					{ id: 'gardenSetupTutorial', label: 'Setup a New Garden', url: '' },
					{ id: 'firstPlanTutorial', label: 'Creating your First Plan', url: '' }
				]
			}
		]
	}
];

export const blogNavItems: NavTreeItem[] = [];
