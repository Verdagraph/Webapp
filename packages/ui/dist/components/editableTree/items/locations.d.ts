import { type FieldErrors, type Location, type LocationHistory, type LocationUpdateCommand } from '@vdg-webapp/models';
import { type Item } from '..';
type LocationUpdateHandler = (id: string, data: LocationUpdateCommand) => void;
/**
 * Constructs an editable tree item for a geometry.
 * @param parentId The base ID of the parent tree item.
 * @param value Data required to construct the items.
 * @param options Options for how to construct the tree items.
 * @param ctx Tree context.
 * @returns The tree items that represent the location.
 */
export declare function locationTreeItem(parentId: string, value: {
    /** Location to represent. */
    location: Location;
    /**
     * The workspaces the location may be located in.
     * Required for changing the workspace of a location.
     */
    workspaces: {
        id: string;
        name: string;
    }[];
    /** Index of the location within the results. */
    index: number;
}, options: {
    includeDelete: boolean;
}, ctx: {
    updateHandler: LocationUpdateHandler;
    fieldErrors: FieldErrors;
}): Item;
/**
 * Constructs a tree item for a location history.
 * @param baseId The base ID of the parent tree item.
 * @param value Data required to construct the items.
 * @param ctx Tree context.
 * @returns The tree item.
 */
export declare function locationHistoryTreeItem(baseId: string, value: {
    locationHistory: LocationHistory | null | undefined;
    workspaces: {
        id: string;
        name: string;
    }[];
}, ctx: {
    locationUpdateHandler: LocationUpdateHandler;
    onLocationHistoryExtend: (id: string) => void;
    fieldErrors: FieldErrors;
}): Item;
export {};
//# sourceMappingURL=locations.d.ts.map