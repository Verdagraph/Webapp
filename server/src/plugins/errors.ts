import type { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { Type } from 'arktype';
import { arktypeValidator } from '@hono/arktype-validator';
import { ServerError } from '../common/errors';
import {
	ServerErrorResponse,
	FieldErrors,
	AppErrors
} from '@vdt-webapp/common/src/errors';

/**
 * Wraps the default arktype-validator validator
 * to return an error response conforming to the
 * ServerErrorResponse type.
 * @param schema The Arktype type to validate against.
 * @returns The error response.
 */
export function fieldValidator(schema: Type) {
	return arktypeValidator('json', schema, (result, c) => {
		if (result.success) return;

		const fieldErrors: FieldErrors = {};
		const errorDetails: AppErrors = {};
		result.errors.forEach((error) => {
			const fieldPath = error.propString;
			if (!fieldErrors[fieldPath]) {
				fieldErrors[fieldPath] = [];
			}
			fieldErrors[fieldPath].push(error.message);
		});
		errorDetails['fieldErrors'] = fieldErrors;

		return c.json(
			{
				message: 'Request body validation failed.',
				details: errorDetails
			} satisfies ServerErrorResponse,
			400
		);
	});
}

export function registerErrorHandler(app: Hono) {
	app.onError((error, c) => {
		let statusCode: ContentfulStatusCode = 500;
		let errorMessage = 'No error message set on response.';
		let errorDetails: AppErrors = {
			nonFormErrors: ['Something unexpected happened on the server.']
		};

		if (error instanceof ServerError) {
			statusCode = error.statusCode as ContentfulStatusCode;
			errorMessage = error.message;
			errorDetails = error.details;
		} else if (error instanceof HTTPException) {
			statusCode = error.status;
			errorMessage = error.message;
			errorDetails.nonFormErrors = [error.message];
		}

		return c.json(
			{
				message: errorMessage,
				details: errorDetails
			} satisfies ServerErrorResponse,
			statusCode
		);
	});
}
