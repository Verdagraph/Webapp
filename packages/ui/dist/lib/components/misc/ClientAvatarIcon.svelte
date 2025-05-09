<script lang="ts">
	import * as Avatar from '../../../components/ui/avatar';

	type Props = {
		size: string;
		className?: string;
	};
	let {
		size
		// className
	}: Props = $props();
</script>

<Avatar.Root class="h-[{size}] w-[{size}]">
	<Avatar.Image src="" alt="" />
	<Avatar.Fallback>CN</Avatar.Fallback>
</Avatar.Root>
