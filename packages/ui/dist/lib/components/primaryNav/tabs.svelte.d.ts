import { Garden } from '@vdg-webapp/models';
/**
 * Specifies the primary navigation tabs between feature domains.
 */
export type PrimaryTabSpec = {
    id: string;
    label: string;
    iconId: string;
    submenuItems: PrimaryTabItemSpec[] | null;
};
/**
 * Specifies the entries to the submenu of primary navigation tabs.
 */
export type PrimaryTabItemSpec = {
    url: string;
    label: string;
    iconId?: string;
    className?: string;
};
/**
 * Constructs the tab which lists gardens the authenticated user has access to.
 * @param gardens list of garden schemas associated with the user.
 * @returns Tab specification for the gardens tab.
 */
export declare const getGardensAuthTab: (gardens?: Garden[]) => PrimaryTabSpec;
/**
 * Constructs the tab which lists gardens the anonymous user has access to.
 * @param gardens list of garden schemas associated with the user.
 * @returns Tab specification for the gardens tab.
 */
export declare const getGardensAnonTab: () => PrimaryTabSpec;
/**
 * Constructs the tabs of pages specific to one garden.
 * @param garden The active garden.
 * @returns Tab specifications for the garden tabs.
 */
export declare const getGardenSpecifcTabs: (garden: Garden) => PrimaryTabSpec[];
/**
 * @returns Tab specification for the traits tab.
 */
export declare const getTraitsTab: () => PrimaryTabSpec;
/**
 * @returns Tab specifications for the resource tab.
 */
export declare const getResourcesTab: () => PrimaryTabSpec;
/**
 * @returns Tab specification for the profile tab when a user is authenticated.
 */
export declare const getAuthProfileTab: () => PrimaryTabSpec;
/**
 * @returns Tab specification for the profile tab when a user is not authenticated.
 */
export declare const getAnonProfileTab: () => PrimaryTabSpec;
//# sourceMappingURL=tabs.svelte.d.ts.map