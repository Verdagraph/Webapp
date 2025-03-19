import {
	TreeNumber,
	TreeDistance,
	TreeGeometryType,
	TreeDate,
	TreeDeletableCoordinate,
	TreeAddButton,
	TreeDeleteButton,
	TreeCheckbox,
	toTreeId,
	fieldValid,
	type Item
} from '$components/editableTree';
import { type ChangeHandler } from '$state/changeHandler.svelte';
import {
	type Geometry,
	type GeometryHistory,
	type GeometryType,
	workspaceFields,
	type GeometryUpdateCommand,
	type FieldErrors,
	type Position
} from '@vdt-webapp/common';
import { getLocalTimeZone, type DateValue } from '@internationalized/date';

/**
 * Constructs an editable tree item for a geometry.
 * @param parentId The base ID of the parent tree item.
 * @param geometry The geometry to use.
 * @param includeDelete Whether to include the option to delete the geometry.
 * @param includeDate If false, the geometry date won't
 * be included in the tree. Used for situations where only
 * one geometry is supported as opposed to a geometry history
 * (as in the case of a planting area) as the date isn't used.
 * @param includeLinesClosed If false, the linesClosed attribute
 * won't be included. Used for situations where the geometry must
 * be closed or unclosed and this isn't editable by the user.
 * @param geometryUpdateHandler The change handler for the tree's geomety.
 * The key of the record are IDs of geometries, and the values are
 * the updated fields.
 * @param fieldErrors The field errors of the tree, updated upon failed validation.
 * @returns The tree items that represent the geometry.
 */
export function geometryTreeItem(
	parentId: string,
	geometry: Geometry | null | undefined,
	includeDelete: boolean = false,
	includeDate: boolean = true,
	includeLinesClosed: boolean = false,
	geometryUpdateHandler: ChangeHandler<Record<string, GeometryUpdateCommand>>,
	fieldErrors: FieldErrors,
	index: number = 0
): Item {
	const geometryBaseId = parentId + `${index}/`;

	if (!geometry) {
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
		value: geometry.date,
		onChange: (changeOver: boolean, newData: DateValue) => {
			if (
				!fieldValid(dateId, newData, workspaceFields.geometryDateSchema, fieldErrors)
			) {
				return;
			}
			geometryUpdateHandler.change(changeOver, {
				[geometry.id]: { date: newData.toDate(getLocalTimeZone()) }
			});
		}
	};
	const typeItem: Item = {
		id: typeId,
		label: 'Type',
		description: workspaceFields.geometryTypeSchema.description,
		valueComponent: TreeGeometryType,
		value: geometry.type,
		onChange: (changeOver: boolean, newData: GeometryType) => {
			if (
				!fieldValid(typeId, newData, workspaceFields.geometryTypeSchema, fieldErrors)
			) {
				return;
			}
			geometryUpdateHandler.change(changeOver, {
				[geometry.id]: { type: newData }
			});
		}
	};
	const scaleFactorItem: Item = {
		id: scaleFactorId,
		label: 'Scale Factor',
		description: workspaceFields.geometryScaleFactorSchema.description,
		valueComponent: TreeNumber,
		value: geometry.scaleFactor,
		onChange: (changeOver: boolean, newData: number) => {
			if (
				!fieldValid(
					scaleFactorId,
					newData,
					workspaceFields.geometryScaleFactorSchema,
					fieldErrors
				)
			) {
				return;
			}
			geometryUpdateHandler.change(changeOver, {
				[geometry.id]: { scaleFactor: newData }
			});
		}
	};
	const rotationItem: Item = {
		id: rotationId,
		label: 'Rotation',
		description: workspaceFields.geometryRotationSchema.description,
		valueComponent: TreeNumber,
		value: geometry.rotation,
		onChange: (changeOver: boolean, newData: number) => {
			if (
				!fieldValid(
					rotationId,
					newData,
					workspaceFields.geometryRotationSchema,
					fieldErrors
				)
			) {
				return;
			}
			geometryUpdateHandler.change(changeOver, {
				[geometry.id]: { rotation: newData }
			});
		}
	};
	const deleteItem: Item = {
		id: deleteId,
		label: 'Delete',
		description: 'Deletes the geometry from the history.',
		valueComponent: TreeDeleteButton,
		value: undefined,
		onChange: (changeOver: boolean, newData: undefined) => {
			geometryUpdateHandler.change(true, {
				[geometry.id]: { delete: true }
			});
		}
	};

	let attributesItems: Item[] = [];
	switch (geometry.type) {
		case 'RECTANGLE':
			const rectangleLengthId = geometryBaseId + 'rectangleLength';
			const rectangleWidthId = geometryBaseId + 'rectangleWidth';

			attributesItems = [
				{
					id: rectangleLengthId,
					label: 'Length',
					description: workspaceFields.geometryRectangleLengthSchema.description,
					valueComponent: TreeDistance,
					value: geometry.rectangleLength,
					onChange: (changeOver: boolean, newData: number) => {
						if (
							!fieldValid(
								rectangleLengthId,
								newData,
								workspaceFields.geometryRectangleLengthSchema,
								fieldErrors
							)
						) {
							return;
						}
						geometryUpdateHandler.change(changeOver, {
							[geometry.id]: { rectangleLength: newData }
						});
					}
				},
				{
					id: rectangleWidthId,
					label: 'Width',
					description: workspaceFields.geometryRectangleWidthSchema.description,
					valueComponent: TreeDistance,
					value: geometry.rectangleWidth,
					onChange: (changeOver: boolean, newData: number) => {
						if (
							!fieldValid(
								rectangleWidthId,
								newData,
								workspaceFields.geometryRectangleWidthSchema,
								fieldErrors
							)
						) {
							return;
						}
						geometryUpdateHandler.change(changeOver, {
							[geometry.id]: { rectangleWidth: newData }
						});
					}
				}
			];
			break;

		case 'POLYGON':
			const polygonNumSidesId = geometryBaseId + 'polygonNumSides';
			const polygonRadiusId = geometryBaseId + 'polygonRadius';

			attributesItems = [
				{
					id: polygonNumSidesId,
					label: 'Side Count',
					description: workspaceFields.geometryPolygonNumSidesSchema.description,
					valueComponent: TreeNumber,
					value: geometry.polygonNumSides,
					onChange: (changeOver: boolean, newData: number) => {
						if (
							!fieldValid(
								polygonNumSidesId,
								newData,
								workspaceFields.geometryPolygonNumSidesSchema,
								fieldErrors
							)
						) {
							return;
						}
						geometryUpdateHandler.change(changeOver, {
							[geometry.id]: { polygonNumSides: newData }
						});
					}
				},
				{
					id: polygonRadiusId,
					label: 'Radius',
					description: workspaceFields.geometryPolygonRadiusSchema.description,
					valueComponent: TreeDistance,
					value: geometry.polygonRadius,
					onChange: (changeOver: boolean, newData: number) => {
						if (
							!fieldValid(
								polygonRadiusId,
								newData,
								workspaceFields.geometryPolygonRadiusSchema,
								fieldErrors
							)
						) {
							return;
						}
						geometryUpdateHandler.change(changeOver, {
							[geometry.id]: { polygonRadius: newData }
						});
					}
				}
			];
			break;

		case 'ELLIPSE':
			const ellipseLengthId = geometryBaseId + 'ellipseLength';
			const ellipseWidthId = geometryBaseId + 'ellipseWidth';

			attributesItems = [
				{
					id: ellipseLengthId,
					label: 'Length',
					description: workspaceFields.geometryEllipseLengthSchema.description,
					valueComponent: TreeDistance,
					value: geometry.ellipseLength,
					onChange: (changeOver: boolean, newData: number) => {
						if (
							!fieldValid(
								ellipseLengthId,
								newData,
								workspaceFields.geometryEllipseLengthSchema,
								fieldErrors
							)
						) {
							return;
						}
						geometryUpdateHandler.change(changeOver, {
							[geometry.id]: { ellipseLength: newData }
						});
					}
				},
				{
					id: ellipseWidthId,
					label: 'Width',
					description: workspaceFields.geometryEllipseWidthSchema.description,
					valueComponent: TreeDistance,
					value: geometry.ellipseWidth,
					onChange: (changeOver: boolean, newData: number) => {
						if (
							!fieldValid(
								ellipseWidthId,
								newData,
								workspaceFields.geometryEllipseWidthSchema,
								fieldErrors
							)
						) {
							return;
						}
						geometryUpdateHandler.change(changeOver, {
							[geometry.id]: { ellipseWidth: newData }
						});
					}
				}
			];
			break;

		case 'LINES':
			const linesCoordinatesId = geometryBaseId + 'linesCoordinates';
			const linesAddCoordinateId = geometryBaseId + 'linesAddCoordinate';
			const linesClosedId = geometryBaseId + 'linesClosed';

			/**
			 * The approach taken to coordinate items is this:
			 * The coordinates can be edited through the onChange callback as usual.
			 * The entire new array of coordinates must be passed to the update command.
			 * If the newData position is null, the coordinate is deleted.
			 */
			const coordinateItems: Item[] = geometry.linesCoordinates.map(
				(coordinate, index) => {
					const coordinateId = geometryBaseId + `linesCoordinate${index}`;

					return {
						id: coordinateId,
						label: `Coordinate ${index}`,
						description: workspaceFields.coordinateSchema.description,
						valueComponent: TreeDeletableCoordinate,
						value: coordinate,
						onChange: (changeOver: boolean, newData: Position | null) => {
							/** Remove the coordinate. */
							const newCoordinates: Position[] = geometry.linesCoordinates.filter(
								(existingCoordinate) => existingCoordinate.id != coordinate.id
							);

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

								newCoordinates.push(newData);
							}

							geometryUpdateHandler.change(changeOver, {
								[geometry.id]: { linesCoordinates: newCoordinates }
							});
						}
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
				onChange: (changeOver: boolean, newData: undefined) => {
					const newCoordinates: Position[] = geometry.linesCoordinates;
					newCoordinates.push(newCoordinates[newCoordinates.length - 1]);
					geometryUpdateHandler.change(changeOver, {
						[geometry.id]: { linesCoordinates: newCoordinates }
					});
				}
			};

			const linesClosedItem: Item = {
				id: linesClosedId,
				label: 'Closed Shape',
				description: workspaceFields.geometryLinesClosedSchema.description,
				valueComponent: TreeCheckbox,
				value: geometry.linesClosed,
				onChange: (changeOver: boolean, newData: boolean) => {
					if (
						!fieldValid(
							linesClosedId,
							newData,
							workspaceFields.geometryLinesClosedSchema,
							fieldErrors
						)
					) {
						return;
					}
					geometryUpdateHandler.change(changeOver, {
						[geometry.id]: { linesClosed: newData }
					});
				}
			};

			if (includeLinesClosed) {
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

	let children: Item[] = [];

	if (includeDate) {
		children = [dateItem, typeItem, scaleFactorItem, rotationItem, ...attributesItems];
	} else {
		children = [typeItem, scaleFactorItem, rotationItem, ...attributesItems];
	}

	if (includeDelete) {
		children.push(deleteItem);
	}

	return {
		id: geometryBaseId,
		label: `Geometry ${index + 1}`,
		children: children
	};
}

/**
 * Constructs a tree item for a geometry history.
 * @param baseId The base ID of the parent tree item.
 * @param geometryHistory Geometry history to use.
 * @param includeLinesClosed If false, the linesClosed attribute
 * won't be included. Used for situations where the geometry must
 * be closed or unclosed and this isn't editable by the user.
 * @param geometryUpdateHandler The handler for updating each geometry.
 * @param geometryHistoryExtendHandler The handler for extending the geometry history.
 * @param fieldErrors The field errors of the editable tree.
 * @returns The tree item.
 */
export function geometryHistoryTreeItem(
	baseId: string,
	geometryHistory: GeometryHistory | null,
	includeLinesClosed: boolean = false,
	geometryUpdateHandler: ChangeHandler<Record<string, GeometryUpdateCommand>>,
	geometryHistoryExtendHandler: ChangeHandler<string>,
	fieldErrors: FieldErrors
): Item {
	const geometryHistoryBaseId = toTreeId(baseId, 'geometries');

	if (!geometryHistory) {
		return {
			id: geometryHistoryBaseId,
			label: 'Failed to resolve geometries.'
		};
	}

	const addGeometryId = toTreeId(baseId, 'geometryAdd');

	const geometryItems = geometryHistory.geometries.map((geometry, index) => {
		return geometryTreeItem(
			geometryHistoryBaseId,
			geometry,
			true,
			true,
			includeLinesClosed,
			geometryUpdateHandler,
			fieldErrors,
			index
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
		onChange: (changeOver: boolean, newData: undefined) => {
			geometryHistoryExtendHandler.change(true, geometryHistory.id);
		}
	};

	return {
		id: geometryHistoryBaseId,
		label: 'Geometries',
		children: [...geometryItems, addGeometryItem]
	};
}
