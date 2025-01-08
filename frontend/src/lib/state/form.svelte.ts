import type { AppErrors, FieldErrors } from '@vdt-webapp/common/src/errors';
import { z } from 'zod';
import useAsync, { type HandlerOptions } from './asyncHandler.svelte';

/**
 * @note
 * This file was created to replace superforms, as I got frustrated
 * with it not being updated to use runes.
 * I abandoned this when it became clear how hard that would be.
 * The file remains here in case it is useful in the future.
 */

/**
 * Options which may be set on the form handler.
 */
type FormOptions<TSchema extends z.ZodObject<any>, TResult> = {
	/** The initial data to have in the form. */
	initialData?: Partial<z.infer<TSchema>>;
	onInput?: boolean;
	/** The options to pass down to the handler. */
	handler?: HandlerOptions<TResult>;
};

/**
 * Provides a rune and handler function which allows
 * storing form data before handing execution to a handler function.
 * @param schema A zod schema which describes the form data and the parameters of the async function.
 * @param id A string to identify the form.
 * @param asyncFn An async function to create a handler for.
 * @param options Form options.
 * @returns A form handler rune.
 */
export function createForm<TSchema extends z.ZodObject<any>, TResult = void>(
	id: string,
	schema: TSchema,
	asyncFn: (params: z.infer<TSchema>) => Promise<TResult>,
	options?: FormOptions<TSchema, TResult>
) {
	/** Stores the data before submisstion. */
	let data: Partial<z.infer<TSchema>> = $state(options?.initialData || {});
	/** Stores the result of zod validation. */
	let validationErrors: FieldErrors | null = $state(null);
	/** Used to execute the async function. */
	let handler = useAsync(asyncFn, options?.handler);
	/** All validation errors and those returned by the handler. */
	let errors = $derived.by(() => {
		if (validationErrors == null) {
			return handler.errors;
		} else if (handler.errors == null) {
			return { fieldErrors: validationErrors };
		} else {
			return mergeErrors({ fieldErrors: validationErrors }, handler.errors);
		}
	});

	/** Update the validation errors on updating data. */
	$effect(() => {
		if (options?.onInput) {
			return;
		}

		if (!handler.isLoading) {
			handler.reset();
		}

		validatePartialData();
	});

	function validatePartialData() {
		/** Validate all existing fields in the data. */
		const parseResult = schema.partial().safeParse(data);
		if (parseResult.success) {
			validationErrors = null;
			return;
		}

		validationErrors = unpackZodValidationError(parseResult.error);
	}

	/**
	 * Submits the form and calls the handler function.
	 */
	function submit() {
		const parseResult = schema.safeParse(data);
		if (parseResult.success) {
			validationErrors = null;
			handler.execute(data);
			return;
		}

		validationErrors = unpackZodValidationError(parseResult.error);
	}

	/**
	 * Resets the form and handler state.
	 * @param preserveInitialData If true the form is reset to the initial data instead of an empty object.
	 */
	function reset(preserveInitialData: boolean = true) {
		data = preserveInitialData ? options?.initialData || {} : {};
		handler.reset();
	}

	return {
		get id() {
			return id;
		},
		get data() {
			return data;
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
		set data(newVal) {
			data = newVal;
		},
		validatePartialData,
		submit,
		reset,
		handler
	};
}
export type FormHandler<TSchema extends z.ZodObject<any>> = ReturnType<
	typeof createForm<TSchema>
>;

/**
 * Merges two app error objects.
 * @param errors1 First app error object. Must not be null.
 * @param errors2 Second app error object. Must not be null.
 * @returns The merged app error object.
 */
function mergeErrors(errors1: AppErrors, errors2: AppErrors): AppErrors {
	const mergedErrors: AppErrors = {};

	/** Merge field errors. */
	if (errors1.fieldErrors || errors2.fieldErrors) {
		mergedErrors.fieldErrors = {};

		if (errors1.fieldErrors) {
			mergedErrors.fieldErrors = errors1.fieldErrors;
		}

		if (errors2.fieldErrors) {
			Object.entries(errors2.fieldErrors).forEach(([field, messages]) => {
				if (mergedErrors.fieldErrors![field]) {
					mergedErrors.fieldErrors![field].push(...messages);
				} else {
					mergedErrors.fieldErrors![field] = messages;
				}
			});
		}
	}

	/** Merge non-field errors. */
	if (errors1.nonFieldErrors || errors2.nonFieldErrors) {
		mergedErrors.nonFieldErrors = [
			...(errors1.nonFieldErrors || []),
			...(errors2.nonFieldErrors || [])
		];
	}

	/** Merge non-form errors. */
	if (errors1.nonFormErrors || errors2.nonFormErrors) {
		mergedErrors.nonFormErrors = [
			...(errors1.nonFormErrors || []),
			...(errors2.nonFormErrors || [])
		];
	}

	return mergedErrors;
}

/** For each error, put the error message in the array of field errors in the response. */

/**
 * Unpacks a zod validation error into a FieldErrors object.
 * @param error The zod validation error.
 * @returns A field errors object.
 */
function unpackZodValidationError(error: z.ZodError): FieldErrors {
	const validationErrors: FieldErrors = {};
	for (const validationError of error.issues) {
		const fieldName = validationError.path.join('.');
		if (validationErrors[fieldName]) {
			validationErrors[fieldName].push(validationError.message);
		} else {
			validationErrors[fieldName] = [validationError.message];
		}
	}
	return validationErrors;
}
