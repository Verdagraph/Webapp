export default StaticPlantingAreaContainer;
type StaticPlantingAreaContainer = SvelteComponent<
	{
		[x: string]: never;
	},
	{
		[evt: string]: CustomEvent<any>;
	},
	{}
> & {
	$$bindings?: string | undefined;
};
declare const StaticPlantingAreaContainer: $$__sveltets_2_IsomorphicComponent<
	{
		[x: string]: never;
	},
	{
		[evt: string]: CustomEvent<any>;
	},
	{},
	{},
	string
>;
interface $$__sveltets_2_IsomorphicComponent<
	Props extends Record<string, any> = any,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any,
	Exports = {},
	Bindings = string
> {
	new (
		options: import('svelte').ComponentConstructorOptions<Props>
	): import('svelte').SvelteComponent<Props, Events, Slots> & {
		$$bindings?: Bindings;
	} & Exports;
	(
		internal: unknown,
		props: {
			$$events?: Events;
			$$slots?: Slots;
		}
	): Exports & {
		$set?: any;
		$on?: any;
	};
	z_$$bindings?: Bindings;
}
//# sourceMappingURL=StaticPlantingAreaContainer.svelte.d.ts.map
