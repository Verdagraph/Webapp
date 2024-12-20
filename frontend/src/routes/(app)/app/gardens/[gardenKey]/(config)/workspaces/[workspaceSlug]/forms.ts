import { useAsync } from '$components/forms';
import { plantingAreaCreate } from '$data/workspaces/commands';
import { superForm, defaults } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export function createPlantingAreaCreateForm() {
	const handler = useAsync(plantingAreaCreate.mutation);
	const form = superForm(defaults(zod(plantingAreaCreate.schema)), {
		SPA: true,
		dataType: 'json',
		validators: zod(plantingAreaCreate.schema),
		onUpdate({ form }) {
			if (form.valid) {
				handler.execute(form.data);
			}
		},
		onChange() {
			handler.reset();
		}
	});
	return { handler, form };
}
export type PlantingAreaCreateForm = ReturnType<typeof createPlantingAreaCreateForm>;
