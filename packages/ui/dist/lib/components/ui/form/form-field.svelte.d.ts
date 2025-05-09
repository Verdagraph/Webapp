import type { FormPath as _FormPath } from 'sveltekit-superforms';
import * as FormPrimitive from 'formsnap';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';
declare class __sveltets_Render<T extends Record<string, unknown>, U extends _FormPath<T>> {
    props(): FormPrimitive.FieldProps<T, U, any> & Omit<WithElementRef<HTMLAttributes<HTMLDivElement>>, "children">;
    events(): {};
    slots(): {};
    bindings(): "ref";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends Record<string, unknown>, U extends _FormPath<T>>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T, U>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T, U>['props']>, ReturnType<__sveltets_Render<T, U>['events']>, ReturnType<__sveltets_Render<T, U>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T, U>['bindings']>;
    } & ReturnType<__sveltets_Render<T, U>['exports']>;
    <T extends Record<string, unknown>, U extends _FormPath<T>>(internal: unknown, props: ReturnType<__sveltets_Render<T, U>['props']> & {}): ReturnType<__sveltets_Render<T, U>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any, any>['bindings']>;
}
declare const FormField: $$IsomorphicComponent;
type FormField<T extends Record<string, unknown>, U extends _FormPath<T>> = InstanceType<typeof FormField<T, U>>;
export default FormField;
//# sourceMappingURL=form-field.svelte.d.ts.map