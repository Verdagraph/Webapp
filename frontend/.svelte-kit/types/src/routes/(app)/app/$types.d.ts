import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param: string) => param is infer U
	? U extends string
		? U
		: string
	: string;
type RouteParams = {};
type RouteId = '/(app)/app';
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
	EnsureDefined<import('../../$types.js').LayoutData>,
	keyof LayoutData
> &
	EnsureDefined<LayoutData>;
type LayoutRouteId =
	| RouteId
	| '/(app)/app'
	| '/(app)/app/(other)/account'
	| '/(app)/app/(other)/notifications'
	| '/(app)/app/(other)/settings'
	| '/(app)/app/gardens'
	| '/(app)/app/gardens/[gardenKey]'
	| '/(app)/app/gardens/[gardenKey]/(config)/cultivars'
	| '/(app)/app/gardens/[gardenKey]/(config)/environments'
	| '/(app)/app/gardens/[gardenKey]/(config)/workspaces'
	| '/(app)/app/gardens/[gardenKey]/(config)/workspaces/[workspaceSlug]'
	| '/(app)/app/gardens/[gardenKey]/(config)/workspaces/create'
	| '/(app)/app/gardens/[gardenKey]/(garden)/dash'
	| '/(app)/app/gardens/[gardenKey]/(garden)/members'
	| '/(app)/app/gardens/[gardenKey]/(garden)/metrics'
	| '/(app)/app/gardens/[gardenKey]/(planner)/verdagraph'
	| '/(app)/app/gardens/[gardenKey]/(planner)/workbook'
	| '/(app)/app/gardens/create'
	| '/(app)/app/gardens/discover'
	| '/(app)/app/traits'
	| '/(app)/app/traits/cultivars'
	| '/(app)/app/traits/environments'
	| '/(app)/app/traits/workspaces';
type LayoutParams = RouteParams & { gardenKey?: string; workspaceSlug?: string };
type LayoutParentData = EnsureDefined<import('../../$types.js').LayoutData>;

export type PageServerData = null;
export type PageData = Expand<PageParentData>;
export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;
