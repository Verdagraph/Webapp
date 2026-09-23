import { getContext, setContext } from 'svelte';

import { createClientContext } from './client.svelte';
import { createCultivarContext } from './cultivarContext.svelte';
import { createEnvironmentContext } from './environmentContext.svelte';
import { createGardenContext } from './gardenContext.svelte';
import { createJazzCommands } from './jazzController.svelte';
import { createPlantsContext } from './plantsContext.svelte';
import { createTimelineContext } from './timelineContext.svelte';
import { createSettingsContext } from './userSettings.svelte';
import { createWorkspacesContext } from './workspacesContext.svelte';

const appContextKey = 'appContext';

/**
 * Builds every sub-context an app screen needs, sharing one Commands
 * instance (see jazzController.svelte.ts) for both reads that need a
 * ControllerContext (resolveCultivar) and writes (the 24+ mutation call
 * sites throughout packages/ui/components).
 * @param fetchUsername Supplies a username the first time this session
 * needs to self-provision its public profile row - a REST call in
 * apps/web, a constant in apps/demo.
 */
export function createAppContext(fetchUsername: () => Promise<string>) {
	const controller = setContext('controller', createJazzCommands(fetchUsername));
	const client = setContext('client', createClientContext());
	const settings = setContext('settings', createSettingsContext());
	const timeline = setContext('timeline', createTimelineContext());
	const garden = setContext('garden', createGardenContext());
	const cultivars = setContext('cultivars', createCultivarContext(controller, garden));
	const workspaces = setContext('workspaces', createWorkspacesContext(garden));
	const plants = setContext(
		'plants',
		createPlantsContext(controller, timeline, garden)
	);
	const environments = setContext('environments', createEnvironmentContext(garden));

	return {
		controller,
		client,
		settings,
		timeline,
		garden,
		cultivars,
		workspaces,
		plants,
		environments
	};
}
export type AppContext = ReturnType<typeof createAppContext>;

export function setAppContext(fetchUsername: () => Promise<string>) {
	return setContext(appContextKey, createAppContext(fetchUsername));
}

export function getAppContext() {
	return getContext<AppContext>(appContextKey);
}
