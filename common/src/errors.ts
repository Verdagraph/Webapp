/**
 * The goal of the server exceptions are to provide
 * easy access to user friendly error messages to the frontend.
 * Field errors refer to errors associated with a form field
 * and are rendered under the field in the frontend.
 * Non-field errors refer to erorrs associated with a form
 * but not necessarily a field. These are rendered under the form.
 * Non-form errors refer to errors that are not associated with a form,
 * and are rendered as toasts or other popups on the frontend.
 */
export type ServerErrors = {
	/** Errors shown to the user under form fields. Each error is a key of the field name and a value of the error message(s). */
	fieldErrors?: Record<string, Array<string>>;
	/** Errors shown to the user under a form not related to a specific field. */
	nonFieldErrors?: Array<string>;
	/** Errors shown to the user in a seperate context, e.g. a toast. */
	nonFormErrrors?: Array<string>;
};
