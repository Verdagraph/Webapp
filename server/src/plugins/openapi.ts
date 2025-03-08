import type { Hono } from 'hono';
import { openAPISpecs } from 'hono-openapi';
import { apiReference } from '@scalar/hono-api-reference';

export const registerOpenapi = (app: Hono) => {
	app.get(
		'/openapi',
		openAPISpecs(app, {
			documentation: {
				info: {
					title: 'VerdanTech Webapp Server',
					description: 'Server of the VerdanTech web application.',
					version: '0.0.1'
				},
				tags: [{ name: 'user', description: 'User endpoints.' }]
			}
		})
	);

	app.get('/schema', apiReference({ spec: { url: '/openapi' } }));
};
