import type { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export const registerOpenapi = (app: FastifyInstance) => {
	app.register(fastifySwagger, {
		openapi: {
			info: {
				title: 'VerdanTech Webapp Server',
				description: 'Server of the VerdanTech web application.',
				version: '0.0.1'
			},
			tags: [{ name: 'user', description: 'User endpoints.' }]
		},
		transform: jsonSchemaTransform
	});

	app.register(fastifySwaggerUI, {
		routePrefix: '/docs'
	});
};

/**
 * Sets an OpenAPI tag on all routes in a router.
 * @param app Fastify app instance.
 * @param tag The tag to set on the router.
 */
export const setTag = (app: FastifyInstance, tag: string) => {
	app.addHook('onRoute', (routeOptions) => {
		routeOptions.schema = routeOptions.schema || {};
		routeOptions.schema.tags = [tag];
	});
};
