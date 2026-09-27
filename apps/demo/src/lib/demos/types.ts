import type { Component } from 'svelte';

export type Demo = {
	id: string;
	title: string;
	description?: string;
	component: Component;
};
