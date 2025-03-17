import {
	TreeNumber,
	TreeDistance,
	TreeGeometryType,
	TreeDate,
	TreeDeletableCoordinate,
	TreeAddButton,
	TreeCheckbox,
	toTreeId,
	fieldValid,
	type Item
} from '$components/editableTree';
import { type ChangeHandler } from '$state/changeHandler.svelte';
import {
	type Geometry,
	type GeometryType,
	workspaceFields,
	type GeometryUpdateCommand,
	type FieldErrors,
	type Position
} from '@vdt-webapp/common';
import { getLocalTimeZone, type DateValue } from '@internationalized/date';

/**
 * Constructs an editable tree item for a geometry.
 * @param baseId The base ID of the tree item.
 * @param geometry The geometry to use.
 * @param includeDate If false, the geometry date won't
 * be included in the tree. Used for situations where only
 * one geometry is supported as opposed to a geometry history
 * (as in the case of a planting area) as the date isn't used.
 * @param includeLinesClosed If false, the linesClosed attribute
 * won't be included. Used for situations where the geometry must
 * be closed or unclosed and this isn't editable by the user.
 * @param changeHandler The change handler for the tree's geomety.
 * The key of the record are IDs of geometries, and the values are
 * the updated fields.
 * @param fieldErrors The field errors of the tree, updated upon failed validation.
 * @returns The tree items that represent the geometry.
 */
export function geometryTreeItem(
	baseId: string,
	geometry: Geometry | null,
	includeDate: boolean = true,
	includeLinesClosed: boolean = false,
	changeHandler: ChangeHandler<Record<string, GeometryUpdateCommand>>,
	fieldErrors: FieldErrors
): Item {
	if (!geometry) {
		return {
			id: toTreeId(baseId, 'geometry'),
			label: 'Failed to resolve geometry.'
		};
	}

	const typeId = toTreeId(baseId, 'geometryType');
	const dateId = toTreeId(baseId, 'geometryDate');
	const scaleFactorId = toTreeId(baseId, 'geometryScaleFactor');
	const rotationId = toTreeId(baseId, 'geometryRotation');

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
			changeHandler.change(changeOver, {
				[geometry.id]: { type: newData }
			});
		}
	};
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
			changeHandler.change(changeOver, {
				[geometry.id]: { date: newData.toDate(getLocalTimeZone()) }
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
			changeHandler.change(changeOver, {
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
			changeHandler.change(changeOver, {
				[geometry.id]: { rotation: newData }
			});
		}
	};

	let attributesItems: Item[] = [];
	switch (geometry.type) {
		case 'RECTANGLE':
			const rectangleLengthId = toTreeId(baseId, 'geometryRectangleLength');
			const rectangleWidthId = toTreeId(baseId, 'geometryRectangleWidth');

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
						changeHandler.change(changeOver, {
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
						changeHandler.change(changeOver, {
							[geometry.id]: { rectangleWidth: newData }
						});
					}
				}
			];
			break;

		case 'POLYGON':
			const polygonNumSidesId = toTreeId(baseId, 'geometryPolygonNumSides');
			const polygonRadiusId = toTreeId(baseId, 'geometryPolygonRadius');

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
						changeHandler.change(changeOver, {
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
						changeHandler.change(changeOver, {
							[geometry.id]: { polygonRadius: newData }
						});
					}
				}
			];
			break;

		case 'ELLIPSE':
			const ellipseLengthId = toTreeId(baseId, 'geometryEllipseLength');
			const ellipseWidthId = toTreeId(baseId, 'geometryEllipseWidth');

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
						changeHandler.change(changeOver, {
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
						changeHandler.change(changeOver, {
							[geometry.id]: { ellipseWidth: newData }
						});
					}
				}
			];
			break;

		case 'LINES':
			const linesCoordinatesId = toTreeId(baseId, 'geometryLinesCoordinates');
			const linesAddCoordinateId = toTreeId(baseId, 'geometryLinesAddCoordinate');
			const linesClosedId = toTreeId(baseId, 'geometryLinesClosed');

			/**
			 * The approach taken to coordinate items is this:
			 * The coordinates can be edited through the onChange callback as usual.
			 * The entire new array of coordinates must be passed to the update command.
			 * If the newData position is null, the coordinate is deleted.
			 */
			const coordinateItems: Item[] = geometry.linesCoordinates.map(
				(coordinate, index) => {
					const coordinateId = toTreeId(baseId, `geometryLinesCoordinate${index}`);

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

							changeHandler.change(changeOver, {
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
					changeHandler.change(changeOver, {
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
					changeHandler.change(changeOver, {
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

	if (includeDate) {
		return {
			id: toTreeId(baseId, 'geometry'),
			label: 'Geometry',
			children: [typeItem, dateItem, scaleFactorItem, rotationItem, ...attributesItems]
		};
	} else {
		return {
			id: toTreeId(baseId, 'geometry'),
			label: 'Geometry',
			children: [typeItem, scaleFactorItem, rotationItem, ...attributesItems]
		};
	}
}
