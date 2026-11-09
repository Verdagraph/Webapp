import { type BulkInsert } from '@triplit/client';

import { type Environment, schema } from '@vdg-webapp/models';

import { garden } from './garden';

export const environment: Environment = {
	id: 'garden-environment',
	name: 'Garden',
	description: '',
	parentType: 'GARDEN',
	gardenId: garden.id,
	inherit: true,
	attributes: {
		frostDates: {
			lastFrostDate: new Date(2026, 3, 15),
			firstFrostDate: new Date(2026, 10, 1)
		},
		annualTemperature: {
			minimum: -10,
			maximum: 10
		}
	}
};

export const greenhouseEnvironment: Environment = {
	id: 'workspace-environment',
	name: 'Workspace (Greenhouse)',
	description: 'A sheltered workspace with earlier last and later first frost.',
	parentType: 'WORKSPACE',
	gardenId: garden.id,
	workspaceIds: new Set(['workspaceId']),
	inherit: false,
	attributes: {
		frostDates: {
			lastFrostDate: new Date(2026, 2, 1),
			firstFrostDate: new Date(2026, 11, 15)
		}
	}
};

export default function environmentSeed(): BulkInsert<typeof schema> {
	return {
		environments: [environment, greenhouseEnvironment]
	};
}
