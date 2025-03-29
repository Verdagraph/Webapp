import { type AppErrors, AppError } from '@vdg-webapp/common/src/errors';

/**
 * Base class for all application exceptions raised by the server code.
 */
export class ServerError extends AppError {
	statusCode: number = 400;

	constructor(message?: string, errors?: AppErrors, statusCode?: number) {
		super(message, errors);
		if (statusCode) {
			this.statusCode = statusCode;
		}
	}
}

export class ValidationError extends ServerError {
	statusCode = 400;
	defaultMessage = 'Request parameters failed to validate.';
}

export class AuthenticationError extends ServerError {
	statusCode = 401;
	defaultMessage = 'Authentication failed.';
}

export class AuthorizationError extends ServerError {
	statusCode = 403;
	defaultMessage = 'Permission denied.';
}

export class NotFoundError extends ServerError {
	statusCode = 404;
	defaultMessage = 'This resource does not exist.';
}

/** Exception that should be logged. */
export class LoggedApplicationException extends ServerError {
	loggableDetails?: string;

	constructor(
		message?: string,
		statusCode?: number,
		errors?: AppErrors,
		loggableDetails?: string
	) {
		super(message, errors);

		if (loggableDetails) {
			this.loggableDetails = loggableDetails;
		}
	}
}

export class InternalFailureException extends LoggedApplicationException {
	statusCode = 500;
	defaultMessage = 'A glitch has occurred in the application logic.';
}

export class ServiceUnavailableError extends LoggedApplicationException {
	statusCode = 503;
	defaultMessage = 'This service is not yet functional.';
}
