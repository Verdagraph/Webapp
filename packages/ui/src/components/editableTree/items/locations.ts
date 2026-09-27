import { type DateValue, fromDate, getLocalTimeZone } from '@internationalized/date';

import {
	type FieldErrors,
	type LocationUpdateCommand,
	workspaceFields
} from '@vdg-webapp/models';

import { type ResolvedLocation } from '$state/application/workspacesContext.svelte';

import {
	type DynamicSelectValue,
	type Item,
	TreeAddButton,
	TreeCoordinate,
	TreeDate,
	TreeDeleteButton,
	TreeDynamicSelect,
	fieldValid,
	toTreeId
} from '..';

export type LocationUpdateHandler = (id: string, data: LocationUpdateCommand) => void;
export type LocationHistoryExtendHandler = (id: string) => void;

/**
 * Constructs an editable tree item for a location.
 * @param itemId The item ID of the returned tree item.
 * @param value Data required to construct the items.
 * @param options Options for how to construct the tree items.
 * @param ctx Tree context.
 * @returns The tree items that represent the location.
 */
export function locationTreeItem(
	itemId: string,
	value: {
		/** Location to represent. */
		location: ResolvedLocation;
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
	if (!value.location) {
		return {
			id: itemId,
			label: 'Failed to resolve location.'
		};
	}

	const dateId = toTreeId(itemId, 'date');
	const coordinateId = toTreeId(itemId, 'coordinate');
	const workspaceId = toTreeId(itemId, 'workspace');
	const deleteId = toTreeId(itemId, 'delete');

	const dateItem: Item = {
		id: dateId,
		label: 'Date',
		description: workspaceFields.locationDateSchema.description,
		valueComponent: TreeDate,
		value: fromDate(value.location.date, getLocalTimeZone()),
		onChange: (newData: DateValue) => {
			const date = newData.toDate(getLocalTimeZone());
			if (
				!fieldValid(dateId, date, workspaceFields.locationDateSchema, ctx.fieldErrors)
			) {
				return;
			}
			ctx.updateHandler(value.location.id, { date });
		}
	};
	const coordinateItem: Item = {
		id: coordinateId,
		label: 'Position',
		description: workspaceFields.coordinateSchema.description,
		valueComponent: TreeCoordinate,
		value: { x: value.location.x, y: value.location.y },
		onChange: (newData: { x: number; y: number }) => {
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
			ctx.updateHandler(value.location.id, { coordinate: newData });
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
			ctx.updateHandler(value.location.id, { workspaceId: newData.id });
		}
	};
	const deleteItem: Item = {
		id: deleteId,
		label: 'Delete',
		description: 'Deletes the geometry from the history.',
		valueComponent: TreeDeleteButton,
		value: undefined,
		onChange: () => {
			ctx.updateHandler(value.location.id, { delete: true });
		}
	};

	const children: Item[] = [dateItem, coordinateItem, workspaceItem];
	if (options.includeDelete) {
		children.push(deleteItem);
	}

	return {
		id: itemId,
		label: `Location ${value.index + 1}`,
		children: children
	};
}

/**
 * Constructs a tree item for a location history.
 * @param itemId The item ID of the returned tree item.
 * @param value Data required to construct the items.
 * @param ctx Tree context.
 * @returns The tree item.
 */
export function locationHistoryTreeItem(
	itemId: string,
	value: {
		/**
		 * A lifespan's location history has no standalone row to point at
		 * once resolved (see ResolvedLifespan) - only the id of the
		 * locationHistories row it originated from (needed to extend it)
		 * and its already-resolved locations array. A planting area's
		 * location history does have a resolved row (ResolvedLocationHistory)
		 * but callers pass just its id/locations here too, so both call
		 * sites share one shape.
		 */
		locationHistoryId: string | null | undefined;
		locations: ResolvedLocation[];
		workspaces: { id: string; name: string }[];
	},
	ctx: {
		locationUpdateHandler: LocationUpdateHandler;
		locationHistoryExtendHandler: LocationHistoryExtendHandler;
		fieldErrors: FieldErrors;
	}
): Item {
	if (!value.locationHistoryId) {
		return {
			id: itemId,
			label: 'Failed to resolve locations.'
		};
	}

	const addLocationId = toTreeId(itemId, 'locationAdd');
	const locationHistoryId = value.locationHistoryId;

	const locationItems = value.locations.map((location, index) => {
		const locationId = toTreeId(itemId, `locations[${index}]`);
		const includeDelete = value.locations.length > 1;

		return locationTreeItem(
			locationId,
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
			ctx.locationHistoryExtendHandler(locationHistoryId);
		}
	};

	return {
		id: itemId,
		label: 'Locations',
		children: [...locationItems, addLocationItem]
	};
}
