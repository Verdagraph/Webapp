import { Resizable } from '$core';

import { localStore } from './localStore.svelte';

export function createPaneSettings<Panes extends string[]>(
	id: string,
	initialEnabled: Panes[number][],
	initialDirection: Resizable.Direction
) {
	type Pane = Panes[number];
	type Settings = { enabled: Set<Pane>; direction: Resizable.Direction };

	const settings = localStore<Settings>(id, {
		enabled: new Set(initialEnabled),
		direction: initialDirection
	});

	function isEnabled(pane: Pane) {
		return settings.value.enabled.has(pane);
	}

	function enable(pane: Pane) {
		if (!settings.value.enabled.has(pane)) {
			settings.value.enabled.add(pane);
		}
	}

	function disable(pane: Pane) {
		if (settings.value.enabled.has(pane) && settings.value.enabled.size > 1) {
			settings.value.enabled.delete(pane);
		}
	}

	function reset() {
		settings.value.enabled.clear();
		initialEnabled.forEach((pane) => {
			settings.value.enabled.add(pane);
		});
	}

	return {
		get direction() {
			return settings.value.direction;
		},
		isEnabled,
		enable,
		disable,
		reset
	};
}
export type PaneSettings = ReturnType<typeof createPaneSettings>;
