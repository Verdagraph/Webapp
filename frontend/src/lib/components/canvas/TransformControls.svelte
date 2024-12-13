<script lang="ts">
	import Icon from '@iconify/svelte';
	import iconIds from '$lib/assets/icons';
	import { getContext } from 'svelte';
	import type { CanvasContext } from './state';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { isMobile } from '$state/isMobile.svelte';
	import { LocalStore } from '$state/localStore.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	/** Props. */
	type Props = {
		canvasId: string;
	};
	let { canvasId }: Props = $props();

	let canvas = getContext<CanvasContext>(canvasId);

	/**
	 * Indicates a corner of the canvas.
	 * tl - top left.
	 * tr - top right.
	 * br - bottom right.
	 * bl - bottom left.
	 */
	type CanvasCorner = 'tl' | 'tr' | 'br' | 'bl';
	type Direction = 'horizontal' | 'vertical';

	type TransformControlsPersistedState = {
		showButtons: boolean;
		buttonsExpanded: boolean;
		buttonsPosition: CanvasCorner;
		showScale: boolean;
		scalePosition: CanvasCorner;
		showOriginIndicator: boolean;
	};

	const defaultButtonPosition: CanvasCorner = isMobile() ? 'br' : 'bl';
	const defaultScalePosition: CanvasCorner = isMobile() ? 'bl' : 'br';
	const buttonDirectionBreakpoint = 400;

	let config = new LocalStore<TransformControlsPersistedState>('layoutControls', {
		showButtons: true,
		buttonsExpanded: true,
		buttonsPosition: defaultButtonPosition,
		showScale: true,
		scalePosition: defaultScalePosition,
		showOriginIndicator: true
	});

	let buttonsDirection = $derived<Direction>(
		canvas.container.width < buttonDirectionBreakpoint ? 'vertical' : 'horizontal'
	);

	/**
	 * Controls the position of the toolbar within the layout container.
	 */
	let collapsibleFlexPositioning = $derived.by(() => {
		switch (config.value.buttonsPosition) {
			case 'bl':
				return 'justify-start items-end';
			case 'br':
				return 'justify-end items-end';
			case 'tl':
				return 'justify-start items-start';
			case 'tr':
				return 'justify-end items-start';
		}
	});

	/** Controls the order of items in the toolbar. */
	let collapsibleFlexDirection = $derived.by(() => {
		switch (buttonsDirection) {
			case 'horizontal':
				switch (config.value.buttonsPosition) {
					case 'bl':
						return 'flex-row';
					case 'br':
						return 'flex-row-reverse';
					case 'tl':
						return 'flex-row';
					case 'tr':
						return 'flex-row-reverse';
				}
			case 'vertical':
				switch (config.value.buttonsPosition) {
					case 'bl':
						return 'flex-col-reverse';
					case 'br':
						return 'flex-col-reverse';
					case 'tl':
						return 'flex-col';
					case 'tr':
						return 'flex-col';
				}
		}
	});

	/** Controls the alignment of the toolbar to the edge of the container. */
	let collapsibleFlexAlignment = $derived.by(() => {
		switch (buttonsDirection) {
			case 'horizontal':
				switch (config.value.buttonsPosition) {
					case 'bl':
						return 'items-end';
					case 'br':
						return 'items-end';
					case 'tl':
						return 'items-start';
					case 'tr':
						return 'items-start';
				}
			case 'vertical':
				switch (config.value.buttonsPosition) {
					case 'bl':
						return 'items-start';
					case 'br':
						return 'items-end';
					case 'tl':
						return 'items-start';
					case 'tr':
						return 'items-end';
				}
		}
	});

	/** Controls the rotation of the collapsible trigger. */
	let collapsibleTriggerRotation = $derived.by(() => {
		switch (buttonsDirection) {
			case 'horizontal':
				switch (config.value.buttonsPosition) {
					case 'bl':
						return config.value.buttonsExpanded ? 'rotate-180' : 'rotate-10';
					case 'br':
						return config.value.buttonsExpanded ? 'rotate-0' : 'rotate-180';
					case 'tl':
						return config.value.buttonsExpanded ? 'rotate-180' : 'rotate-0';
					case 'tr':
						return config.value.buttonsExpanded ? 'rotate-0' : 'rotate-180';
				}
			case 'vertical':
				switch (config.value.buttonsPosition) {
					case 'bl':
						return config.value.buttonsExpanded ? '-rotate-90' : 'rotate-90';
					case 'br':
						return config.value.buttonsExpanded ? '-rotate-90' : 'rotate-90';
					case 'tl':
						return config.value.buttonsExpanded ? 'rotate-90' : '-rotate-90';
					case 'tr':
						return config.value.buttonsExpanded ? 'rotate-90' : '-rotate-90';
				}
		}
	});
</script>

<div class="flex h-full w-full p-2 {collapsibleFlexPositioning}">
	<Tooltip.Root delayDuration={800}>
		<Collapsible.Root
			bind:open={config.value.buttonsExpanded}
			class="z-50 flex {collapsibleFlexDirection} {collapsibleFlexAlignment} justify-start gap-2"
		>
			<Tooltip.Trigger class="order-last">
				<Collapsible.Trigger>
					<Button
						variant="outline"
						size="xsm"
						class="hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 flex items-center justify-center"
					>
						<Icon
							icon={'material-symbols:double-arrow'}
							width="3rem"
							class="{collapsibleTriggerRotation} text-neutral-11 transition-transform"
						/>
					</Button>
				</Collapsible.Trigger>
			</Tooltip.Trigger>
			<Tooltip.Content>Toggle Layout Controls</Tooltip.Content>
			<Collapsible.Content>
				<div class="flex {collapsibleFlexDirection} {collapsibleFlexAlignment} gap-2">
					<!-- Zoom controls. -->
					<div class="flex">
						<!-- Zoom out.-->
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Button
									onclick={() => {
										canvas.transform.scale(0.9);
									}}
									variant="outline"
									size="xsm"
									class="hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 border-r-neutral-4 flex items-center justify-center rounded-r-none"
								>
									<Icon
										icon={'material-symbols:zoom-out'}
										width="3rem"
										class="text-neutral-11"
									/>
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>Zoom out</Tooltip.Content>
						</Tooltip.Root>
						<!-- Current zoom indicator. -->
						<Tooltip.Root>
							<Tooltip.Trigger>
								<span
									class="bg-neutral-1 text-neutral-11 border-neutral-6 h-6 w-auto border-b border-t px-1 py-0.5"
								>
									{Math.trunc(canvas.transform.scaleFactor * 100)}
									%
								</span>
							</Tooltip.Trigger>
							<Tooltip.Content>Current zoom percentage</Tooltip.Content>
						</Tooltip.Root>
						<!-- Zoom in. -->
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Button
									onclick={() => {
										canvas.transform.scale(1.1);
									}}
									variant="outline"
									size="xsm"
									class="hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 border-l-neutral-4 flex items-center justify-center rounded-l-none"
								>
									<Icon
										icon={'material-symbols:zoom-in'}
										width="3rem"
										class="text-neutral-11"
									/>
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>Zoom in</Tooltip.Content>
						</Tooltip.Root>
					</div>

					<!-- Pan controls. -->
					<div
						class="grid gap-1 {buttonsDirection === 'horizontal'
							? 'grid-cols-3 grid-rows-2'
							: 'grid-cols-2 grid-rows-3'}"
					>
						<!-- Left arrow. -->
						<div
							class={buttonsDirection === 'horizontal'
								? 'order-1 row-span-2 self-center'
								: 'order-2'}
						>
							<Tooltip.Root>
								<Tooltip.Trigger>
									<Button
										onclick={() => {
											canvas.transform.translate({ x: 10, y: 0 });
										}}
										variant="outline"
										size="xsm"
										class="hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 flex items-center justify-center"
									>
										<Icon
											icon={'material-symbols:arrow-back-2'}
											width="3rem"
											class="text-neutral-11"
										/>
									</Button>
								</Tooltip.Trigger>
								<Tooltip.Content>Move Left</Tooltip.Content>
							</Tooltip.Root>
						</div>

						<!-- Up arrow. -->
						<div
							class={buttonsDirection === 'horizontal'
								? 'order-2'
								: 'order-1 col-span-2 justify-self-center'}
						>
							<Tooltip.Root>
								<Tooltip.Trigger>
									<Button
										onclick={() => {
											canvas.transform.translate({ x: 0, y: 10 });
										}}
										variant="outline"
										size="xsm"
										class="hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 flex items-center justify-center"
									>
										<Icon
											icon={'material-symbols:arrow-back-2'}
											width="3rem"
											class="text-neutral-11 rotate-90"
										/>
									</Button>
								</Tooltip.Trigger>
								<Tooltip.Content>Move up</Tooltip.Content>
							</Tooltip.Root>
						</div>

						<!-- Right arrow. -->
						<div
							class={buttonsDirection === 'horizontal'
								? 'order-3 row-span-2 self-center'
								: 'order-3'}
						>
							<Tooltip.Root>
								<Tooltip.Trigger>
									<Button
										onclick={() => {
											canvas.transform.translate({ x: -10, y: 0 });
										}}
										variant="outline"
										size="xsm"
										class="hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 flex items-center justify-center"
									>
										<Icon
											icon={'material-symbols:arrow-back-2'}
											width="3rem"
											class="text-neutral-11 rotate-180"
										/>
									</Button>
								</Tooltip.Trigger>
								<Tooltip.Content>Move right</Tooltip.Content>
							</Tooltip.Root>
						</div>

						<!-- Down arrow. -->
						<div
							class={buttonsDirection === 'horizontal'
								? 'order-4'
								: 'order-4 col-span-2 justify-self-center'}
						>
							<Tooltip.Root>
								<Tooltip.Trigger>
									<Button
										onclick={() => {
											canvas.transform.translate({ x: 0, y: -10 });
										}}
										variant="outline"
										size="xsm"
										class="hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 flex items-center justify-center"
									>
										<Icon
											icon={'material-symbols:arrow-back-2'}
											width="3rem"
											class="text-neutral-11 -rotate-90"
										/>
									</Button>
								</Tooltip.Trigger>
								<Tooltip.Content>Move down</Tooltip.Content>
							</Tooltip.Root>
						</div>
					</div>

					<!-- Home button. -->
					<div>
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Button
									onclick={canvas.transform.reset}
									variant="outline"
									size="xsm"
									class="hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 flex items-center justify-center"
								>
									<Icon
										icon={'material-symbols:home'}
										width="3rem"
										class="text-neutral-11"
									/>
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>Reset layout position</Tooltip.Content>
						</Tooltip.Root>
					</div>

					<!-- Snap to grid button. -->
					<div>
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Button
									variant="outline"
									size="xsm"
									class="hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 flex rotate-180 items-center justify-center"
								>
									<Icon
										icon={'iconoir:magnet-solid'}
										width="3rem"
										class="text-neutral-11"
									/>
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>Toggle snap to grid</Tooltip.Content>
						</Tooltip.Root>
					</div>

					<!-- Toggle vertical and horizontal line constraint. -->
					<div>
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Button
									variant="outline"
									size="xsm"
									class="hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 flex items-center justify-center"
								>
									<Icon icon={'mdi:parallel'} width="3rem" class="text-neutral-11" />
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>Toggle right angle constraint</Tooltip.Content>
						</Tooltip.Root>
					</div>
				</div>
			</Collapsible.Content>
		</Collapsible.Root>
	</Tooltip.Root>
</div>
