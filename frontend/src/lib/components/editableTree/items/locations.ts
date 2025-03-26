import { getLocalTimeZone, fromDate, type DateValue } from '@internationalized/date';
import {
	workspaceFields,
	type LocationUpdateCommand,
	type FieldErrors,
	type Position,
	type Location,
	type LocationHistory
} from '@vdt-webapp/common';
import {
	TreeDate,
	TreeCoordinate,
	TreeDeleteButton,
	TreeDynamicSelect,
	toTreeId,
	fieldValid,
	type Item,
	TreeAddButton,
	type DynamicSelectValue
} from '$components/editableTree';
import { type LocationUpdateHandler, type LocationHistoryExtendHandler } from '$data/workspaces/commands';

/**
 * Constructs an editable tree item for a geometry.
 * @param parentId The base ID of the parent tree item.
 * @param location The location to use.
 * @param includeDelete Whether to include the option to delete the location.
 * @param onChange The change handler for the tree's locations.
 * @param fieldErrors The field errors of the tree, updated upon failed validation.
 * @param index The index of the location in the location history, if applicable.
 * @param workspaces The workspace options for the location.
 * @returns The tree items that represent the location.
 */
export function locationTreeItem(
	parentId: string,
	location: Location | null,
	includeDelete: boolean = false,
	updateHandler: LocationUpdateHandler,
	fieldErrors: FieldErrors,
	index: number = 0,
	workspaces: { id: string; name: string }[]
): Item {
	const locationBaseId = parentId + `${index}/`;

	if (!location) {
		return {
			id: locationBaseId,
			label: 'Failed to resolve location.'
		};
	}

	const dateId = locationBaseId + 'date';
	const coordinateId = locationBaseId + 'coordinate';
	const workspaceId = locationBaseId + 'workspace';
	const deleteId = locationBaseId + 'delete';

	const dateItem: Item = {
		id: dateId,
		label: 'Date',
		description: workspaceFields.locationDateSchema.description,
		valueComponent: TreeDate,
		value: fromDate(location.date, getLocalTimeZone()),
		onChange: (changeOver: boolean, newData: DateValue) => {
			if (
				!fieldValid(dateId, newData, workspaceFields.locationDateSchema, fieldErrors)
			) {
				return;
			}
			updateHandler.execute(location.id, { date: newData.toDate(getLocalTimeZone()) })
		}
	};
	const coordinateItem: Item = {
		id: coordinateId,
		label: 'Position',
		description: workspaceFields.coordinateSchema.description,
		valueComponent: TreeCoordinate,
		value: { x: location.x, y: location.y },
		onChange: (changeOver: boolean, newData: Position) => {
			if (
				!fieldValid(
					coordinateId,
					newData,
					workspaceFields.coordinateSchema,
					fieldErrors
				)
			) {
				return;
			}
			updateHandler.execute(location.id, { coordinate: newData })
		}
	};
	const workspaceItem: Item = {
		id: workspaceId,
		label: 'Workspace',
		description: 'The workspace the location is located in.',
		valueComponent: TreeDynamicSelect,
		value: {
			id: location.workspaceId,
			options: workspaces.map((workspace) => {
				return { id: workspace.id, label: workspace.name };
			})
		},
		onChange: (changeOver: boolean, newData: DynamicSelectValue) => {
			updateHandler.execute(location.id, { workspaceId: newData.id })
		}
	};
	const deleteItem: Item = {
		id: deleteId,
		label: 'Delete',
		description: 'Deletes the geometry from the history.',
		valueComponent: TreeDeleteButton,
		value: undefined,
		onChange: (changeOver: boolean, newData: undefined) => {
			updateHandler.execute(location.id, { delete: true })
		}
	};

	let children: Item[] = [dateItem, coordinateItem, workspaceItem];
	if (includeDelete) {
		children.push(deleteItem);
	}

	return {
		id: locationBaseId,
		label: `Location ${index + 1}`,
		children: children
	};
}

/**
 * Constructs a tree item for a location history.
 * @param baseId The base ID of the parent tree item.
 * @param locationHistory Location history to use.
 * @param onLocationUpdate The handler for updating each location.
 * @param onLocationHistoryExtend The handler for extending the location history.
 * @param fieldErrors The field errors of the editable tree.
 * @param workspaces The workspace options for the location.
 * @returns The tree item.
 */
export function locationHistoryTreeItem(
	baseId: string,
	locationHistory: LocationHistory | null | undefined,
	locationUpdateHandler: LocationUpdateHandler,
	onLocationHistoryExtend: (id: string) => void,
	fieldErrors: FieldErrors,
	workspaces: { id: string; name: string }[]
): Item {
	const locationHistoryBaseId = toTreeId(baseId, 'locations');

	if (!locationHistory) {
		return {
			id: locationHistoryBaseId,
			label: 'Failed to resolve locations.'
		};
	}

	const addLocationId = toTreeId(baseId, 'locationAdd');

	const locationItems = locationHistory.locations.map((location, index) => {
		return locationTreeItem(
			locationHistoryBaseId,
			location,
			true,
			locationUpdateHandler,
			fieldErrors,
			index,
			workspaces
		);
	});

	const addLocationItem: Item = {
		id: addLocationId,
		label: 'Add',
		description: 'Adds a new location to the history.',
		valueComponent: TreeAddButton,
		value: undefined,
		/**
		 * The callback here is just used to register the add
		 * button has been pressed, so no need for data.
		 */
		onChange: (changeOver: boolean, newData: undefined) => {
			onLocationHistoryExtend(locationHistory.id)
		}
	};

	return {
		id: locationHistoryBaseId,
		label: 'Locations',
		children: [...locationItems, addLocationItem]
	};
}
