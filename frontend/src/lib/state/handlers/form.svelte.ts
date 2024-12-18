import type { AppErrors, FieldErrors } from '@vdt-webapp/common/src/errors';
import { z } from 'zod';
import useAsync, {type HandlerOptions} from './asyncHandler.svelte';


type FormOptions<TParams, TResult> = {
    initialData?: Partial<TParams>,
    handlerOptions?: HandlerOptions<TResult>
}

/** For each error, put the error message in the array of field errors in the response. */
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
    return validationErrors
}

export function createForm<TParams extends z.ZodObject<any>, TResult = void>(schema: TParams, asyncFn: (params: z.infer<TParams>) => Promise<TResult>, options?: FormOptions<TParams, TResult> ) {
    let data: Partial<z.infer<TParams>> = $state(options?.initialData || {})
    let validationErrors: FieldErrors | null = $state(null)
    let handler = useAsync(asyncFn, options?.handlerOptions)
    let errors = $derived(mergeErrors(validationErrors, handler.errors))

    /** Update the validation errors on updating data. */
    $effect(() => {
        if (!handler.isLoading) {
            handler.reset()
        }

        /** Validate all existing fields in the data. */
        const parseResult = schema.partial().safeParse(data)
        if (parseResult.success) {
            validationErrors = null
            return
        }

        validationErrors = unpackZodValidationError(parseResult.error)
    })

    function submit() {
        const parseResult = schema.safeParse(data)
        if (parseResult.success) {
            validationErrors = null
            handler.execute(data)
            return
        }

        validationErrors = unpackZodValidationError(parseResult.error)
    }

    function reset(preserveInitialData: boolean = true) {
        data = preserveInitialData ? options?.initialData || {} : {}
        handler.reset()
    }

    return {
        get data() {
            return data
        },
        get errors() {
            return errors
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
            data = newVal
        },
        submit,
        reset,
        handler
    }
}

function mergeErrors(errors1: AppErrors | null, errors2: AppErrors | null): AppErrors | null {

}