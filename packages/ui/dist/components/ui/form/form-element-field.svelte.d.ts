import type { FormPathLeaves as _FormPathLeaves } from 'sveltekit-superforms';
import * as FormPrimitive from 'formsnap';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from 'bits-ui';
declare class __sveltets_Render<
	T extends Record<string, unknown>,
	U extends _FormPathLeaves<T>
> {
	props(): Omit<WithElementRef<HTMLAttributes<HTMLDivElement>>, 'children'> &
		FormPrimitive.ElementFieldProps<T, U, any>;
	events(): {};
	slots(): {};
	bindings(): 'ref';
	exports(): {};
}
interface $$IsomorphicComponent {
	new <T extends Record<string, unknown>, U extends _FormPathLeaves<T>>(
		options: import('svelte').ComponentConstructorOptions<
			ReturnType<__sveltets_Render<T, U>['props']>
		>
	): import('svelte').SvelteComponent<
		ReturnType<__sveltets_Render<T, U>['props']>,
		ReturnType<__sveltets_Render<T, U>['events']>,
		ReturnType<__sveltets_Render<T, U>['slots']>
	> & {
		$$bindings?: ReturnType<__sveltets_Render<T, U>['bindings']>;
	} & ReturnType<__sveltets_Render<T, U>['exports']>;
	<T extends Record<string, unknown>, U extends _FormPathLeaves<T>>(
		internal: unknown,
		props: ReturnType<__sveltets_Render<T, U>['props']> & {}
	): ReturnType<__sveltets_Render<T, U>['exports']>;
	z_$$bindings?: ReturnType<__sveltets_Render<any, any>['bindings']>;
}
declare const FormElementField: $$IsomorphicComponent;
type FormElementField<
	T extends Record<string, unknown>,
	U extends _FormPathLeaves<T>
> = InstanceType<typeof FormElementField<T, U>>;
export default FormElementField;
//# sourceMappingURL=form-element-field.svelte.d.ts.map
