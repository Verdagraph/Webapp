import type { BlogPage } from '$lib/types';

export async function load({ fetch }) {
	const response = await fetch('/api/blog');
	const pages: BlogPage[] = await response.json();
	return { pages };
}
