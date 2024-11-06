import { writeFileSync } from 'fs';
import { resolve } from 'path';

import { buildApp } from './src/app';

/**
 * Retrieves the OpenAPI schema from the app's
 * swagger documentation endpoint, and writes it to file.
 */
async function generateSwagger() {
	const app = buildApp();

	const swaggerJson = await app
		.inject({
			method: 'GET',
			url: '/docs/json'
		})
		.then((res) => res.json());

	writeFileSync(
		resolve(process.cwd(), 'openapi.json'),
		JSON.stringify(swaggerJson, null, 2)
	);

	await app.close();
	setTimeout(() => process.exit(0), 500);
}

generateSwagger().catch(console.error);
