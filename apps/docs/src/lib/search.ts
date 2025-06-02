import FlexSearch, { type Index } from 'flexsearch';

/**
 * An entry into the search index.
 */
type Entry = {
	url: string;

	title: string;
	slug: string;
	content: string;
};

let postsIndex: Index;
let entries: Entry[];

/**
 * Given a list of entries representing the search items,
 * creates the posts index.
 * @param data The entries to use.
 */
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

/**
 * Given a search term, filters the posts index.
 * @param searchTerm The search term to use.
 * @returns The filtered entries.
 */
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

/**
 * Searches a section of text with a search term and
 * returns a number sub-strings around the matched term.
 * @param text The text to search.
 * @param searchTerm The search term.
 * @param limit The max limit of matches.
 * @returns Strings around the matched characters.
 */
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

/**
 * Surrounds matched text with a marker.
 * @param text The text to process.
 * @param match The match term to mark.
 * @returns The text with the matched text marked.
 */
function replaceTextWithMarker(text: string, match: string) {
	const regex = new RegExp(match, 'gi');
	return text.replaceAll(regex, (match) => `<mark>${match}</mark>`);
}
