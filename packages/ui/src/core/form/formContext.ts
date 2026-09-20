import { getContext, setContext } from 'svelte';
import type { z } from 'zod';

import { getValueAtPath, isFieldRequired } from '$state/form';

const FIELD_CTX = Symbol('vdg-form-field');
const CONTROL_CTX = Symbol('vdg-form-control');

/** The slice of a FormState that field wiring actually needs, independent of
 * its Schema/T generics (which don't otherwise unify cleanly across the
 * generic <T> this component tree is parameterized over). */
type FormLike = {
	readonly data: unknown;
	readonly errors: Record<string, string[]>;
	readonly schema: z.ZodTypeAny;
};

/**
 * Reactive per-field slice of a form's data/errors/schema, addressed by a
 * dot/bracket path (e.g. "plants[0].cultivarName"). Getters close over the
 * live `getForm`/`getName` callbacks passed in, so this stays reactive to
 * prop changes even though the returned object is only created once.
 */
export function setFieldContext(
	id: string,
	getForm: () => FormLike,
	getName: () => string
) {
	const field = {
		id,
		get name() {
			return getName();
		},
		get value() {
			return getValueAtPath(getName(), getForm().data);
		},
		get errors(): string[] {
			return getForm().errors[getName()] ?? [];
		},
		get required() {
			return isFieldRequired(getForm().schema, getName());
		}
	};
	return setContext(FIELD_CTX, field);
}
export type FieldContext = ReturnType<typeof setFieldContext>;
export function getFieldContext(): FieldContext {
	return getContext(FIELD_CTX);
}

/** DOM attributes for the field's control element, derived from Field context. */
export function setControlContext(id?: string) {
	const field = getFieldContext();
	const controlId = id ?? field.id;
	const control = {
		id: controlId,
		field,
		get props() {
			const errors = field.errors;
			return {
				id: controlId,
				name: field.name,
				'data-fs-control': '',
				'data-fs-error': errors.length ? '' : undefined,
				'aria-describedby': errors.length ? `${controlId}-errors` : undefined,
				'aria-invalid': errors.length ? ('true' as const) : undefined,
				'aria-required': field.required ? ('true' as const) : undefined
			};
		}
	};
	return setContext(CONTROL_CTX, control);
}
export type ControlContext = ReturnType<typeof setControlContext>;
export function getControlContext(): ControlContext {
	return getContext(CONTROL_CTX);
}
