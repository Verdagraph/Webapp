import { type BulkInsert } from '@triplit/client';

import { schema } from '@vdg-webapp/models';

import { garden } from './garden';

const cultivarCollectionId = 'cultivar-collection';

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
		cultivars: [
			{
				collectionId: cultivarCollectionId,
				name: 'lettuce',
				abbreviation: 'Le',
				attributes: {
					annualLifeCycle: {
						sowToGerm: 10,
						germToTransplant: 30,
						germToFirstHarvest: 120,
						firstToLastHarvest: 24,
						lastHarvestToExpiry: 14
					},
					color: {
						baseColor: '#46A758',
						outlineColor: '#71D083',
						textColor: '#C2F0C2'
					},
					frostDatePlantingWindows: {
						firstFrostWindowOpen: 60,
						firstFrostWindowClose: 60,
						lastFrostWindowOpen: 60,
						lastFrostWindowClose: 60
					},
					origin: {
						transplantable: true
					},
					expectedGeometry: {
						geometryType: 'ELLIPSE',
						seedSize: 0.01,
						seedlingSize: 0.045,
						firstHarvestSize: 0.405,
						lastHarvestSize: 0.45,
						expirySize: 0.45
					}
				}
			}
		]
	};
}
