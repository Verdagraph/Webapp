import { type BulkInsert } from '@triplit/client';

import { type Cultivar, schema } from '@vdg-webapp/models';

import { garden } from './garden';

const cultivarCollectionId = 'cultivar-collection';

/**
 * Three different crops with three different origins (direct seed,
 * seed-to-transplant, seedling-to-transplant), matched to the same
 * attributes used in packages/models' triplit seed - so the two seed data
 * sets describe the same crops consistently rather than diverging facts
 * about the same cultivar names. Exported individually (rather than only
 * returned from cultivarsSeed) so plants.ts can read `.attributes` straight
 * off them via generateExpectedHistories, the same function the real Add
 * Plants stamp uses.
 */
export const lettuce: Cultivar = {
	id: 'lettuce',
	collectionId: cultivarCollectionId,
	name: 'lettuce',
	abbreviation: 'Le',
	description: 'A fast-growing, cold-hardy leafy green.',
	attributes: {
		annualLifeCycle: {
			sowToGerm: 5,
			germToTransplant: 20,
			germToFirstHarvest: 45,
			firstToLastHarvest: 20,
			lastHarvestToExpiry: 10
		},
		color: { baseColor: '#46A758', outlineColor: '#71D083', textColor: '#1A2E05' },
		frostDatePlantingWindows: {
			lastFrostWindowOpen: -14,
			lastFrostWindowClose: 21,
			firstFrostWindowOpen: -60,
			firstFrostWindowClose: -14
		},
		origin: { transplantable: true },
		expectedGeometry: {
			geometryType: 'ELLIPSE',
			seedSize: 0.01,
			seedlingSize: 0.05,
			firstHarvestSize: 0.3,
			lastHarvestSize: 0.35,
			expirySize: 0.3
		}
	},
	createdAt: new Date()
};
export const tomato: Cultivar = {
	id: 'tomato',
	collectionId: cultivarCollectionId,
	name: 'tomato',
	abbreviation: 'To',
	description: 'A frost-tender fruiting crop, started indoors and transplanted out.',
	attributes: {
		annualLifeCycle: {
			sowToGerm: 7,
			germToTransplant: 35,
			germToFirstHarvest: 80,
			firstToLastHarvest: 60,
			lastHarvestToExpiry: 20
		},
		color: { baseColor: '#E5484D', outlineColor: '#FF9592', textColor: '#641723' },
		frostDatePlantingWindows: {
			lastFrostWindowOpen: 14,
			lastFrostWindowClose: 42,
			firstFrostWindowOpen: -90,
			firstFrostWindowClose: -60
		},
		origin: { transplantable: true },
		expectedGeometry: {
			geometryType: 'RECTANGLE',
			seedSize: 0.02,
			seedlingSize: 0.08,
			firstHarvestSize: 0.6,
			lastHarvestSize: 0.65,
			expirySize: 0.6
		}
	},
	createdAt: new Date()
};
export const carrot: Cultivar = {
	id: 'carrot',
	collectionId: cultivarCollectionId,
	name: 'carrot',
	abbreviation: 'Ca',
	description: 'A direct-seeded root crop that does not transplant well.',
	attributes: {
		annualLifeCycle: {
			sowToGerm: 10,
			germToFirstHarvest: 70,
			firstToLastHarvest: 14,
			lastHarvestToExpiry: 7
		},
		color: { baseColor: '#F76B15', outlineColor: '#FFA057', textColor: '#582D1D' },
		frostDatePlantingWindows: {
			lastFrostWindowOpen: -7,
			lastFrostWindowClose: 28,
			firstFrostWindowOpen: -70,
			firstFrostWindowClose: -20
		},
		origin: { transplantable: false },
		expectedGeometry: {
			geometryType: 'ELLIPSE',
			seedSize: 0.005,
			seedlingSize: 0.02,
			firstHarvestSize: 0.05,
			lastHarvestSize: 0.06,
			expirySize: 0.05
		}
	},
	createdAt: new Date()
};

export default function cultivarsSeed(): BulkInsert<typeof schema> {
	return {
		cultivarCollections: [
			{
				id: cultivarCollectionId,
				gardenId: garden.id,
				name: 'West Coast Seeds',
				slug: 'west-coast-seeds',
				visibility: 'HIDDEN'
			}
		],
		cultivars: [lettuce, tomato, carrot]
	};
}
