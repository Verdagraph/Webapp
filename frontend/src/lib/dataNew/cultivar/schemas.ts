/**
 * Central file to store descriptions of valid mutation schemas.
 * Collates generated typescript schema metadata from the backend.
 * May be autogenerated as well eventually.
 */
import { z as zod } from 'zod';
import cultivarFields from '$lib/backendSchema/specs/cultivar';
import { CultivarCollectionCreateCommandVisibility } from '$codegen/types';

export const cultivarFieldSchemas = {
	/** Collection. */
	cultivar_collection_name: zod
		.string()
		.min(
			cultivarFields.cultivar_collection_name.min_length.value,
			cultivarFields.cultivar_collection_name.min_length.message
		)
		.max(
			cultivarFields.cultivar_collection_name.max_length.value,
			cultivarFields.cultivar_collection_name.max_length.message
		)
		.regex(
			cultivarFields.cultivar_collection_name.pattern.value,
			cultivarFields.cultivar_collection_name.pattern.message
		)
		.describe(cultivarFields.cultivar_collection_name.description),
	cultivar_collection_description: zod
		.string()
		.max(
			cultivarFields.cultivar_collection_description.max_length.value,
			cultivarFields.cultivar_collection_description.max_length.message
		)
		.describe(cultivarFields.cultivar_collection_description.description),
	cultivar_collection_tags: zod
		.array(
			zod
				.string()
				.max(
					cultivarFields.cultivar_collection_tag.max_length.value,
					cultivarFields.cultivar_collection_tag.max_length.message
				)
				.regex(
					cultivarFields.cultivar_collection_tag.pattern.value,
					cultivarFields.cultivar_collection_tag.pattern.message
				)
				.describe(cultivarFields.cultivar_collection_tag.description)
		)
		.max(
			cultivarFields.cultivar_collection_tags.max_length.value,
			cultivarFields.cultivar_collection_tags.max_length.message
		)
		.describe(cultivarFields.cultivar_collection_tags.description),

	/** Cultivar. */
	cultivar_names: zod
		.array(
			zod
				.string()
				.min(
					cultivarFields.cultivar_name.min_length.value,
					cultivarFields.cultivar_name.min_length.message
				)
				.max(
					cultivarFields.cultivar_name.max_length.value,
					cultivarFields.cultivar_name.max_length.message
				)
				.regex(
					cultivarFields.cultivar_name.pattern.value,
					cultivarFields.cultivar_name.pattern.message
				)
				.describe(cultivarFields.cultivar_name.description)
		)
		.min(
			cultivarFields.cultivar_names.min_length.value,
			cultivarFields.cultivar_names.min_length.message
		)
		.max(
			cultivarFields.cultivar_names.max_length.value,
			cultivarFields.cultivar_names.max_length.message
		)
		.describe(cultivarFields.cultivar_names.description),
	cultivar_key: zod
		.string()
		.min(
			cultivarFields.cultivar_key.min_length.value,
			cultivarFields.cultivar_key.min_length.message
		)
		.max(
			cultivarFields.cultivar_key.max_length.value,
			cultivarFields.cultivar_key.max_length.message
		)
		.regex(
			cultivarFields.cultivar_key.pattern.value,
			cultivarFields.cultivar_key.pattern.message
		)
		.describe(cultivarFields.cultivar_key.description),
	cultivar_description: zod
		.string()
		.max(
			cultivarFields.cultivar_description.max_length.value,
			cultivarFields.cultivar_description.max_length.message
		)
		.describe(cultivarFields.cultivar_description.description),
	cultivar_scientific_name: zod
		.string()
		.max(
			cultivarFields.cultivar_scientific_name.max_length.value,
			cultivarFields.cultivar_scientific_name.max_length.message
		)
		.describe(cultivarFields.cultivar_scientific_name.description),

	/** Frost date planting window profile. */
	last_frost_window_open: zod
		.number()
		.min(
			cultivarFields.last_frost_window_open.min.value,
			cultivarFields.last_frost_window_open.min.message
		)
		.max(
			cultivarFields.last_frost_window_open.max.value,
			cultivarFields.last_frost_window_open.max.message
		)
		.describe(cultivarFields.last_frost_window_open.description),
	last_frost_window_close: zod
		.number()
		.min(
			cultivarFields.last_frost_window_close.min.value,
			cultivarFields.last_frost_window_close.min.message
		)
		.max(
			cultivarFields.last_frost_window_close.max.value,
			cultivarFields.last_frost_window_close.max.message
		)
		.describe(cultivarFields.last_frost_window_close.description),
	first_frost_window_open: zod
		.number()
		.min(
			cultivarFields.first_frost_window_open.min.value,
			cultivarFields.first_frost_window_open.min.message
		)
		.max(
			cultivarFields.first_frost_window_open.max.value,
			cultivarFields.first_frost_window_open.max.message
		)
		.describe(cultivarFields.first_frost_window_open.description),
	first_frost_window_close: zod
		.number()
		.min(
			cultivarFields.first_frost_window_close.min.value,
			cultivarFields.first_frost_window_close.min.message
		)
		.max(
			cultivarFields.first_frost_window_close.max.value,
			cultivarFields.first_frost_window_close.max.message
		)
		.describe(cultivarFields.first_frost_window_close.description),

	/** Origin profile. */
	transplantable: zod.boolean().describe(cultivarFields.transplantable.description),

	/** Annual lifecycle profile. */
	seed_to_germ: zod
		.number()
		.min(cultivarFields.seed_to_germ.min.value, cultivarFields.seed_to_germ.min.message)
		.max(cultivarFields.seed_to_germ.max.value, cultivarFields.seed_to_germ.max.message)
		.describe(cultivarFields.seed_to_germ.description),
	germ_to_transplant: zod
		.number()
		.min(
			cultivarFields.germ_to_transplant.min.value,
			cultivarFields.germ_to_transplant.min.message
		)
		.max(
			cultivarFields.germ_to_transplant.max.value,
			cultivarFields.germ_to_transplant.max.message
		)
		.describe(cultivarFields.germ_to_transplant.description),
	germ_to_first_harvest: zod
		.number()
		.min(
			cultivarFields.germ_to_first_harvest.min.value,
			cultivarFields.germ_to_first_harvest.min.message
		)
		.max(
			cultivarFields.germ_to_first_harvest.max.value,
			cultivarFields.germ_to_first_harvest.max.message
		)
		.describe(cultivarFields.germ_to_first_harvest.description),
	first_to_last_harvest: zod
		.number()
		.min(
			cultivarFields.first_to_last_harvest.min.value,
			cultivarFields.first_to_last_harvest.min.message
		)
		.max(
			cultivarFields.first_to_last_harvest.max.value,
			cultivarFields.first_to_last_harvest.max.message
		)
		.describe(cultivarFields.first_to_last_harvest.description)
};
