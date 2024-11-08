import type {
	ServerErrorResponse,
	AppErrors,
	AppError
} from '@vdt-webapp/common/src/errors';
import type { AxiosError } from 'axios';

/**
 * Stores the errors returned by the server and raised in
 * an AppError in application logic.
 * @returns Rune factory
 */
export function createFormErrors() {
	let formErrors = $state<AppErrors>({});

	/**
	 * Sets the errors returned by the server onto the rune.
	 * @param error The axios error returned by the server.
	 */
	function setServerErrors(error: AxiosError<ServerErrorResponse>) {
		const data = error?.response?.data;
		if (data && 'details' in data && data.details) {
			formErrors = data.details;
		}
	}

	/**
	 * Sets the errors raised by a client-side function onto the rune.
	 * @param error The AppError raised by the client.
	 */
	function setClientErrors(error: AppError) {
		formErrors = error.details;
	}

	/**
	 * Reset the form errors.
	 */
	function reset() {
		formErrors = {};
	}

	return {
		get fieldErrors() {
			return formErrors.fieldErrors;
		},
		get nonFieldErrors() {
			return formErrors.nonFieldErrors;
		},
		get nonFormErrors() {
			return formErrors.nonFormErrors;
		},
		setServerErrors,
		setClientErrors,
		reset
	};
}
