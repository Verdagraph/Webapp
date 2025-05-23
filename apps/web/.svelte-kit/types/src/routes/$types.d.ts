import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = {  };
type RouteId = '/';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = EnsureDefined<LayoutData>;
type LayoutRouteId = RouteId | "/" | "/(other)/account" | "/(other)/notifications" | "/(other)/settings" | "/gardens" | "/gardens/[gardenId]" | "/gardens/[gardenId]/(config)/cultivars" | "/gardens/[gardenId]/(config)/workspaces" | "/gardens/[gardenId]/(config)/workspaces/[workspaceSlug]" | "/gardens/[gardenId]/(config)/workspaces/create" | "/gardens/[gardenId]/(garden)/edit" | "/gardens/[gardenId]/(garden)/members" | "/gardens/[gardenId]/(garden)/metrics" | "/gardens/[gardenId]/(planner)/verdagraph" | "/gardens/[gardenId]/(planner)/workbook" | "/gardens/create" | "/gardens/discover" | "/login" | "/login/request-password-reset" | "/login/reset-password/[userId]/[confirmationToken]" | "/register" | "/register/request-email-verification" | "/register/verify/[confirmationToken]" | "/traits" | "/traits/cultivars" | "/traits/environments" | "/traits/workspaces" | null
type LayoutParams = RouteParams & { gardenId?: string; workspaceSlug?: string; userId?: string; confirmationToken?: string }
type LayoutServerParentData = EnsureDefined<{}>;
type LayoutParentData = EnsureDefined<{}>;

export type PageServerData = null;
export type PageData = Expand<PageParentData>;
export type PageProps = { data: PageData }
export type LayoutServerLoad<OutputData extends OutputDataShape<LayoutServerParentData> = OutputDataShape<LayoutServerParentData>> = Kit.ServerLoad<LayoutParams, LayoutServerParentData, OutputData, LayoutRouteId>;
export type LayoutServerLoadEvent = Parameters<LayoutServerLoad>[0];
export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;
export type LayoutProps = { data: LayoutData; children: import("svelte").Snippet }
export type RequestEvent = Kit.RequestEvent<RouteParams, RouteId>;