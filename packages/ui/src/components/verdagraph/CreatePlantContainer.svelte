<script lang="ts">
	import {
		type Geometry,
		type GeometryUpdateCommand,
		type Position,
		historySelect
	} from '@vdg-webapp/models';

	import { Plant } from '$components';

	import { getVerdagraphContext } from './verdagraphContext.svelte';

	type Props = {
		workspaceId: string;
		plantIdx: number;
	};
	let { workspaceId, plantIdx }: Props = $props();

	/** Contexts.*/
	const verdagraphContext = getVerdagraphContext();
	const canvas = verdagraphContext.layoutCanvasContext;
	const form = verdagraphContext.plantsCreateForm.form;

	let plant = $derived(form.data.plants[plantIdx]);
	let location = $derived.by(() => {
		if (!plant || !plant.locationHistory) {
			return null;
		}

		return historySelect(
			plant.locationHistory.locations,
			verdagraphContext.timeline.focusUtc,
			true
		);
	});
	let geometry = $derived.by(() => {
		if (!plant || !plant.geometryHistory) {
			return null;
		}

		return historySelect(
			plant.geometryHistory.geometries,
			verdagraphContext.timeline.focusUtc,
			true
		);
	});

	/**
	 * Tracks the position in the location history at the
	 * focused time and in this workspace in the timeline selection.
	 */
	let position: Position | null = $derived.by(() => {
		if (!location || location.workspaceId !== workspaceId) {
			return null;
		}

		return { x: location.coordinate.x, y: location.coordinate.y };
	});

	/**
	 * `location`/`geometry` above are live references obtained via
	 * `historySelect(..., true)` into the objects actually sitting inside
	 * `form.data` - since that's a Svelte 5 `$state` proxy (deeply reactive,
	 * unlike a superforms store), mutating a property directly on them here
	 * is itself the correct way to trigger reactivity and persist the change.
	 */
	function onTranslate(newPos: Position) {
		const plant = form.data.plants[plantIdx];
		if (!plant?.locationHistory) {
			return;
		}
		const loc = historySelect(
			plant.locationHistory.locations,
			verdagraphContext.timeline.focusUtc,
			true
		);
		if (!loc) {
			return;
		}
		loc.coordinate = {
			x: canvas.transform.modelXPos(newPos.x),
			y: canvas.transform.modelYPos(newPos.y)
		};
	}

	function onTransform(newGeometry: GeometryUpdateCommand) {
		const plant = form.data.plants[plantIdx];
		if (!plant?.geometryHistory) {
			return;
		}
		const geom = historySelect(
			plant.geometryHistory.geometries,
			verdagraphContext.timeline.focusUtc,
			true
		);
		if (!geom) {
			return;
		}

		if (newGeometry.rectangleLength) {
			geom.rectangleLength = newGeometry.rectangleLength;
		}
		if (newGeometry.rectangleWidth) {
			geom.rectangleWidth = newGeometry.rectangleWidth;
		}
		if (newGeometry.polygonNumSides) {
			geom.polygonNumSides = newGeometry.polygonNumSides;
		}
		if (newGeometry.polygonRadius) {
			geom.polygonRadius = newGeometry.polygonRadius;
		}
		if (newGeometry.ellipseLength) {
			geom.ellipseLength = newGeometry.ellipseLength;
		}
		if (newGeometry.ellipseWidth) {
			geom.ellipseWidth = newGeometry.ellipseWidth;
		}
		if (newGeometry.linesCoordinates) {
			geom.linesCoordinates = newGeometry.linesCoordinates;
		}
	}
</script>

<!--
@component
Renders a plant in the canvas representing 
a plant in the plants creation form.
-->
{#if geometry}
	<Plant
		canvasId={canvas.canvasId}
		name={plant.cultivarName}
		showName={true}
		{position}
		geometry={geometry as Geometry}
		editable={true}
		selected={true}
		{onTranslate}
		{onTransform}
	/>
{/if}
