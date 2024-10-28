<script lang="ts">
	import { Button } from '$components/ui/button';

	type Props = {
		gardenKey: string;
		gardenName: string;
	};

	let { gardenKey, gardenName }: Props = $props();
</script>

<Button
	variant="outline"
	href={`gardens/${gardenKey}`}
	class="bg-neutral-2 hover:bg-neutral-3 mx-4 flex h-48 w-64 flex-col justify-around text-xl"
>
	<p class="h-auto max-h-32 w-full max-w-full overflow-hidden text-wrap">
		{gardenName}
	</p>
	<span
		class="bg-primary-3 text-primary-11 max-w-full truncate rounded-md p-1 text-sm italic"
	>
		{gardenKey}
	</span>
</Button>
