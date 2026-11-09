/**
 * Normalizes a cultivar name for matching: case, accents, apostrophes, and runs of
 * whitespace, hyphens and underscores do not distinguish names.
 * Plurals are deliberately not folded.
 * @param name The name to normalize.
 * @returns The normalized name.
 */
export function normalizeCultivarName(name: string): string {
	return name
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/['\u2019]/g, '')
		.replace(/[\s_-]+/g, ' ')
		.trim();
}

/**
 * Lists every name a cultivar answers to: its primary name, then its other names.
 * @param cultivar The cultivar, or its names.
 * @returns The primary name followed by the other names.
 */
export function allCultivarNames(cultivar: {
	name: string;
	names?: Iterable<string> | null;
}): string[] {
	return [cultivar.name, ...(cultivar.names ?? [])];
}

/**
 * Checks whether a cultivar answers to a name, loosely.
 * @param cultivar The cultivar to check.
 * @param targetName The name to look for.
 * @returns True if the normalized name matches the primary name or any other name.
 */
export function cultivarMatchesName(
	cultivar: { name: string; names?: Iterable<string> | null },
	targetName: string
): boolean {
	const normalizedTarget = normalizeCultivarName(targetName);
	return allCultivarNames(cultivar).some(
		(name) => normalizeCultivarName(name) === normalizedTarget
	);
}

/**
 * Counts what a reader sees as characters, so accented and non-Latin letters count once.
 * String length counts UTF-16 units, which would over-count anything outside the basic plane.
 * @param text The text to measure.
 * @returns The number of code points.
 */
export function codePointLength(text: string): number {
	return [...text].length;
}
