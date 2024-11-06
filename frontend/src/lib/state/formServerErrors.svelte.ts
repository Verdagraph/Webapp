import type { ServerErrorResponse } from '@vdt-webapp/common/src/errors';
import type { AxiosError } from 'axios';

/**
 * Stores the errors rerturned by the server.
 * @returns Rune factory
 */
export function createServerErrors() {
	let serverErrors = $state<Record<string, string[]>>({});

	/**
	 * Sets the errors returned by the server onto the rune.
	 * @param error The axios error returned by the server.
	 */
	function setErrors(error: AxiosError<ServerErrorResponse>) {
		const data = error?.response?.data;
		if (data && 'details' in data && data.details) {
			for (const [key, value] of Object.entries(data.details)) {
				serverErrors[key] = value
			}
		}
	}

	/**
	 * Reset the server errors.
	 */
	function reset() {
		serverErrors = {};
	}

	return {
		get errors() {
			return serverErrors;
		},
		setErrors,
		reset
	};
}
