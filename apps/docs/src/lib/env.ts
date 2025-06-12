import { z } from 'zod';

import * as variables from '$env/static/public';

const EnvSchema = z.object({
	/** URLs */
	APP_URL: z
		.string({
			description: 'The base URL of the application.'
		})
		.url()
		.default('http://localhost:5173'),
	DEMO_URL: z
		.string({
			description: 'The base URL of the demonstration.'
		})
		.url()
		.default('http://localhost:5175'),
	NEWSLETTER_URL: z
		.string({ description: 'The URL to the newsletter signup.' })
		.url()
		.default('https://newsletter.verdagraph.org/subscription/form')
});

const env = EnvSchema.parse(variables);
export default env;
