import type { Component } from 'svelte';

import { type PlantObservation, type PlantObservationId } from '@vdg-webapp/models';

import ObservationPlantGenericInfopoint from './ObservationPlantGenericInfopoint.svelte';

export const PlantObservationPopupContentComponents: Record<
	PlantObservationId,
	Component<{ observation: PlantObservation }>
> = {
	'plant-seed': ObservationPlantGenericInfopoint,
	'plant-germ': ObservationPlantGenericInfopoint,
	'plant-harvest': ObservationPlantGenericInfopoint,
	'plant-expiry': ObservationPlantGenericInfopoint,
	'plant-dormancy-enter': ObservationPlantGenericInfopoint,
	'plant-growth-enter': ObservationPlantGenericInfopoint,
	'plant-flower': ObservationPlantGenericInfopoint
};
