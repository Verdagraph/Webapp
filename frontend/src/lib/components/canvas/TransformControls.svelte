<script lang="ts">
	import Icon from '@iconify/svelte';
	import iconIds from '$lib/assets/icons';
	import { getContext } from 'svelte';
	import type { CanvasContext } from './state';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { isMobile } from '$state/isMobile.svelte';
	import { LocalStore } from '$state/localStore.svelte';

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
		buttonsDirection: Direction;
		showScale: boolean;
		scalePosition: CanvasCorner;
		showOriginIndicator: boolean;
	};

	const defaultButtonPosition: CanvasCorner = isMobile() ? 'br' : 'bl';
	const defaultButtonDirection: Direction = isMobile() ? 'vertical' : 'horizontal';
	const defaultScalePosition: CanvasCorner = isMobile() ? 'bl' : 'br';

	let config = new LocalStore<TransformControlsPersistedState>('layoutControls', {
		showButtons: true,
		buttonsExpanded: true,
		buttonsPosition: defaultButtonPosition,
		buttonsDirection: defaultButtonDirection,
		showScale: true,
		scalePosition: defaultScalePosition,
		showOriginIndicator: true
	});

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

	let collapsibleFlexDirection = $derived.by(() => {
		switch (config.value.buttonsDirection) {
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

	let collapsibleTriggerRotation = $derived.by(() => {
		switch (config.value.buttonsDirection) {
			case 'horizontal':
				switch (config.value.buttonsPosition) {
					case 'bl':
						return config.value.buttonsExpanded ? 'rotation-0' : 'rotation-180';
					case 'br':
						return config.value.buttonsExpanded ? 'rotation-180' : 'rotation-0';
					case 'tl':
						return config.value.buttonsExpanded ? 'rotation-0' : 'rotation-180';
					case 'tr':
						return config.value.buttonsExpanded ? 'rotation-180' : 'rotation-0';
				}
			case 'vertical':
				switch (config.value.buttonsPosition) {
					case 'bl':
						return config.value.buttonsExpanded ? 'rotation-90' : 'rotation-270';
					case 'br':
						return config.value.buttonsExpanded ? 'rotation-90' : 'rotation-270';
					case 'tl':
						return config.value.buttonsExpanded ? 'rotation-270' : 'rotation-90';
					case 'tr':
						return config.value.buttonsExpanded ? 'rotation-270' : 'rotation-90';
				}
		}
	});
</script>

<div class="flex h-full w-full p-2 {collapsibleFlexPositioning}">
	<Collapsible.Root
		bind:open={config.value.buttonsExpanded}
		class="z-50 flex {collapsibleFlexDirection} items-center justify-start gap-2"
	>
		<Collapsible.Trigger>
			<Button
				variant="outline"
				size="xsm"
				class="hover:bg-secondary-5 hover:text-secondary-12 flex items-center justify-center"
			>
				<Icon
					icon={'material-symbols:double-arrow'}
					width="3rem"
					class="{collapsibleTriggerRotation} transition-transform"
				/>
			</Button>
		</Collapsible.Trigger>
		<Collapsible.Content>Content</Collapsible.Content>
	</Collapsible.Root>
</div>
