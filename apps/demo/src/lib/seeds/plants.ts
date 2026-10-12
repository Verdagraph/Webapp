import { type BulkInsert } from '@triplit/client';

import { buildSeedGardenPlants, schema } from '@vdg-webapp/models';

import { garden } from './garden';
import { user } from './user';
import { workspace } from './workspace';

/**
 * The cultivar/plant/draft-bucket slice is shared with packages/models'
 * triplit dev seed (see packages/models/src/seedData.ts) - both need the
 * same representative data, differing only in the garden/user/workspace
 * scaffolding around it (this demo has just the one garden/user/workspace
 * set up elsewhere in $lib/seeds).
 */
export default function plantsSeed(): BulkInsert<typeof schema> {
	return buildSeedGardenPlants({
		gardenId: garden.id,
		workspaceId: workspace.id,
		draftBucketCreatorId: user.profile.id
	});
}
