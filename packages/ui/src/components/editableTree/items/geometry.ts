import { type DateValue, fromDate, getLocalTimeZone } from '@internationalized/date';

import {
	type FieldErrors,
	type Geometry,
	type GeometryHistory,
	type GeometryType,
	type GeometryUpdateCommand,
	type Position,
	workspaceFields
} from '@vdg-webapp/models';

import {
	type Item,
	TreeAddButton,
	TreeCheckbox,
	TreeCoordinate,
	TreeDate,
	TreeDeleteButton,
	TreeDistance,
	TreeGeometryType,
	TreeNumber,
	fieldValid,
	toTreeId
} from '..';

export type GeometryUpdateHandler = (id: string, data: GeometryUpdateCommand) => void;

/**
 * Constructs an editable tree item for a geometry.
 * @param parentId The base ID of the parent tree item.
 * @param value Data required to construct the items.
 * @param options Options for how to construct the tree items.
 * @param ctx Tree context.
 * @returns The tree items that represent the geometry.
 */
export function geometryTreeItem(
	parentId: string,
	value: { geometry: Geometry | null | undefined; index: number },
	options: {
		includeIndex: boolean;
		includeDelete: boolean;
		includeDate: boolean;
		includeLinesClosed: boolean;
	},
	ctx: { updateHandler: GeometryUpdateHandler; fieldErrors: FieldErrors }
): Item {
	const geometryBaseId = parentId + `${value.index}/`;

	if (!value.geometry) {
		return {
			id: geometryBaseId,
			label: 'Failed to resolve geometry.'
		};
	}

	const typeId = geometryBaseId + 'type';
	const dateId = geometryBaseId + 'date';
	const scaleFactorId = geometryBaseId + 'scaleFactor';
	const rotationId = geometryBaseId + 'rotation';
	const deleteId = geometryBaseId + 'delete';

	const dateItem: Item = {
		id: dateId,
		label: 'Date',
		description: workspaceFields.geometryDateSchema.description,
		valueComponent: TreeDate,
		value: fromDate(value.geometry.date, getLocalTimeZone()),
		onChange: (newData: DateValue) => {
			if (
				!fieldValid(
					dateId,
					newData,
					workspaceFields.geometryDateSchema,
					ctx.fieldErrors
				) ||
				!value.geometry
			) {
				return;
			}
			ctx.updateHandler(value.geometry.id, {
				date: newData.toDate(getLocalTimeZone())
			});
		}
	};
	const typeItem: Item = {
		id: typeId,
		label: 'Type',
		description: workspaceFields.geometryTypeSchema.description,
		valueComponent: TreeGeometryType,
		value: value.geometry.type,
		onChange: (newData: GeometryType) => {
			if (
				!fieldValid(
					typeId,
					newData,
					workspaceFields.geometryTypeSchema,
					ctx.fieldErrors
				) ||
				!value.geometry
			) {
				return;
			}
			ctx.updateHandler(value.geometry.id, { type: newData });
		}
	};
	const scaleFactorItem: Item = {
		id: scaleFactorId,
		label: 'Scale Factor',
		description: workspaceFields.geometryScaleFactorSchema.description,
		valueComponent: TreeNumber,
		value: value.geometry.scaleFactor,
		onChange: (newData: number) => {
			if (
				!fieldValid(
					scaleFactorId,
					newData,
					workspaceFields.geometryScaleFactorSchema,
					ctx.fieldErrors
				) ||
				!value.geometry
			) {
				return;
			}
			ctx.updateHandler(value.geometry.id, { scaleFactor: newData });
		}
	};
	const rotationItem: Item = {
		id: rotationId,
		label: 'Rotation',
		description: workspaceFields.geometryRotationSchema.description,
		valueComponent: TreeNumber,
		value: value.geometry.rotation,
		onChange: (newData: number) => {
			if (
				!fieldValid(
					rotationId,
					newData,
					workspaceFields.geometryRotationSchema,
					ctx.fieldErrors
				) ||
				!value.geometry
			) {
				return;
			}
			ctx.updateHandler(value.geometry.id, { rotation: newData });
		}
	};
	const deleteItem: Item = {
		id: deleteId,
		label: 'Delete',
		description: 'Deletes the geometry from the history.',
		valueComponent: TreeDeleteButton,
		value: undefined,
		onChange: () => {
			if (!value.geometry) {
				return;
			}

			ctx.updateHandler(value.geometry.id, { delete: true });
		}
	};

	let attributesItems: Item[] = [];
	switch (value.geometry.type) {
		case 'RECTANGLE': {
			const rectangleLengthId = geometryBaseId + 'rectangleLength';
			const rectangleWidthId = geometryBaseId + 'rectangleWidth';

			attributesItems = [
				{
					id: rectangleLengthId,
					label: 'Length',
					description: workspaceFields.geometryRectangleLengthSchema.description,
					valueComponent: TreeDistance,
					value: value.geometry.rectangleLength,
					onChange: (newData: number) => {
						if (
							!fieldValid(
								rectangleLengthId,
								newData,
								workspaceFields.geometryRectangleLengthSchema,
								ctx.fieldErrors
							) ||
							!value.geometry
						) {
							return;
						}
						ctx.updateHandler(value.geometry.id, { rectangleLength: newData });
					}
				},
				{
					id: rectangleWidthId,
					label: 'Width',
					description: workspaceFields.geometryRectangleWidthSchema.description,
					valueComponent: TreeDistance,
					value: value.geometry.rectangleWidth,
					onChange: (newData: number) => {
						if (
							!fieldValid(
								rectangleWidthId,
								newData,
								workspaceFields.geometryRectangleWidthSchema,
								ctx.fieldErrors
							) ||
							!value.geometry
						) {
							return;
						}
						ctx.updateHandler(value.geometry.id, { rectangleWidth: newData });
					}
				}
			];
			break;
		}

		case 'POLYGON': {
			const polygonNumSidesId = geometryBaseId + 'polygonNumSides';
			const polygonRadiusId = geometryBaseId + 'polygonRadius';

			attributesItems = [
				{
					id: polygonNumSidesId,
					label: 'Side Count',
					description: workspaceFields.geometryPolygonNumSidesSchema.description,
					valueComponent: TreeNumber,
					value: value.geometry.polygonNumSides,
					onChange: (newData: number) => {
						if (
							!fieldValid(
								polygonNumSidesId,
								newData,
								workspaceFields.geometryPolygonNumSidesSchema,
								ctx.fieldErrors
							) ||
							!value.geometry
						) {
							return;
						}
						ctx.updateHandler(value.geometry.id, { polygonNumSides: newData });
					}
				},
				{
					id: polygonRadiusId,
					label: 'Radius',
					description: workspaceFields.geometryPolygonRadiusSchema.description,
					valueComponent: TreeDistance,
					value: value.geometry.polygonRadius,
					onChange: (newData: number) => {
						if (
							!fieldValid(
								polygonRadiusId,
								newData,
								workspaceFields.geometryPolygonRadiusSchema,
								ctx.fieldErrors
							) ||
							!value.geometry
						) {
							return;
						}
						ctx.updateHandler(value.geometry.id, { polygonRadius: newData });
					}
				}
			];
			break;
		}

		case 'ELLIPSE': {
			const ellipseLengthId = geometryBaseId + 'ellipseLength';
			const ellipseWidthId = geometryBaseId + 'ellipseWidth';

			attributesItems = [
				{
					id: ellipseLengthId,
					label: 'Length',
					description: workspaceFields.geometryEllipseLengthSchema.description,
					valueComponent: TreeDistance,
					value: value.geometry.ellipseLength,
					onChange: (newData: number) => {
						if (
							!fieldValid(
								ellipseLengthId,
								newData,
								workspaceFields.geometryEllipseLengthSchema,
								ctx.fieldErrors
							) ||
							!value.geometry
						) {
							return;
						}
						ctx.updateHandler(value.geometry.id, { ellipseLength: newData });
					}
				},
				{
					id: ellipseWidthId,
					label: 'Width',
					description: workspaceFields.geometryEllipseWidthSchema.description,
					valueComponent: TreeDistance,
					value: value.geometry.ellipseWidth,
					onChange: (newData: number) => {
						if (
							!fieldValid(
								ellipseWidthId,
								newData,
								workspaceFields.geometryEllipseWidthSchema,
								ctx.fieldErrors
							) ||
							!value.geometry
						) {
							return;
						}
						ctx.updateHandler(value.geometry.id, { ellipseWidth: newData });
					}
				}
			];
			break;
		}

		case 'LINES': {
			const linesCoordinatesId = geometryBaseId + 'linesCoordinates';
			const linesAddCoordinateId = geometryBaseId + 'linesAddCoordinate';
			const linesClosedId = geometryBaseId + 'linesClosed';

			/**
			 * The approach taken to coordinate items is this:
			 * The coordinates can be edited through the onChange callback as usual.
			 * The entire new array of coordinates must be passed to the update command.
			 * If the newData position is null, the coordinate is deleted.
			 */
			const coordinateItems: Item[] = value.geometry.linesCoordinates.map(
				(coordinate, index) => {
					const coordinateId = geometryBaseId + `linesCoordinate${index}`;
					const positionId = coordinateId + '/position';
					const deleteId = coordinateId + `/delete`;

					const positionItem: Item = {
						id: positionId,
						label: 'Position',
						description: workspaceFields.coordinateSchema.description,
						valueComponent: TreeCoordinate,
						value: coordinate,
						onChange: (newData: Position) => {
							if (
								!fieldValid(
									positionId,
									newData,
									workspaceFields.coordinateSchema,
									ctx.fieldErrors
								) ||
								!value.geometry
							) {
								return;
							}

							/** Modify the coordinate. */
							const newCoordinates: Position[] = value.geometry.linesCoordinates;
							newCoordinates[index] = newData;

							ctx.updateHandler(value.geometry.id, {
								linesCoordinates: newCoordinates
							});
						}
					};

					const deleteItem: Item = {
						id: deleteId,
						label: 'Delete',
						description: 'Deletes the coordinate.',
						valueComponent: TreeDeleteButton,
						value: undefined,
						onChange: () => {
							if (!value.geometry) {
								return;
							}

							/** Remove the coordinate. */
							const newCoordinates: Position[] = value.geometry.linesCoordinates.filter(
								(existingCoordinate) => existingCoordinate.id != coordinate.id
							);

							ctx.updateHandler(value.geometry.id, {
								linesCoordinates: newCoordinates
							});
						}
					};
					return {
						id: coordinateId,
						label: `Coordinate ${index}`,
						children: [positionItem, deleteItem]
					};
				}
			);

			const addCoordinateItem: Item = {
				id: linesAddCoordinateId,
				label: 'Add Coordinate',
				valueComponent: TreeAddButton,
				value: undefined,
				/**
				 * The callback here is just used to register the add
				 * button has been pressed, so no need for data.
				 */
				onChange: () => {
					if (!value.geometry) {
						return;
					}

					const newCoordinates: Position[] = [...value.geometry.linesCoordinates];
					const newCoordinate = {
						x: newCoordinates[newCoordinates.length - 1].x + 0.1,
						y: newCoordinates[newCoordinates.length - 1].y + 0.1
					};
					newCoordinates.push(newCoordinate);
					ctx.updateHandler(value.geometry.id, {
						linesCoordinates: newCoordinates
					});
				}
			};

			const linesClosedItem: Item = {
				id: linesClosedId,
				label: 'Closed Shape',
				description: workspaceFields.geometryLinesClosedSchema.description,
				valueComponent: TreeCheckbox,
				value: value.geometry.linesClosed,
				onChange: (newData: boolean) => {
					if (
						!fieldValid(
							linesClosedId,
							newData,
							workspaceFields.geometryLinesClosedSchema,
							ctx.fieldErrors
						) ||
						!value.geometry
					) {
						return;
					}
					ctx.updateHandler(value.geometry.id, { linesClosed: newData });
				}
			};

			if (options.includeLinesClosed) {
				attributesItems = [
					{
						id: linesCoordinatesId,
						label: 'Coordinates',
						children: [...coordinateItems, addCoordinateItem]
					},
					linesClosedItem
				];
			} else {
				attributesItems = [
					{
						id: linesCoordinatesId,
						label: 'Coordinates',
						children: [...coordinateItems, addCoordinateItem]
					}
				];
			}
			break;
		}
	}

	let children: Item[] = [];

	if (options.includeDate) {
		children = [dateItem, typeItem, scaleFactorItem, rotationItem, ...attributesItems];
	} else {
		children = [typeItem, scaleFactorItem, rotationItem, ...attributesItems];
	}

	if (options.includeDelete) {
		children.push(deleteItem);
	}

	const geometryLabel = options.includeIndex
		? `Geometry ${value.index + 1}`
		: 'Geometry';
	return {
		id: geometryBaseId,
		label: geometryLabel,
		children: children
	};
}

/**
 * Constructs a tree item for a geometry history.
 * @param baseId The base ID of the parent tree item.
 * @param value Data required to construct the items.
 * @param options Options for how to construct the tree items.
 * @param ctx Tree context.
 * @returns The tree item.
 */
export function geometryHistoryTreeItem(
	baseId: string,
	value: {
		geometryHistory: GeometryHistory | null;
	},
	options: {
		includeLinesClosed: boolean;
	},
	ctx: {
		geometryUpdateHandler: GeometryUpdateHandler;
		onGeometryHistoryExtend: () => void;
		fieldErrors: FieldErrors;
	}
): Item {
	const geometryHistoryBaseId = toTreeId(baseId, 'geometries');

	if (!value.geometryHistory) {
		return {
			id: geometryHistoryBaseId,
			label: 'Failed to resolve geometries.'
		};
	}

	const addGeometryId = toTreeId(baseId, 'geometryAdd');

	const geometryItems = value.geometryHistory.geometries.map((geometry, index) => {
		return geometryTreeItem(
			geometryHistoryBaseId,
			{ geometry, index },
			{
				includeIndex: true,
				includeDate: true,
				includeDelete: true,
				includeLinesClosed: options.includeLinesClosed
			},
			{ updateHandler: ctx.geometryUpdateHandler, fieldErrors: ctx.fieldErrors }
		);
	});

	const addGeometryItem: Item = {
		id: addGeometryId,
		label: 'Add',
		description: 'Adds a new geometry to the history.',
		valueComponent: TreeAddButton,
		value: undefined,
		/**
		 * The callback here is just used to register the add
		 * button has been pressed, so no need for data.
		 */
		onChange: () => {
			ctx.onGeometryHistoryExtend();
		}
	};

	return {
		id: geometryHistoryBaseId,
		label: 'Geometries',
		children: [...geometryItems, addGeometryItem]
	};
}
