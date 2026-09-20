import { z } from 'zod';

import { type DeepPartial, deriveInitialValues, zodIssuesToFieldErrors } from './zodIntrospection';

export type FormOptions<T> = {
	/** Merged over the schema-derived defaults on creation and on a bare `reset()`.
	 * Only needed where the schema has no `.default()` for a value the caller
	 * already has (e.g. seeding userId/token from route params).
	 * `NoInfer` keeps T resolved solely from Schema (via its `z.infer` default) -
	 * without it, TS would also try to infer T from whatever partial shape is
	 * passed here, narrowing T down to just the keys provided. */
	initialValues?: NoInfer<DeepPartial<T>>;
	/** Called once client-side validation passes. */
	onSubmit?: (data: NoInfer<T>) => void | Promise<void>;
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
export function createForm<Schema extends z.ZodTypeAny, T = z.infer<Schema>>(
	schema: Schema,
	options?: FormOptions<T>
) {
	let data = $state<T>(deriveInitialValues(schema, options?.initialValues as DeepPartial<z.infer<Schema>>));
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
			await options?.onSubmit?.(result.data);
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
		validate,
		submit,
		reset
	};
}

export type FormState<Schema extends z.ZodTypeAny = z.ZodTypeAny, T = z.infer<Schema>> = ReturnType<
	typeof createForm<Schema, T>
>;

export default createForm;
