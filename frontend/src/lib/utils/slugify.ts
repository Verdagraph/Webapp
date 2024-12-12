/**
 * Converts a string to a URL-safe version.
 * Taken from https://dev.to/bybydev/how-to-slugify-a-string-in-javascript-4o9n.
 * @param input String to slugify.
 * @returns The slugified string.
 */
export function slugify(input: string): string {
	/* Trim leading/trailing white space. */
	input = input.replace(/^\s+|\s+$/g, '');
	/* Convert string to lowercase. */
	input = input.toLowerCase();
	/* Remove any non-alphanumeric characters. */
	input = input
		.replace(/[^a-z0-9 -]/g, '')
		.replace(/\s+/g, '-') /* Replace spaces with hyphens. */
		.replace(/-+/g, '-'); /* Remove consecutive hyphens. */
	return input;
}
