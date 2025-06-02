import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const page = await import(`../../../blog/${params.slug}.svx`);

		return {
			content: page.default,
			meta: page.metadata
		};
		// eslint-disable-next-line
	} catch (e) {
		error(404, `The documentation article "${params.slug}" could not be found.`);
	}
}
