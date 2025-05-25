<script lang="ts">
	import { TriplitClient } from '@triplit/client';
	import { setContext } from 'svelte';

	import {
		CONTROLLER_CONTEXT_ID,
		type User,
		createController,
		roles,
		schema
	} from '@vdg-webapp/models';
	import { setSettingsContext } from '@vdg-webapp/ui';

	import { demos } from './demos';
	import { user } from './demos/seed';

	const triplit = new TriplitClient({ schema, roles, autoConnect: false });
	async function getClient(triplitClient: typeof triplit) {
		return { account: user.account, profile: user.profile };
	}
	const controller = createController(triplit, getClient);

	/** Set settings context and controller context. */
	setContext(CONTROLLER_CONTEXT_ID, controller);
	setSettingsContext();
</script>
