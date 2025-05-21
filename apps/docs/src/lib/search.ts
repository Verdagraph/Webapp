import FlexSearch, { type Index } from 'flexsearch';

type Entry = {
	url: string;
	title: string;
	slug: string;
	content: string;
};

let postsIndex: Index;
let entries: Entry[];

export function createPostsIndex(data: Entry[]) {
	/** Create the posts index. */
	postsIndex = new FlexSearch.Index({ tokenize: 'forward' });

	data.forEach((post, i) => {
		/** Index the title and content together. */
		const item = `${post.title} ${post.content}`;
		/** Add the item to the index. */
		postsIndex.add(i, item);
	});

	entries = data;
}

export function searchPostsIndex(searchTerm: string) {
	/** Escape special regex characters. */
	const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	/** Return matching post indexes. */
	const results = postsIndex.search(match);

	return (
		results
			/** Filter the posts based on the matched index. */
			.map((index) => entries[index as number])
			.map(({ url, slug, title, content }) => {
				return {
					url,
					slug,
					/** Replace match in title with a marker. */
					title: replaceTextWithMarker(title, match),
					/** Match words in post and replace matches with marker. */
					content: getMatches(content, match)
				};
			})
	);
}

function getMatches(text: string, searchTerm: string, limit = 1) {
	/** Dynamic regex. */
	const regex = new RegExp(searchTerm, 'gi');
	/** Indexes of the matched words. */
	const indexes = [];
	/** Match count. */
	let matches = 0;
	/** Current match. */
	let match;

	/** Find all matched word indexes. */
	while ((match = regex.exec(text)) !== null && matches < limit) {
		indexes.push(match.index);
		matches++;
	}

	/** Return sections of text around the indexes. */
	return indexes.map((index) => {
		const start = index - 20;
		const end = index + 80;
		const excerpt = text.substring(start, end).trim();
		return `...${replaceTextWithMarker(excerpt, searchTerm)}...`;
	});
}

function replaceTextWithMarker(text: string, match: string) {
	const regex = new RegExp(match, 'gi');
	return text.replaceAll(regex, (match) => `<mark>${match}</mark>`);
}
