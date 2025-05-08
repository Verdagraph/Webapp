<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button } from 'bits-ui';
	import * as Drawer from '$lib/components/ui/drawer';
	import iconIds from '../../../assets/icons';
	import { Accordion } from 'bits-ui';
	import type { PrimaryTabSpec } from './tabs.svelte';

	type Props = {
		gardenTabs: PrimaryTabSpec[] /* Describes the content of the tab. */;
	};
	let { gardenTabs }: Props = $props();

	let open = $state(false);
</script>

<!--
@component
Single tab for navigating between feature domains on the main bottom bar.
-->

<li class="hover:bg-neutral-3 w-full">
	<Drawer.Root direction="bottom" bind:open>
		<Drawer.Trigger class="flex h-full w-full items-center justify-center p-2">
			<Icon icon={iconIds.gardenDrawerIcon} width="3rem" />
		</Drawer.Trigger>
		<Drawer.Content class="bg-neutral-3 flex items-center">
			<Accordion.Root type="single" class="w-full">
				{#each gardenTabs ?? [] as spec}
					{#if spec !== undefined}
						<Accordion.Item value={spec.label} class="mx-12 w-full">
							<Accordion.Header>
								<Accordion.Trigger class="my-6 flex w-full items-center justify-start">
									<Icon icon={spec.iconId} width="1.5rem" class="mr-6" />
									<span>
										{spec.label}
									</span>
								</Accordion.Trigger>
							</Accordion.Header>
							<Accordion.Content class="border-neutral-10 mx-4 border-l">
								<ul class="px-4">
									{#if spec.submenuItems}
										{#each spec.submenuItems ?? [] as item}
											<li>
												<Button.Root
													href={item.url}
													class="my-4 flex items-center"
													on:click={() => {
														open = false;
													}}
												>
													{#if item.iconId}
														<Icon icon={item.iconId} width="1rem" class="mr-4" />
													{/if}
													<span class={item.className ?? ''}>
														{item.label}
													</span>
												</Button.Root>
											</li>
										{/each}
									{/if}
								</ul>
							</Accordion.Content>
						</Accordion.Item>
					{/if}
				{/each}
			</Accordion.Root>
		</Drawer.Content>
	</Drawer.Root>
</li>
