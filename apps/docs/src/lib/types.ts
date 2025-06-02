export type DocsCategories = 'general' | 'usage' | 'tutorials';
export type BlogsCategories = 'announcements' | 'releases';

/**
 * An entry into the documentation pages.
 */
export type DocPage = {
	title: string;
	slug: string;
	description: string;
	updatedDate: string;
	categories: DocsCategories[];
	published: boolean;
};

/**
 * An entry into the blog pages.
 */
export type BlogPage = {
	title: string;
	slug: string;
	description: string;
	publishedDate: string;
	categories: BlogsCategories[];
	published: boolean;
};
