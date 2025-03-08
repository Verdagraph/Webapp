import { buildApp } from 'app';
import { serve } from '@hono/node-server';
import env from 'env';

const startServer = async () => {
	const app = buildApp();
	serve({ fetch: app.fetch, port: env.APP_PORT }, (info) => {
		console.log(`Listening on http://localhost:${info.port}`);
	});
};

startServer();
