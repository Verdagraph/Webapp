import { AppError } from '@vdt-webapp/common/src/errors';

const TREE_ID_DELIMITER = '/~';

/**
 * Every item in the tree needs a unique ID.
 * In order to synchronize the tree's selection
 * state with the app's selection state, we need
 * to be able to tell when an item is associated
 * with a particular entity, ex., when the user
 * selects the Name field on a PlantingArea,
 * we want to be able to add that PlantingArea to the
 * selection.
 *
 * This function composes an entity type, ID, and field name
 * into a string ID for the tree item so it can be retrieved from the ID.
 * @param entityType The name of the type of entity.
 * @param entityId The ID of the entity.
 * @param field If defined, the tree item represents a field of the entity.
 * @returns The Tree item id.
 */
export function toTreeId<EntityTypeT extends string>(
	entityType: EntityTypeT,
	entityId: string,
	field?: string
): string {
	return field
		? `${entityType}${TREE_ID_DELIMITER}${entityId}${TREE_ID_DELIMITER}${field}`
		: `${entityType}${TREE_ID_DELIMITER}${entityId}`;
}

/**
 * Every item in the tree needs a unique ID.
 * In order to synchronize the tree's selection
 * state with the app's selection state, we need
 * to be able to tell when an item is associated
 * with a particular entity, ex., when the user
 * selects the Name field on a PlantingArea,
 * we want to be able to add that PlantingArea to the
 * selection.
 *
 * This function extracts an entity type, ID, and field name
 * into a string ID for the tree item so it can be retrieved from the ID.
 * @param id The Tree item id.
 * @returns The entity type, ID, and field name.
 */
export function fromTreeId<EntityTypeT extends string>(
	id: string
): { entityType: EntityTypeT; entityId: string; field?: string } {
	const parts = id.split(TREE_ID_DELIMITER);
	if (parts.length < 2 || parts.length > 3) {
		throw new AppError('Invalid Tree ID format');
	}
	return parts[3]
		? { entityType: parts[0] as EntityTypeT, entityId: parts[1], field: parts[2] }
		: { entityType: parts[0] as EntityTypeT, entityId: parts[1] };
}
