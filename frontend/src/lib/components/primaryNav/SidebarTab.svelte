<script lang="ts">
	import Icon from '@iconify/svelte';
	import { NavigationMenu } from 'bits-ui';
	import type { PrimaryTabSpec } from './tabs';

	type Props = {
		spec: PrimaryTabSpec /* Describes the content of the tab. */;
		flipped?: boolean /* If true, the tab is rendered bottom to top. */;
	};
	let { spec, flipped = false }: Props = $props();
</script>

<NavigationMenu.Item>
	<NavigationMenu.Trigger>
		<Icon icon={spec.iconId} width="2rem" />
	</NavigationMenu.Trigger>
	<NavigationMenu.Content class="z-50 bg-white">
		{#each spec.submenuItems ?? [] as item}
			<NavigationMenu.Link href={item.url}>
				{#if item.iconId}
					<Icon icon={item.iconId} width="2rem" />
				{/if}
				<span>
					{item.label}
				</span>
			</NavigationMenu.Link>
		{/each}
	</NavigationMenu.Content>
</NavigationMenu.Item>
