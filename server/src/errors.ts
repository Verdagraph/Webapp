import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { ServerError } from './common/errors';

export const registerErrorHandler = (app: FastifyInstance) => {
	app.setErrorHandler((error: Error, request: FastifyRequest, reply: FastifyReply) => {
		/** If the error resulted from an invalid request body schema. */
		if (hasZodFastifySchemaValidationErrors(error)) {
			const errorResponse: Record<string, Array<string>> = {};

			/** For each error, put the error message in the array of field errors in the response */
			for (const validationError of error.validation) {
				const fieldName = validationError.instancePath.split('/').pop() || '';
				if (errorResponse[fieldName]) {
					errorResponse[fieldName].push(validationError.message);
				} else {
					errorResponse[fieldName] = [validationError.message];
				}
			}

			reply.code(400).send(errorResponse);
		}

		/** Catch all application exceptions. */
		if (error instanceof ServerError) {
			reply.code(error.statusCode).send(error.extra);
		}
	});
};
export default registerErrorHandler;
