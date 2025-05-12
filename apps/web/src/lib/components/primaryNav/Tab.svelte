<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button } from 'bits-ui';
	import type { Snippet } from 'svelte';

	import { Popover, Separator, cn } from '@vdg-webapp/ui';

	import type { PrimaryTabSpec } from './tabs.svelte';

	type Props = {
		spec: PrimaryTabSpec /* Describes the content of the tab. */;
		side: 'top' | 'right' /* The opening direction of the popover. */;
		iconSize: '2rem' | '3rem' /* The size of the trigger button icon. */;
		flipped?: boolean /* If true, the tab is rendered bottom to top. */;
		altIcon?: Snippet /* Allows overriding the trigger icon for the nav menu. */;
	};
	let { spec, side, iconSize, flipped = false, altIcon }: Props = $props();

	let open = $state(false);
</script>

<li class:bg-neutral-3={open} class="hover:bg-neutral-3 w-full">
	<Popover.Root bind:open>
		<Popover.Trigger class="flex h-full w-full items-center justify-center p-2">
			{#if altIcon}
				{@render altIcon()}
			{:else}
				<Icon icon={spec.iconId} width={iconSize} />
			{/if}
		</Popover.Trigger>
		<Popover.Content {side} class="bg-neutral-3 h-auto w-auto max-w-96 p-0">
			<ul class:flex-col-reverse={flipped} class="flex flex-col items-center">
				<!-- Header. -->
				<li class="flex w-full items-center justify-center py-2">
					<span class="font-extralight">{spec.label}</span>
				</li>

				<Separator.Root class="bg-neutral-6" />

				{#each spec.submenuItems ?? [] as item}
					<li class="group h-full w-full">
						<Button.Root
							class="hover:bg-primary-4 flex h-full w-full items-center py-2 {item.iconId
								? 'justify-start'
								: 'justify-center'} {flipped
								? 'group-last:rounded-t-md'
								: 'group-last:rounded-b-md'}"
							href={item.url}
						>
							{#if item.iconId}
								<Icon icon={item.iconId} class="mx-2" width="2rem" />
							{/if}
							<span class={cn(item.className, 'mx-2')}>
								{item.label}
							</span>
						</Button.Root>
					</li>
				{/each}
			</ul>
		</Popover.Content>
	</Popover.Root>
</li>
