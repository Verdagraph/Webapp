import type { Demo } from '../types';
import Verdagraph from './Verdagraph.svelte';
import seed from './seed';

export const workspaceDemo: Demo = {
	id: 'Verdagraph',
	title: 'Verdagraph',
	description:
		'The verdagraph provides the main editing interface for plants and planning.',
	component: Verdagraph,
	seed: seed
};
