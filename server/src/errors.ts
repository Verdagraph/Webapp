import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { ServerError } from './common/errors';

export const registerErrorHandler = (app: FastifyInstance) => {
	app.setErrorHandler((error: Error, request: FastifyRequest, reply: FastifyReply) => {
		/** If the error resulted from an invalid request body schema. */
		if (hasZodFastifySchemaValidationErrors(error)) {
			console.log(error);
		}

		/** Catch all application exceptions. */
		if (error instanceof ServerError) {
			console.log(error);
		}
	});
};
export default registerErrorHandler;
