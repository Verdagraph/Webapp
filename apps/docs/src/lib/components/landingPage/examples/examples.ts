import { type Component } from 'svelte';

import { WorkspaceEditor } from './WorkspaceEditor';

/**
 * Describes one item in the carousel on the landing page.
 */
type LandingPageExample = {
	name: string;
	description: string;
	component: Component;
};

export const examples: LandingPageExample[] = [
	{
		name: 'Planting Areas',
		description: 'Garden beds, areas, and any geometry can be flexibly represented.',
		component: WorkspaceEditor
	}
];
