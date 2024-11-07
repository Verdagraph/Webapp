/**
 * The goal of the exceptions are to provide
 * easy access to user friendly error messages to the frontend.
 * Field errors refer to errors associated with a form field
 * and are rendered under the field in the frontend.
 * Non-field errors refer to erorrs associated with a form
 * but not necessarily a field. These are rendered under the form.
 * Non-form errors refer to errors that are not associated with a form,
 * and are rendered as toasts or other popups on the frontend.
 */

/** Errors shown to the user under form fields. Each error is a key of the field name and a value of the error message(s). */
export type FieldErrors = Record<string, Array<string>>;
/** Errors shown to the user under a form not related to a specific field. */
type NonFieldErrors = Array<string>;
/** Errors shown to the user in a seperate context, e.g. a toast. */
type NonFormErrors = Array<string>;

/**
 * The type of errors passed to exceptions.
 */
export type AppErrors = {
	fieldErrors?: FieldErrors;
	nonFieldErrors?: NonFieldErrors;
	nonFormErrors?: NonFormErrors;
};

/**
 * The structure of data returned by the server on an error.
 */
export type ServerErrorResponse = {
	message: string;
	details?: AppErrors;
};

/**
 * Base class for all application exceptions raised by the frontend and server code.
 */
export class AppError extends Error {
	defaultMessage: string = 'A failure has occurred.';
	details: AppErrors = {};

	constructor(message?: string, errors?: AppErrors) {
		if (message) {
			super(message);
		} else {
			super('');
			this.message = this.defaultMessage;
		}

		if (errors) {
			if (errors.fieldErrors) {
				this.details['fieldErrors'] = errors.fieldErrors;
			}
			if (errors.nonFieldErrors) {
				this.details['nonFieldErrors'] = errors.nonFieldErrors;
			}
			if (errors.nonFormErrors) {
				this.details['nonFormErrors'] = errors.nonFormErrors;
			}
		}
	}
}
