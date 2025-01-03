<script lang="ts">
	import Konva from 'konva';
	import { getShape, type SupportedShape } from '../utils';
	import { getContext, onMount } from 'svelte';
	import type { CanvasContext } from '../state';
	import { plantingAreaLayerId } from './consts';
	import { getColor } from '$lib/utils';
	import mode from '$state/theme.svelte';
	import {
		historySelect,
		type LocationHistory,
		type Geometry,
		type GeometryTypeEnum,
		type GridAttributes,
		type Location,
		type Coordinate
	} from '@vdt-webapp/common';
	import { getLocalTimeZone, type DateValue } from '@internationalized/date';
	import { WorkspaceContext } from '../../../../routes/(app)/app/gardens/[gardenKey]/(config)/workspaces/activeWorkspace.svelte';

	/** Props. */
	type Props = {
		/** The ID of the canvas. */
		canvasId: string;
		/** The ID of the workspace context. */
		workspaceContextId: string;
		/** The ID of the planting area. */
		plantingAreaId: string;
		/** The current date at which to render the PlantingArea. */
		currentDate: DateValue;
	};
	let { canvasId, plantingAreaId, currentDate }: Props = $props();

	/** Retrieve workspace context. */
	const workspaceContext = getContext<WorkspaceContext>();

	/** Retrieve canvas and initialize Konva constructs. */
	const canvas = getContext<CanvasContext>(canvasId);
	const layer = canvas.container.getLayer(plantingAreaLayerId);
	const group: Konva.Group = new Konva.Group({ draggable: true });
	layer.add(group);

	/**
	 * Initialization.
	 */
	onMount(() => {
		if (position) {
			group.position({
				x: canvas.transform.canvasXPos(position.x),
				y: canvas.transform.canvasYPos(position.y)
			});
			group.visible(true);
		} else {
			group.visible(false);
		}

		plantingAreaShape = getShape(canvas, plantingArea.geometry, {
			stroke: getColor('neutral', 9, mode.value),
			fill: getColor('neutral', 4, mode.value)
		});
		group.add(plantingAreaShape);
	});
</script>
