import type { AppErrors } from '@vdt-webapp/common/src/errors';
import { AppError, ServerErrorResponse } from '@vdt-webapp/common/src/errors';
import { isAxiosError } from 'axios';
import type { AxiosError } from 'axios';
import { toast } from 'svelte-sonner';

/**
 * Options which may be set on the handler.
 */
export type HandlerOptions<ResultType = Record<string, unknown>> = {
	/** Called after a successful call to the async function. */
	onSuccess?: (result: ResultType) => void;
	/** Called after an error is raised by the async function. */
	onError?: (errors: AppErrors) => void;
};

/**
 * Provides a rune and handler function which allows
 * executing an async function, tracking loading/success/error
 * states, storing the results and error of the function,
 * and executing side effects.
 * @param asyncFn An async function to call.
 * @param options Handler options.
 * @returns An async handler rune.
 */
export function createMutationHandler<TParams extends any[], TResult = unknown>(
	asyncFn: (...args: TParams) => Promise<TResult>,
	options?: HandlerOptions<TResult>
) {
	/** If true, the async function is being executed. */
	let isLoading: boolean = $state(false);
	/** If true, the async function has concluded with an error. */
	let isError: boolean = $state(false);
	/** If true, the async function has concluded with an success. */
	let isSuccess: boolean = $state(false);
	/** If not null, the result returned by the async function. */
	let result: TResult | null = $state(null);
	/** If not null, the errors raised by the async function. */
	let errors: AppErrors | null = $state(null);

	/**
	 * Calls the provided async function, updates state,
	 * stores results or errors, and executes side effects.
	 * @param params Parameters to pass into the async function.
	 */
	function execute(...params: TParams) {
		reset();
		isLoading = true;

		asyncFn(...params)
			.then((result: TResult) => {
				isSuccess = true;
				result = result;
				if (options?.onSuccess) {
					options.onSuccess(result);
				}
			})
			.catch((error: AppError | AxiosError<ServerErrorResponse> | Error) => {
				isError = true;
				errors = convertErrors(error);
				handleErrors(errors);
				if (options?.onError) {
					options.onError(errors);
				}
			})
			.finally(() => {
				isLoading = false;
			});
	}

	/**
	 * Resets the handler's state.
	 */
	function reset() {
		(isLoading = false),
			(isError = false),
			(isSuccess = false),
			(result = null),
			(errors = null);
	}

	return {
		get isLoading() {
			return isLoading;
		},
		get isSuccess() {
			return isSuccess;
		},
		get isError() {
			return isError;
		},
		get result() {
			return result;
		},
		get errors() {
			return errors;
		},
		get fieldErrors() {
			return errors?.fieldErrors;
		},
		get nonFieldErrors() {
			return errors?.nonFieldErrors;
		},
		get nonFormErrors() {
			return errors?.nonFormErrors;
		},
		execute,
		reset
	};
}
export default createMutationHandler;
export type MutationHandler = ReturnType<typeof createMutationHandler>;

/**
 * Converts any type of error which may be raised by the async function
 * into the normalized AppErrors format.
 * @param error Error raised by the async function. May be
 * from axios, a native application error, or any other error.
 * @returns The errors normalized into the AppErrors format.
 */
const convertErrors = (
	error: AppError | AxiosError<ServerErrorResponse> | Error
): AppErrors => {
	/** Extract server response/ */
	if (isAxiosError(error)) {
		const data = error?.response?.data;
		if (data && 'details' in data && data.details) {
			return data.details;
		}
	}

	/** Extract error details. */
	if (error instanceof AppError) {
		return error.details;
	}

	/** Fallback to displaying other errors as nonFormError. */
	return { nonFormErrors: [error.message] };
};

/**
 * Provides common error handling before the custom HandlerOptions
 * onError side effect.
 * 1. Pushes all NonFormErrors to toasts.
 * @param errors AppErrors raiesd by the handler function.
 */
const handleErrors = (errors: AppErrors) => {
	if (errors.nonFormErrors) {
		for (const errorMessage of errors.nonFormErrors) {
			/** Toast */
			toast.error(errorMessage);
		}
	}
};
