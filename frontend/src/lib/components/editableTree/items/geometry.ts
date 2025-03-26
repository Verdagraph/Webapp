import {
	TreeNumber,
	TreeDistance,
	TreeGeometryType,
	TreeDate,
	TreeCoordinate,
	TreeAddButton,
	TreeDeleteButton,
	TreeCheckbox,
	toTreeId,
	fieldValid,
	type Item
} from '$components/editableTree';
import {
	type Geometry,
	type GeometryHistory,
	type GeometryType,
	workspaceFields,
	type GeometryUpdateCommand,
	type FieldErrors,
	type Position
} from '@vdt-webapp/common';
import { getLocalTimeZone, fromDate, type DateValue } from '@internationalized/date';

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
 * @param onChange The change handler for the tree's geomety.
 * @param fieldErrors The field errors of the tree, updated upon failed validation.
 * @returns The tree items that represent the geometry.
 */
export function geometryTreeItem(
	parentId: string,
	geometry: Geometry | null | undefined,
	includeDelete: boolean = false,
	includeDate: boolean = true,
	includeLinesClosed: boolean = false,
	onChange: (data: GeometryUpdateCommand) => void,
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
		value: fromDate(geometry.date, getLocalTimeZone()),
		onChange: (changeOver: boolean, newData: DateValue) => {
			if (
				!fieldValid(dateId, newData, workspaceFields.geometryDateSchema, fieldErrors)
			) {
				return;
			}
			onChange({ date: newData.toDate(getLocalTimeZone()) })
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
			onChange({type: newData})
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
			onChange({scaleFactor: newData})
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
			onChange({rotation: newData})
		}
	};
	const deleteItem: Item = {
		id: deleteId,
		label: 'Delete',
		description: 'Deletes the geometry from the history.',
		valueComponent: TreeDeleteButton,
		value: undefined,
		onChange: (changeOver: boolean, newData: undefined) => {
			onChange({delete: true})
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
						onChange({rectangleLength: newData})
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
						onChange({ rectangleWidth: newData })
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
						onChange({ polygonNumSides: newData })
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
						onChange({ polygonRadius: newData })
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
						onChange({ ellipseLength: newData })
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
						onChange({ ellipseWidth: newData })
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
					const positionId = coordinateId + '/position';
					const deleteId = coordinateId + `/delete`;

					const positionItem: Item = {
						id: positionId,
						label: 'Position',
						description: workspaceFields.coordinateSchema.description,
						valueComponent: TreeCoordinate,
						value: coordinate,
						onChange: (changeOver: boolean, newData: Position) => {
							/** Remove the coordinate. */
							const newCoordinates: Position[] = geometry.linesCoordinates.filter(
								(existingCoordinate) => existingCoordinate.id != coordinate.id
							);

							if (
								!fieldValid(
									positionId,
									newData,
									workspaceFields.coordinateSchema,
									fieldErrors
								)
							) {
								return;
							}

							newCoordinates.push(newData);

							onChange({ linesCoordinates: newCoordinates })
						}
					};

					const deleteItem: Item = {
						id: deleteId,
						label: 'Delete',
						description: 'Deletes the coordinate.',
						valueComponent: TreeDeleteButton,
						value: undefined,
						onChange: (changeOver: boolean, newData: undefined) => {
							/** Remove the coordinate. */
							const newCoordinates: Position[] = geometry.linesCoordinates.filter(
								(existingCoordinate) => existingCoordinate.id != coordinate.id
							);

							onChange({ linesCoordinates: newCoordinates })
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
				onChange: (changeOver: boolean, newData: undefined) => {
					const newCoordinates: Position[] = [...geometry.linesCoordinates];
					const newCoordinate = {
						x: newCoordinates[newCoordinates.length - 1].x + 0.1,
						y: newCoordinates[newCoordinates.length - 1].y + 0.1
					};
					newCoordinates.push(newCoordinate);
					onChange({ linesCoordinates: newCoordinates })
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
					onChange({ linesClosed: newData })
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
 * @param onGeometryUpdate The handler for updating each geometry.
 * @param onGeometryExtend The handler for extending the geometry history.
 * @param fieldErrors The field errors of the editable tree.
 * @returns The tree item.
 */
export function geometryHistoryTreeItem(
	baseId: string,
	geometryHistory: GeometryHistory | null,
	includeLinesClosed: boolean = false,
	onGeometryUpdate: (data: GeometryUpdateCommand) => void,
	onGeometryHistoryExtend: () => void,
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
			onGeometryUpdate,
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
			onGeometryHistoryExtend()
		}
	};

	return {
		id: geometryHistoryBaseId,
		label: 'Geometries',
		children: [...geometryItems, addGeometryItem]
	};
}
