import { type Component } from 'svelte';

import { WorkspaceEditor } from './WorkspaceEditor';

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
