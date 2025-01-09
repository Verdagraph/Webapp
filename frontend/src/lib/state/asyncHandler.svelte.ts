import type { AppErrors } from '@vdt-webapp/common/src/errors';
import { AppError, ServerErrorResponse } from '@vdt-webapp/common/src/errors';
import { isAxiosError } from 'axios';
import type { AxiosError } from 'axios';
import { toast } from 'svelte-sonner';

/**
 * Options which may be set on the async handler.
 */
export type HandlerOptions<ResultType = any> = {
	/** Called after a successful call to the async function. */
	onSuccess?: (result: ResultType) => void;
	/** Called after an error is raised by the async function. */
	onError?: (errors: AppErrors) => void;
};

/**
 * Stores the state of the async handler.
 */
type AsyncState<TResult> = {
	/** If true, the async function is being executed. */
	isLoading: boolean;
	/** If true, the async function has concluded with an error. */
	isError: boolean;
	/** If true, the async function has concluded with an success. */
	isSuccess: boolean;
	/** If not null, the result returned by the async function. */
	result: TResult | null;
	/** If not null, the errors raised by the async function. */
	errors: AppErrors | null;
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
export function useAsync<TParams = void, TResult = void>(
	asyncFn: (params: TParams) => Promise<TResult>,
	options?: HandlerOptions<TResult>
) {
	let _rune: AsyncState<TResult> = $state({
		isLoading: false,
		isError: false,
		isSuccess: false,
		result: null,
		errors: null
	});

	/**
	 * Calls the provided async function, updates state,
	 * stores results or errors, and executes side effects.
	 * @param params Parameters to pass into the async function.
	 */
	function execute(params: TParams) {
		reset();
		_rune.isLoading = true;

		asyncFn(params)
			.then((result: TResult) => {
				_rune.isSuccess = true;
				_rune.result = result;
				if (options?.onSuccess) {
					options.onSuccess(result);
				}
			})
			.catch((error: AppError | AxiosError<ServerErrorResponse> | Error) => {
				_rune.isError = true;
				_rune.errors = convertErrors(error);
				handleErrors(_rune.errors);
				if (options?.onError) {
					options.onError(_rune.errors);
				}
			})
			.finally(() => {
				_rune.isLoading = false;
			});
	}

	/**
	 * Resets the handler's state.
	 */
	function reset() {
		_rune = {
			isLoading: false,
			isError: false,
			isSuccess: false,
			result: null,
			errors: null
		};
	}

	return {
		get isLoading() {
			return _rune.isLoading;
		},
		get isSuccess() {
			return _rune.isSuccess;
		},
		get isError() {
			return _rune.isError;
		},
		get result() {
			return _rune.result;
		},
		get errors() {
			return _rune.errors;
		},
		get fieldErrors() {
			return _rune.errors?.fieldErrors;
		},
		get nonFieldErrors() {
			return _rune.errors?.nonFieldErrors;
		},
		get nonFormErrors() {
			return _rune.errors?.nonFormErrors;
		},
		execute,
		reset
	};
}
export default useAsync;
export type AsyncHandler = ReturnType<typeof useAsync>;

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
