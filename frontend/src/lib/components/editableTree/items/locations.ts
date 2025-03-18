import {
	TreeDate,
	TreeDeletableCoordinate,
	toTreeId,
	fieldValid,
	type Item,
	TreeAddButton
} from '$components/editableTree';
import { type ChangeHandler } from '$state/changeHandler.svelte';
import {
	workspaceFields,
	type LocationUpdateCommand,
	type FieldErrors,
	type Position,
	type Location,
	type LocationHistory
} from '@vdt-webapp/common';
import { getLocalTimeZone, type DateValue } from '@internationalized/date';

/**
 * Constructs an editable tree item for a geometry.
 * @param baseId The base ID of the location history.
 * @param location The location to use.
 * @param changeHandler The change handler for the tree's locations.
 * The key of the record are IDs of locations, and the values are
 * the updated fields.
 * @param fieldErrors The field errors of the tree, updated upon failed validation.
 * @param index The index of the location in the location history, if applicable.
 * @returns The tree items that represent the location.
 */
export function locationTreeItem(
	locationHistoryBaseId: string,
	location: Location | null,
	changeHandler: ChangeHandler<Record<string, LocationUpdateCommand>>,
	fieldErrors: FieldErrors,
	index: number = 0
): Item {
	const locationBaseId = locationHistoryBaseId + `${index}/`;

	if (!location) {
		return {
			id: locationBaseId,
			label: 'Failed to resolve location.'
		};
	}

	const coordinateId = locationBaseId + 'coordinate';
	const dateId = locationBaseId + 'date';

	const coordinateItem: Item = {
		id: coordinateId,
		label: 'Posistion',
		description: workspaceFields.coordinateSchema.description,
		valueComponent: TreeDeletableCoordinate,
		value: { x: location.x, y: location.y },
		onChange: (changeOver: boolean, newData: Position | null) => {
			if (newData) {
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
				changeHandler.change(changeOver, {
					[location.id]: { coordinate: newData }
				});
			} else {
				changeHandler.change(changeOver, {
					[location.id]: { delete: true }
				});
			}
		}
	};

	const dateItem: Item = {
		id: dateId,
		label: 'Date',
		description: workspaceFields.locationDateSchema.description,
		valueComponent: TreeDate,
		value: location.date,
		onChange: (changeOver: boolean, newData: DateValue) => {
			if (
				!fieldValid(dateId, newData, workspaceFields.locationDateSchema, fieldErrors)
			) {
				return;
			}
			changeHandler.change(changeOver, {
				[location.id]: { date: newData.toDate(getLocalTimeZone()) }
			});
		}
	};

	return {
		id: locationBaseId,
		label: `Location ${index}`,
		children: [coordinateItem, dateItem]
	};
}

export function locationHistoryTreeItem(
	baseId: string,
	locationHistory: LocationHistory | null,
	changeHandler: ChangeHandler<Record<string, LocationUpdateCommand>>,
	fieldErrors: FieldErrors
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
			changeHandler,
			fieldErrors,
			index
		);
	});

	const addLocationItem: Item = {
		id: addLocationId,
		label: 'Add',
		valueComponent: TreeAddButton,
		value: undefined,
		/**
		 * The callback here is just used to register the add
		 * button has been pressed, so no need for data.
		 */
		onChange: (changeOver: boolean, newData: undefined) => {
			/** TODO: support adding location. */
		}
	};

	return {
		id: locationHistoryBaseId,
		label: 'Locations',
		children: [...locationItems, addLocationItem]
	};
}
