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
			}
		},
		transform: jsonSchemaTransform
	});

	app.register(fastifySwaggerUI, {
		routePrefix: '/docs'
	});
};
export default registerOpenapi;
