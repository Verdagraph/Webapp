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
/**
 * Base class for all application exceptions raised by the frontend and server code.
 */
export class AppError extends Error {
    defaultMessage = 'A failure has occurred.';
    details = {};
    constructor(message, errors) {
        if (message) {
            super(message);
        }
        else {
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
//# sourceMappingURL=errors.js.map