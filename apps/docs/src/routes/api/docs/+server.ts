import { json } from '@sveltejs/kit';

import type { DocPage } from '$lib/types.ts';

async function getDocs() {
	let pages: DocPage[] = [];

	const paths = import.meta.glob('/src/docs/*.svx', { eager: true });

	console.log(paths);

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.svx', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<DocPage, 'slug'>;
			const page = { ...metadata, slug } satisfies DocPage;
			if (page.published) {
				pages.push(page);
			}
		}
	}

	pages = pages.sort(
		(first, second) =>
			new Date(second.updatedDate).getTime() - new Date(first.updatedDate).getTime()
	);

	return pages;
}

export async function GET() {
	const pages = await getDocs();
	return json(pages);
}
