import { AppError, validateField } from '@vdg-webapp/models';
import {} from 'zod';
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
 */
/**
 * This function composes an entity type, ID, and field name
 * into a string ID for the tree so that individual item IDs can be composed onto it.
 * @param entityType The name of the type of entity.
 * @param entityId The ID of the entity.
 * @returns The Tree item id.
 */
export function toTreeBaseId(entityType, entityId) {
	return `${entityType}${TREE_ID_DELIMITER}${entityId}`;
}
/**
 * This function composes a tree ID of a field given a base ID.
 * @param baseId The base ID of the tree item.
 * @param field The name of the field.
 * @returns The Tree item id.
 */
export function toTreeId(baseId, field) {
	return `${baseId}${TREE_ID_DELIMITER}${field}`;
}
/**
 * This function extracts an entity type, ID, and field name
 * into a string ID for the tree item so it can be retrieved from the ID.
 * @param id The Tree item id.
 * @returns The entity type, ID, and field name.
 */
export function fromTreeId(id) {
	const parts = id.split(TREE_ID_DELIMITER);
	if (parts.length < 2 || parts.length > 3) {
		throw new AppError(`Invalid Tree ID format: ${id}`);
	}
	return parts[2]
		? { entityType: parts[0], entityId: parts[1], field: parts[2] }
		: { entityType: parts[0], entityId: parts[1] };
}
/**
 * Validates a tree item's value against a schema.
 * If the validation fails, the errors are set on the fieldErrors object
 * and false is returned.
 * @param treeId The tree ID of the item.
 * @param value The value to validate.
 * @param schema The schema to validate against.
 * @param fieldErrors The tree errors.
 * @returns False if validation failed.
 */
export function fieldValid(treeId, value, schema, fieldErrors) {
	const errors = validateField(value, schema);
	if (errors) {
		fieldErrors[treeId] = errors;
		return false;
	} else {
		return true;
	}
}
