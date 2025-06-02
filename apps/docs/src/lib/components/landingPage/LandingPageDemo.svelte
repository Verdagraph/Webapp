<script lang="ts">
	import { Carousel } from '@vdg-webapp/ui';

	import examples from './examples';
</script>

<Carousel.Root
	class="border-neutral-3 bg-neutral-2 mt-6 overflow-hidden rounded-[4px] border shadow-lg"
>
	<Carousel.Content class="">
		{#each examples as example}
			<Carousel.Item class="">
				<example.component />
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<!--
		<Carousel.Previous />
		<Carousel.Next />
	-->
</Carousel.Root>
