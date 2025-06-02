import { workspaceFields } from '@vdg-webapp/models';
import { TreeDistance, TreeString, TreeTextarea, fieldValid, geometryTreeItem, locationHistoryTreeItem, toTreeBaseId, toTreeId } from '../..';
import {} from './geometry';
import {} from './locations';
export function plantingAreaTreeItem(value, ctx) {
    const baseId = toTreeBaseId('plantingArea', value.plantingArea.id);
    const nameId = toTreeId(baseId, 'name');
    const descriptionId = toTreeId(baseId, 'description');
    const depthId = toTreeId(baseId, 'depth');
    const geometryItem = geometryTreeItem(toTreeId(baseId, 'geometry'), { geometry: value.plantingArea.geometry, index: 0 }, {
        includeIndex: false,
        includeDate: false,
        includeDelete: false,
        includeLinesClosed: false
    }, {
        updateHandler: ctx.geometryUpdateHandler,
        fieldErrors: ctx.fieldErrors
    });
    const locationHistoryItem = locationHistoryTreeItem(baseId, {
        locationHistory: value.plantingArea.locationHistory,
        workspaces: value.workspaces
    }, {
        locationUpdateHandler: ctx.locationUpdateHandler,
        onLocationHistoryExtend: ctx.locationHistoryExtendHandler,
        fieldErrors: ctx.fieldErrors
    });
    const nameItem = {
        id: nameId,
        label: 'Name',
        description: workspaceFields.plantingAreaNameSchema.description,
        valueComponent: TreeString,
        value: value.plantingArea.name,
        onChange: (newData) => {
            if (!fieldValid(nameId, newData, workspaceFields.plantingAreaNameSchema, ctx.fieldErrors)) {
                return;
            }
            ctx.plantingAreaUpdateHandler(value.plantingArea.id, { name: newData });
        }
    };
    const descriptionItem = {
        id: descriptionId,
        label: 'Description',
        description: workspaceFields.plantingAreaDescriptionSchema.description,
        valueComponent: TreeTextarea,
        value: value.plantingArea.description,
        onChange: (newData) => {
            if (!fieldValid(descriptionId, newData, workspaceFields.plantingAreaDescriptionSchema, ctx.fieldErrors)) {
                return;
            }
            ctx.plantingAreaUpdateHandler(value.plantingArea.id, {
                description: newData
            });
        }
    };
    const depthItem = {
        id: depthId,
        label: 'Depth',
        description: workspaceFields.plantingAreaDepthSchema.description,
        valueComponent: TreeDistance,
        value: value.plantingArea.depth,
        onChange: (newData) => {
            if (!fieldValid(depthId, newData, workspaceFields.plantingAreaDepthSchema, ctx.fieldErrors)) {
                return;
            }
            ctx.plantingAreaUpdateHandler(value.plantingArea.id, { depth: newData });
        }
    };
    return {
        id: baseId,
        label: value.plantingArea.name,
        children: [
            nameItem,
            /** Details. */
            {
                id: toTreeId(baseId, 'details'),
                label: 'Details',
                children: [descriptionItem, depthItem]
            },
            geometryItem,
            locationHistoryItem
        ]
    };
}
