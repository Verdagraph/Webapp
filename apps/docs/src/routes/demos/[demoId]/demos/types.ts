import { type BulkInsert } from '@triplit/client';
import type { Component } from 'svelte';

import { schema } from '@vdg-webapp/models';

export type Demo = {
	id: string;
	title: string;
	description?: string;
	component: Component;
	seed: () => BulkInsert<typeof schema>;
};
