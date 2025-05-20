export type DocsCategories = 'general' | 'usage' | 'tutorials';
export type BlogsCategories = 'announcements' | 'releases';

export type DocPage = {
	title: string;
	slug: string;
	description: string;
	updatedDate: string;
	categories: DocsCategories[];
	published: boolean;
};

export type BlogPage = {
	title: string;
	slug: string;
	description: string;
	publishedDate: string;
	categories: BlogsCategories[];
	published: boolean;
};
