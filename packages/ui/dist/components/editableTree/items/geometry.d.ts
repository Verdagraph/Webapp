import { type FieldErrors, type Geometry, type GeometryHistory, type GeometryUpdateCommand } from '@vdg-webapp/models';
import { type Item } from '..';
export type GeometryUpdateHandler = (id: string, data: GeometryUpdateCommand) => void;
/**
 * Constructs an editable tree item for a geometry.
 * @param parentId The base ID of the parent tree item.
 * @param value Data required to construct the items.
 * @param options Options for how to construct the tree items.
 * @param ctx Tree context.
 * @returns The tree items that represent the geometry.
 */
export declare function geometryTreeItem(parentId: string, value: {
    geometry: Geometry | null | undefined;
    index: number;
}, options: {
    includeIndex: boolean;
    includeDelete: boolean;
    includeDate: boolean;
    includeLinesClosed: boolean;
}, ctx: {
    updateHandler: GeometryUpdateHandler;
    fieldErrors: FieldErrors;
}): Item;
/**
 * Constructs a tree item for a geometry history.
 * @param baseId The base ID of the parent tree item.
 * @param value Data required to construct the items.
 * @param options Options for how to construct the tree items.
 * @param ctx Tree context.
 * @returns The tree item.
 */
export declare function geometryHistoryTreeItem(baseId: string, value: {
    geometryHistory: GeometryHistory | null;
}, options: {
    includeLinesClosed: boolean;
}, ctx: {
    geometryUpdateHandler: GeometryUpdateHandler;
    onGeometryHistoryExtend: () => void;
    fieldErrors: FieldErrors;
}): Item;
//# sourceMappingURL=geometry.d.ts.map