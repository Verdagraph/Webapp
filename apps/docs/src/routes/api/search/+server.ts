import { json } from '@sveltejs/kit';
import matter from 'gray-matter';
import removeMd from 'remove-markdown';

export const prerender = true;

/**
 * Server function to retrieve all the docs and blogs pages
 * and serve their content for search indexing.
 */
export async function GET() {
	const docsPaths = import.meta.glob('/src/docs/**/*.svx', { as: 'raw', eager: true });
	const blogPaths = import.meta.glob('/src/blog/**/*.svx', { as: 'raw', eager: true });

	const paths = { ...docsPaths, ...blogPaths };

	const entries = Object.entries(paths)
		.map(([url, content]) => {
			const frontmatter = matter(content);

			if (!frontmatter.data.published) {
				return null;
			}

			return {
				url: url.replace(/^\/src/, '').replace(/\.svx$/, ''),
				title: frontmatter.data.title,
				slug: frontmatter.data.slug,
				content: removeMd(content)
			};
		})
		.filter(Boolean);

	return json(entries);
}
