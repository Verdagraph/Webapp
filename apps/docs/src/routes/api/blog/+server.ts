import { json } from '@sveltejs/kit';

import type { BlogPage } from '$lib/types.ts';

/**
 * @returns Returns the content of all the .svx pages contained
 * within the `blog` folder.
 */
async function getBlogs() {
	let pages: BlogPage[] = [];

	const paths = import.meta.glob('/src/blog/*.svx', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.svx', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<BlogPage, 'slug'>;
			const page = { ...metadata, slug } satisfies BlogPage;
			if (page.published) {
				pages.push(page);
			}
		}
	}

	pages = pages.sort(
		(first, second) =>
			new Date(second.publishedDate).getTime() - new Date(first.publishedDate).getTime()
	);

	return pages;
}

/**
 * Svelte server endpoint.
 * @returns Returns all the blog pages in JSON.
 */
export async function GET() {
	const pages = await getBlogs();
	return json(pages);
}
