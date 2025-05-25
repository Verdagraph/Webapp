import { isAxiosError } from 'axios';
import { AppError } from '@vdg-webapp/models';
import { handleErrors } from '../utils/errors';
/**
 * Provides a rune and handler function which allows
 * executing an async function, tracking loading/success/error
 * states, storing the results and error of the function,
 * and executing side effects.
 * @param asyncFn An async function to call.
 * @param options Handler options.
 * @returns An async handler rune.
 */
export function createCommandHandler(asyncFn, options) {
    /** If true, the async function is being executed. */
    let isLoading = $state(false);
    /** If true, the async function has concluded with an error. */
    let isError = $state(false);
    /** If true, the async function has concluded with an success. */
    let isSuccess = $state(false);
    /** If not null, the result returned by the async function. */
    let result = $state(null);
    /** If not null, the errors raised by the async function. */
    let errors = $state(null);
    /**
     * Calls the provided async function, updates state,
     * stores results or errors, and executes side effects.
     * @param params Parameters to pass into the async function.
     */
    function execute(...params) {
        reset();
        isLoading = true;
        asyncFn(...params)
            .then((executionResult) => {
            isSuccess = true;
            result = executionResult;
            if (options?.onSuccess) {
                options.onSuccess(result);
            }
        })
            .catch((error) => {
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
        isLoading = false;
        isError = false;
        isSuccess = false;
        result = null;
        errors = null;
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
export default createCommandHandler;
/**
 * Converts any type of error which may be raised by the async function
 * into the normalized AppErrors format.
 * @param error Error raised by the async function. May be
 * from axios, a native application error, or any other error.
 * @returns The errors normalized into the AppErrors format.
 */
const convertErrors = (error) => {
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
