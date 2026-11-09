import { seed } from '$lib/seeds';

import type { Demo } from '../types';
import CultivarEditor from './CultivarEditor.svelte';

export const cultivarDemo: Demo = {
	id: 'cultivar-editor',
	title: 'Cultivar Editor',
	description:
		'The cultivar editor allows editing cultivar collections and their cultivars, and exporting or importing them as JSON.',
	component: CultivarEditor,
	seed: seed
};
