<script lang="ts">
	import { Carousel } from '@vdg-webapp/ui';

	import examples from './examples';
</script>

<Carousel.Root class="h-full w-full">
	<Carousel.Content class="h-full w-full">
		{#each examples as example}
			<Carousel.Item class="h-full w-full">
				<example.component />
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<!--
		<Carousel.Previous />
		<Carousel.Next />
	-->
</Carousel.Root>
