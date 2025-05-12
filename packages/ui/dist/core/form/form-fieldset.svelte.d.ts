import type { FormPath as _FormPath } from 'sveltekit-superforms';
import * as FormPrimitive from 'formsnap';
declare class __sveltets_Render<T extends Record<string, unknown>, U extends _FormPath<T>> {
    props(): Omit<FormPrimitive.FieldsetProps<T, U, any>, "child">;
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
declare const FormFieldset: $$IsomorphicComponent;
type FormFieldset<T extends Record<string, unknown>, U extends _FormPath<T>> = InstanceType<typeof FormFieldset<T, U>>;
export default FormFieldset;
//# sourceMappingURL=form-fieldset.svelte.d.ts.map