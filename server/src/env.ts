import { ArkErrors, type } from 'arktype';

/** Default value for JWT key expiry. */
const defaultKeyExpiry = 3 * 24 * 60 * 60;

const EnvSchema = type({
	/** Email verification. */
	/** If true, users will not be able to log in before confirming their email. If false, the email begins verified. */
	EMAIL_VERIFICATION_REQUIRED: 'boolean = true',

	/** Triplit. */
	/** The URL of the Triplit database server. */
	TRIPLIT_URL: 'string.url = "http://localhost:6543"',
	/** The service JWT token provided by triplit for access to the database by the server. */
	TRIPLIT_SERVER_TOKEN:
		'string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdG9rZW4tdHlwZSI6InNlY3JldCIsIngtdHJpcGxpdC1wcm9qZWN0LWlkIjoibG9jYWwtcHJvamVjdC1pZCJ9.8Z76XXPc9esdlZb2b7NDC7IVajNXKc4eVcPsO7Ve0ug"',

	/** Networking. */
	/** The base URL which points to the frontend. */
	CLIENT_BASE_URL: 'string = "http://localhost:5173"',
	/** True if HTTPS connections are being used with the client. */
	USING_HTTPS: 'boolean = false',
	/** True if the client is served from the same domain as the server. */
	CLIENT_SAMESITE: 'boolean = false',
	/** The host the server process is running on. */
	APP_HOST: 'string = "localhost"',
	/** The port the server process is running on. */
	APP_PORT: 'number.integer = 8000',

	/** Cookies. */
	/** The secret used to encode cookie signatures. */
	COOKIE_SECRET: 'string = "secret"',
	COOKIE_SAMESITE: '"strict" | "lax" | "none" = "lax"',

	/** JWTs. */
	/** The secret used to encode JWT access tokens. */
	ACCESS_TOKEN_SECRET: 'string = "secret"',
	/** The secret used to encode JWT refresh tokens. */
	REFRESH_TOKEN_SECRET: 'string = "secret"',
	/** The secret used to encode JWT email confirmation tokens. */
	EMAIL_CONFIRMATION_TOKEN_SECRET: 'string = "secret"',
	/** The secret used to encode JWT password reset tokens.' */
	PASSWORD_RESET_TOKEN_SECRET: 'string = "secret"',
	/** The expiry duration for JWT refresh tokens, in seconds. */
	REFRESH_TOKEN_EXPIRY_S: type('number.integer').default(defaultKeyExpiry),
	/** The expiry duration for JWT email confirmation tokens, in seconds. */
	EMAIL_CONFIRMATION_TOKEN_EXPIRY_S: type('number.integer').default(defaultKeyExpiry),
	/** The expiry duration for JWT password reset tokens, in seconds. */
	PASSWORD_RESET_TOKEN_EXPIRY_S: type('number.integer').default(defaultKeyExpiry),

	/** Emails. */
	/** The host of the SMTP server used for sending emails. */
	SMTP_HOST: 'string = "localhost"',
	/** The port of the SMTP server used for sending emails. */
	SMTP_PORT: 'number.integer = 1025',
	/** The username of the server's user on the SMTP server. */
	SMTP_USERNAME: 'string = "serverSmtpUser"',
	/** The password of the server's user on the SMTP server. */
	SMTP_PASSWORD: 'string = "serverSmtpPassword"',
	/** The email address of the server's user on the SMTP server. */
	SMTP_SENDER: 'string.email = "verdantech@email.com"'
});
type Env = typeof EnvSchema.infer;

const env = EnvSchema(process.env);
if (env instanceof ArkErrors) {
	throw new Error(env.summary);
}
export default env satisfies Env;
