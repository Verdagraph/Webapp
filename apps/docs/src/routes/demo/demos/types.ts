import type { Component } from 'svelte';

export type Demo = {
	title: string;
	description?: string;
	component: Component;
};
