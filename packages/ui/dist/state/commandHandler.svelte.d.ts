import { type AppErrors } from '@vdg-webapp/models';
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
export declare function createCommandHandler<TParams extends unknown[], TResult = unknown>(asyncFn: (...args: TParams) => Promise<TResult>, options?: HandlerOptions<TResult>): {
    readonly isLoading: boolean;
    readonly isSuccess: boolean;
    readonly isError: boolean;
    readonly result: TResult | null;
    readonly errors: any;
    readonly fieldErrors: any;
    readonly nonFieldErrors: any;
    readonly nonFormErrors: any;
    execute: (...params: TParams) => void;
    reset: () => void;
};
export default createCommandHandler;
//# sourceMappingURL=commandHandler.svelte.d.ts.map