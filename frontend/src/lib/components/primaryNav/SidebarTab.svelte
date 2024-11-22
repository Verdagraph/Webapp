<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PrimaryTabSpec } from './tabs';
	import * as Popover from '$components/ui/popover'
	import { Button } from 'bits-ui';
	import { Tooltip } from '$components/ui/tooltip';
	import type { Snippet } from 'svelte';

	type Props = {
		spec: PrimaryTabSpec /* Describes the content of the tab. */;
		flipped?: boolean /* If true, the tab is rendered bottom to top. */;
		altIcon?: Snippet /* Allows overriding the trigger icon for the nav menu. */
	};
	let { spec, flipped = false, altIcon }: Props = $props();
</script>

<li class="hover:bg-neutral-3">
	<Popover.Root>
		<Popover.Trigger class="flex h-full w-full items-center p-2">
			{#if altIcon}
			{@render altIcon()}
			{:else}
			<Icon icon={spec.iconId} width="2rem" />
			{/if}
		</Popover.Trigger>
		<Popover.Content side="right" class="bg-neutral-3 z-50">
			<ul class:flex-col-reverse={flipped} class="flex flex-col items-center">
				<!-- Header. -->
				<li class="bg-neutral-4 flex w-full items-center">
					<span
						class="hover:bg-primary-5 flex w-full justify-center px-4 py-2 transition-colors"
						>{spec.label}</span
					>
				</li>


				{#each spec.submenuItems ?? [] as item}
				<li>

					<Button.Root href={item.url}>
						{#if item.iconId}
						<Icon icon={item.iconId} width="2rem" />
						{/if}
						<span class={item.className}>
							{item.label}
						</span>
					</Button.Root>
				</li>
				{/each}
			</ul>
		</Popover.Content>
	</Popover.Root>
</li>