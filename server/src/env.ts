import { z } from 'zod';

const EnvSchema = z.object({
	TRIPLIT_URL: z
		.string({ description: 'The URL of the Triplit database server.' })
		.url(),
	TRIPLIT_SERVER_TOKEN: z.string({
		description:
			'The service JWT token provided by triplit for access to the database by the server.'
	}),
	USING_HTTPS: z
		.boolean({
			description: 'True if HTTPS connections are being used with the client.'
		})
		.default(false),
	CLIENT_SAMESITE: z
		.boolean({
			description: 'True if the client is served from the same domain as the server.'
		})
		.default(false),
	ACCESS_TOKEN_SECRET: z.string({
		description: 'The secret used to encode JWT access tokens.'
	}),
	REFRESH_TOKEN_SECRET: z.string({
		description: 'The secret used to encode JWT refresh tokens.'
	}),
	ACCESS_TOKEN_EXPIRY_S: z.number({
		description: 'The expiry duration for JWT access tokens, in seconds.'
	}),
	REFRESH_TOKEN_EXPIRY_S: z.number({
		description: 'The expiry duration for JWT refresh tokens, in seconds.'
	}),
	COOKIE_SECRET: z.string({
		description: 'The secret used to encode cookie signatures.'
	})
});

const env = EnvSchema.parse(process.env);
export default env;
