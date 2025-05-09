import { getLocalTimeZone, fromDate, type DateValue } from '@internationalized/date';
import {
	workspaceFields,
	type FieldErrors,
	type Position,
	type Location,
	type LocationHistory
} from '@vdg-webapp/models';
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
} from '..';
import { type LocationUpdateHandler } from '$data/workspaces/commands';

/**
 * Constructs an editable tree item for a geometry.
 * @param parentId The base ID of the parent tree item.
 * @param value Data required to construct the items.
 * @param options Options for how to construct the tree items.
 * @param ctx Tree context.
 * @returns The tree items that represent the location.
 */
export function locationTreeItem(
	parentId: string,
	value: {
		/** Location to represent. */
		location: Location;
		/**
		 * The workspaces the location may be located in.
		 * Required for changing the workspace of a location.
		 */
		workspaces: { id: string; name: string }[];
		/** Index of the location within the results. */
		index: number;
	},
	options: { includeDelete: boolean },
	ctx: { updateHandler: LocationUpdateHandler; fieldErrors: FieldErrors }
): Item {
	const locationBaseId = parentId + `${value.index}/`;

	if (!value.location) {
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
		value: fromDate(value.location.date, getLocalTimeZone()),
		onChange: (newData: DateValue) => {
			if (
				!fieldValid(
					dateId,
					newData,
					workspaceFields.locationDateSchema,
					ctx.fieldErrors
				)
			) {
				return;
			}
			ctx.updateHandler.execute(value.location.id, {
				date: newData.toDate(getLocalTimeZone())
			});
		}
	};
	const coordinateItem: Item = {
		id: coordinateId,
		label: 'Position',
		description: workspaceFields.coordinateSchema.description,
		valueComponent: TreeCoordinate,
		value: { x: value.location.x, y: value.location.y },
		onChange: (newData: Position) => {
			if (
				!fieldValid(
					coordinateId,
					newData,
					workspaceFields.coordinateSchema,
					ctx.fieldErrors
				)
			) {
				return;
			}
			ctx.updateHandler.execute(value.location.id, { coordinate: newData });
		}
	};
	const workspaceItem: Item = {
		id: workspaceId,
		label: 'Workspace',
		description: 'The workspace the location is located in.',
		valueComponent: TreeDynamicSelect,
		value: {
			id: value.location.workspaceId,
			options: value.workspaces.map((workspace) => {
				return { id: workspace.id, label: workspace.name };
			})
		},
		onChange: (newData: DynamicSelectValue) => {
			ctx.updateHandler.execute(value.location.id, { workspaceId: newData.id });
		}
	};
	const deleteItem: Item = {
		id: deleteId,
		label: 'Delete',
		description: 'Deletes the geometry from the history.',
		valueComponent: TreeDeleteButton,
		value: undefined,
		onChange: () => {
			ctx.updateHandler.execute(value.location.id, { delete: true });
		}
	};

	const children: Item[] = [dateItem, coordinateItem, workspaceItem];
	if (options.includeDelete) {
		children.push(deleteItem);
	}

	return {
		id: locationBaseId,
		label: `Location ${value.index + 1}`,
		children: children
	};
}

/**
 * Constructs a tree item for a location history.
 * @param baseId The base ID of the parent tree item.
 * @param value Data required to construct the items.
 * @param ctx Tree context.
 * @returns The tree item.
 */
export function locationHistoryTreeItem(
	baseId: string,
	value: {
		locationHistory: LocationHistory | null | undefined;
		workspaces: { id: string; name: string }[];
	},
	ctx: {
		locationUpdateHandler: LocationUpdateHandler;
		onLocationHistoryExtend: (id: string) => void;
		fieldErrors: FieldErrors;
	}
): Item {
	const locationHistoryBaseId = toTreeId(baseId, 'locations');

	if (!value.locationHistory) {
		return {
			id: locationHistoryBaseId,
			label: 'Failed to resolve locations.'
		};
	}

	const addLocationId = toTreeId(baseId, 'locationAdd');

	const locationItems = value.locationHistory.locations.map((location, index) => {
		const numLocations = value.locationHistory?.locations.length;
		const includeDelete = numLocations && numLocations > 1 ? true : false;

		return locationTreeItem(
			locationHistoryBaseId,
			{ location, workspaces: value.workspaces, index },
			{ includeDelete: includeDelete },
			{ updateHandler: ctx.locationUpdateHandler, fieldErrors: ctx.fieldErrors }
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
		onChange: () => {
			if (!value.locationHistory) {
				return;
			}

			ctx.onLocationHistoryExtend(value.locationHistory.id);
		}
	};

	return {
		id: locationHistoryBaseId,
		label: 'Locations',
		children: [...locationItems, addLocationItem]
	};
}
