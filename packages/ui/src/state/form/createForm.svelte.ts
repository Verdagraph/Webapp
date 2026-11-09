import { z } from 'zod';

import type createCommandHandler from '../commandHandler.svelte';
import {
	type DeepPartial,
	deriveInitialValues,
	zodIssuesToFieldErrors
} from './zodIntrospection';

/** The least a form needs of a handler: something to run the command with. */
export type FormHandler = { execute: (...params: never[]) => unknown };

/** Any command handler, whatever the command it runs. */
export type AnyCommandHandler = ReturnType<
	typeof createCommandHandler<never[], unknown>
>;

export type FormOptions<T, Handler extends FormHandler | undefined = undefined> = {
	/** The handler of the command this form submits, exposed as `form.handler` so the
	 * two travel together. Without `onSubmit`, a valid submit runs `handler.execute(data)`. */
	handler?: Handler;
	/** Merged over the schema-derived defaults on creation and on a bare `reset()`.
	 * Only needed where the schema has no `.default()` for a value the caller
	 * already has (e.g. seeding userId/token from route params).
	 * `NoInfer` keeps T resolved solely from Schema (via its `z.infer` default) -
	 * without it, TS would also try to infer T from whatever partial shape is
	 * passed here, narrowing T down to just the keys provided. */
	initialValues?: NoInfer<DeepPartial<T>>;
	/** Called once client-side validation passes. Receives the handler, and replaces its default
	 * call for commands which take more than the form data (such as the id of what is updated). */
	onSubmit?: (data: NoInfer<T>, handler: NoInfer<Handler>) => unknown;
};

type ValidateResult<T> = { valid: true; data: T } | { valid: false };

/**
 * A small rune-based form utility, sibling to createCommandHandler: holds a
 * reactive data object seeded from a zod schema, validates it against that
 * same schema on submit, and reports errors in the app's own FieldErrors shape.
 *
 * Deliberately does not revalidate on every change (nothing in this app's
 * forms does today) and does not write back to `data` after a successful
 * submit (the caller's own onSubmit/success callback is the only thing that
 * ever reseeds data - there is no library-owned resync to race against).
 */
export function createForm<
	Schema extends z.ZodTypeAny,
	T = z.infer<Schema>,
	Handler extends FormHandler | undefined = undefined
>(schema: Schema, options?: FormOptions<T, Handler>) {
	let data = $state<T>(
		deriveInitialValues(schema, options?.initialValues as DeepPartial<z.infer<Schema>>)
	);
	let errors = $state<Record<string, string[]>>({});
	let isSubmitting = $state(false);

	function validate(): ValidateResult<T> {
		const result = schema.safeParse(data);
		if (result.success) {
			errors = {};
			return { valid: true, data: result.data as T };
		}
		errors = zodIssuesToFieldErrors(result.error.issues);
		return { valid: false };
	}

	async function submit(event?: SubmitEvent) {
		event?.preventDefault();
		const result = validate();
		if (!result.valid) return;
		isSubmitting = true;
		try {
			if (options?.onSubmit) {
				await options.onSubmit(result.data, options.handler as Handler);
			} else if (options?.handler) {
				await (options.handler.execute as (data: T) => unknown)(result.data);
			}
		} finally {
			isSubmitting = false;
		}
	}

	function reset(seed?: DeepPartial<T>) {
		data = deriveInitialValues(
			schema,
			(seed ?? options?.initialValues) as DeepPartial<z.infer<Schema>>
		);
		errors = {};
	}

	return {
		get data() {
			return data;
		},
		get errors() {
			return errors;
		},
		get isSubmitting() {
			return isSubmitting;
		},
		/** The schema this form validates against - read by Form.Field/Control to derive `aria-required`. */
		get schema(): z.ZodTypeAny {
			return schema;
		},
		/** The command handler given at creation, if any. */
		get handler(): Handler {
			return options?.handler as Handler;
		},
		validate,
		submit,
		reset
	};
}

export type FormState<
	Schema extends z.ZodTypeAny = z.ZodTypeAny,
	T = z.infer<Schema>,
	Handler extends FormHandler | undefined = FormHandler | undefined
> = ReturnType<typeof createForm<Schema, T, Handler>>;

export default createForm;
