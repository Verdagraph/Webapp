import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const page = await import(`../../../docs/${params.slug}.svx`);

		return {
			content: page.default,
			meta: page.metadata
		};
		// eslint-disable-next-line
	} catch (e) {
		error(404, `Could not find ${params.slug}`);
	}
}
