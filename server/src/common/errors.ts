import {ServerErrors} from '@vdt-webapp/common/src/errors'

/** 
 * Base class for all application exceptions raised by the server code.
 */
export class ServerError extends Error {
    statusCode: number = 400;
    defaultMessage: string = "A failure has occurred."
    extra: Record<string, Array<string>> = {}

    constructor(message?: string, statusCode?: number, errors?: ServerErrors) {
        
        if(message) {
            super(message)
        } else {
            super("")
            this.message = this.defaultMessage
        }

        if(statusCode) {
            this.statusCode = statusCode
        }
        
        if(errors) {
            if(errors.fieldErrors) {
                this.extra = errors.fieldErrors
            }
            if(errors.nonFieldErrors) {
                this.extra["nonFieldErrors"] = errors.nonFieldErrors
            }
            if(errors.nonFormErrrors) {
                this.extra["nonFormErrors"] = errors.nonFormErrrors
            }
        }
    }
}

export class ValidationError extends ServerError {
    statusCode = 400
    defaultMessage = "Request parameters failed to validate."
}

export class AuthenticationError extends ServerError {
    statusCode = 401
    defaultMessage = "Authentication failed."
}


export class AuthorizationError extends ServerError {
    statusCode = 403
    defaultMessage = "Permission denied."
}

export class NotFoundError extends ServerError {
    statusCode = 404
    defaultMessage = "This resource does not exist."
}

/** Exception that should be logged. */
export class LoggedApplicationException extends ServerError {
    loggableDetails?: string

    constructor(message?: string, statusCode?: number, errors?: ServerErrors, loggableDetails?: string) {
        super(message, statusCode, errors)

        if(loggableDetails) {
            this.loggableDetails = loggableDetails
        }
    }
}

export class DomainIntegrityException extends LoggedApplicationException {
    statusCode = 500
    defaultMessage = "A glitch has occurred in the application logic."
}

export class ServiceUnavailableError extends LoggedApplicationException {
    statusCode = 503
    defaultMessage = "This service is not yet functional."
}

