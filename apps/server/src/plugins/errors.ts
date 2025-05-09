import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { ServerError } from '../common/errors.js';
import {
	ServerErrorResponse,
	FieldErrors,
	AppErrors
} from '@vdg-webapp/models';

export const registerErrorHandler = (app: FastifyInstance) => {
	app.setErrorHandler((error: Error, request: FastifyRequest, reply: FastifyReply) => {
		let statusCode = 500;
		let errorMessage = 'No error message set on response.';
		let errorDetails: AppErrors = {
			nonFormErrors: ['Something unexpected happened on the server.']
		};

		/** If the error resulted from an invalid request body schema. */
		if (hasZodFastifySchemaValidationErrors(error)) {
			const fieldErrors: FieldErrors = {};

			/** For each error, put the error message in the array of field errors in the response */
			for (const validationError of error.validation) {
				const fieldName = validationError.instancePath.split('/').join('.');
				if (fieldErrors[fieldName]) {
					fieldErrors[fieldName].push(validationError.message);
				} else {
					fieldErrors[fieldName] = [validationError.message];
				}
			}

			statusCode = 400;
			errorMessage = 'Request body validation failed.';
			errorDetails = {};
			errorDetails['fieldErrors'] = fieldErrors;

			/** Catch all application exceptions. */
		} else if (error instanceof ServerError) {
			statusCode = error.statusCode;
			errorMessage = error.message;
			errorDetails = error.details;
		} else {
			console.error(error);
		}

		reply.code(statusCode).send({
			message: errorMessage,
			details: errorDetails
		} satisfies ServerErrorResponse);
	});
};
