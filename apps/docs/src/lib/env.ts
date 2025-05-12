import { z } from 'zod';

import * as variables from '$env/static/public';

const EnvSchema = z.object({
	/** URLs */
	APP_URL: z
		.string({
			description: 'The base URL of the application.'
		})
		.url()
		.default('http://localhost:5173')
});

const env = EnvSchema.parse(variables);
export default env;
