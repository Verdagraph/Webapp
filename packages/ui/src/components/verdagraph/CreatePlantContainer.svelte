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
	const { form: formData } = verdagraphContext.plantsCreateForm.form;

	let plant = $derived($formData.plants[plantIdx]);
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
	 * the form store - but mutating them directly (`location.coordinate = ...`)
	 * only mutates the plain JS object, it never calls the store's own
	 * `.set()`/`.update()`. Superforms relies on that notification (e.g. to
	 * resync its `dataType: 'json'` hidden-input snapshot used at submit
	 * time), so a direct mutation is invisible to it even though reading
	 * `$formData` back immediately afterwards appears to reflect the change.
	 * Routing the same mutation through `formData.update(...)` re-derives
	 * the reference from the fresh store value and ensures the store
	 * actually notifies, so the change survives submission.
	 */
	function onTranslate(newPos: Position) {
		formData.update(($form) => {
			const plant = $form.plants[plantIdx];
			if (!plant?.locationHistory) {
				return $form;
			}
			const loc = historySelect(
				plant.locationHistory.locations,
				verdagraphContext.timeline.focusUtc,
				true
			);
			if (!loc) {
				return $form;
			}
			loc.coordinate = {
				x: canvas.transform.modelXPos(newPos.x),
				y: canvas.transform.modelYPos(newPos.y)
			};
			return $form;
		});
	}

	function onTransform(newGeometry: GeometryUpdateCommand) {
		formData.update(($form) => {
			const plant = $form.plants[plantIdx];
			if (!plant?.geometryHistory) {
				return $form;
			}
			const geom = historySelect(
				plant.geometryHistory.geometries,
				verdagraphContext.timeline.focusUtc,
				true
			);
			if (!geom) {
				return $form;
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
			return $form;
		});
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
