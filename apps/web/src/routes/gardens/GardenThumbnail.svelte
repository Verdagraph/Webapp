<script lang="ts">
	import type { Garden } from '@vdg-webapp/models';
	import { Button } from '@vdg-webapp/ui';

	type Props = {
		garden: Garden;
	};

	let { garden }: Props = $props();
</script>

<Button.Root
	variant="outline"
	href={`gardens/${garden.id}`}
	class="bg-neutral-2 hover:bg-neutral-3 mx-4 flex h-48 w-64 flex-col justify-around text-xl"
>
	<p class="h-auto max-h-32 w-full max-w-full overflow-hidden text-wrap">
		{garden.name}
	</p>
	<span
		class="bg-primary-3 text-primary-11 max-w-full truncate rounded-md p-1 text-sm italic"
	>
		{garden.id}
	</span>
</Button.Root>
