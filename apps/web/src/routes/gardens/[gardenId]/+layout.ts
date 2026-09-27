/**
 * Passes the garden's URL slug through to the layout, which resolves and
 * confirms its existence reactively against Jazz (see +layout.svelte).
 */
export function load({ params }) {
	return { gardenId: params.gardenId };
}
