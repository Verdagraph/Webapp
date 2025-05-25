import { type FieldErrors, type PlantingArea, type PlantingAreaUpdateCommand } from '@vdg-webapp/models';
import { type Item } from '../..';
import { type GeometryUpdateHandler } from './geometry';
import { type LocationHistoryExtendHandler, type LocationUpdateHandler } from './locations';
export type PlantingAreaUpdateHandler = (id: string, data: PlantingAreaUpdateCommand) => void;
export declare function plantingAreaTreeItem(value: {
    plantingArea: PlantingArea;
    workspaces: {
        id: string;
        name: string;
    }[];
}, ctx: {
    plantingAreaUpdateHandler: PlantingAreaUpdateHandler;
    geometryUpdateHandler: GeometryUpdateHandler;
    locationUpdateHandler: LocationUpdateHandler;
    locationHistoryExtendHandler: LocationHistoryExtendHandler;
    fieldErrors: FieldErrors;
}): Item;
//# sourceMappingURL=plantingArea.d.ts.map