import "clsx";
import { isAxiosError } from "axios";
import { o as handleErrors, A as AppError } from "./auth.svelte.js";
function createCommandHandler(asyncFn, options) {
  let isLoading = false;
  let isError = false;
  let isSuccess = false;
  let result = null;
  let errors = null;
  function execute(...params) {
    reset();
    isLoading = true;
    asyncFn(...params).then((executionResult) => {
      isSuccess = true;
      result = executionResult;
      if (options?.onSuccess) {
        options.onSuccess(result);
      }
    }).catch((error) => {
      isError = true;
      errors = convertErrors(error);
      handleErrors(errors);
      if (options?.onError) {
        options.onError(errors);
      }
    }).finally(() => {
      isLoading = false;
    });
  }
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
const convertErrors = (error) => {
  if (isAxiosError(error)) {
    const data = error?.response?.data;
    if (data && "details" in data && data.details) {
      return data.details;
    }
  }
  if (error instanceof AppError) {
    return error.details;
  }
  return { nonFormErrors: [error.message] };
};
export {
  createCommandHandler as c
};
