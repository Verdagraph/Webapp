import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param: string) => param is infer U
	? U extends string
		? U
		: string
	: string;
type RouteParams = { gardenId: string };
type RouteId = '/(app)/app/gardens/[gardenId]';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = {
	[K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T];
type OutputDataShape<T> = MaybeWithVoid<
	Omit<App.PageData, RequiredKeys<T>> &
		Partial<Pick<App.PageData, keyof T & keyof App.PageData>> &
		Record<string, any>
>;
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<
	U extends Record<string, any>,
	A extends keyof U = U extends U ? keyof U : never
> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = Omit<
	Omit<
		EnsureDefined<import('../../../../$types.js').LayoutData>,
		keyof import('../../$types.js').LayoutData
	> &
		EnsureDefined<import('../../$types.js').LayoutData>,
	keyof LayoutData
> &
	EnsureDefined<LayoutData>;
type LayoutRouteId =
	| RouteId
	| '/(app)/app/gardens/[gardenId]'
	| '/(app)/app/gardens/[gardenId]/(config)/cultivars'
	| '/(app)/app/gardens/[gardenId]/(config)/workspaces'
	| '/(app)/app/gardens/[gardenId]/(config)/workspaces/[workspaceSlug]'
	| '/(app)/app/gardens/[gardenId]/(config)/workspaces/create'
	| '/(app)/app/gardens/[gardenId]/(garden)/edit'
	| '/(app)/app/gardens/[gardenId]/(garden)/members'
	| '/(app)/app/gardens/[gardenId]/(garden)/metrics'
	| '/(app)/app/gardens/[gardenId]/(planner)/verdagraph'
	| '/(app)/app/gardens/[gardenId]/(planner)/workbook';
type LayoutParams = RouteParams & { gardenId?: string; workspaceSlug?: string };
type LayoutParentData = Omit<
	EnsureDefined<import('../../../../$types.js').LayoutData>,
	keyof import('../../$types.js').LayoutData
> &
	EnsureDefined<import('../../$types.js').LayoutData>;

export type EntryGenerator = () => Promise<Array<RouteParams>> | Array<RouteParams>;
export type PageServerData = null;
export type PageData = Expand<PageParentData>;
export type PageProps = { data: PageData };
export type LayoutServerData = null;
export type LayoutLoad<
	OutputData extends
		OutputDataShape<LayoutParentData> = OutputDataShape<LayoutParentData>
> = Kit.Load<
	LayoutParams,
	LayoutServerData,
	LayoutParentData,
	OutputData,
	LayoutRouteId
>;
export type LayoutLoadEvent = Parameters<LayoutLoad>[0];
export type LayoutData = Expand<
	Omit<
		LayoutParentData,
		keyof Kit.LoadProperties<
			Awaited<
				ReturnType<
					typeof import('../../../../../../../../src/routes/(app)/app/gardens/[gardenId]/+layout.js').load
				>
			>
		>
	> &
		OptionalUnion<
			EnsureDefined<
				Kit.LoadProperties<
					Awaited<
						ReturnType<
							typeof import('../../../../../../../../src/routes/(app)/app/gardens/[gardenId]/+layout.js').load
						>
					>
				>
			>
		>
>;
export type LayoutProps = { data: LayoutData; children: import('svelte').Snippet };
