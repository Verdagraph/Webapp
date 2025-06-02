import { Resizable } from '../core';
/**
 * Stores context for a set of resizable panes:
 * Which panes are enabled.
 * Their direction.
 *
 * @param id The ID to use for local storage.
 * @param initialEnabled The panes that are initially enabled.
 * @param initialDirection The initial direction of the panes.
 * @returns The pane settings.
 */
export declare function createPaneSettings<Panes extends string[]>(id: string, initialEnabled: Panes[number][], initialDirection: Resizable.Direction): {
    direction: Resizable.Direction;
    isEnabled: (pane: Panes[number]) => boolean;
    enable: (pane: Panes[number]) => void;
    disable: (pane: Panes[number]) => void;
    reset: () => void;
};
export type PaneSettings = ReturnType<typeof createPaneSettings>;
//# sourceMappingURL=paneSettings.svelte.d.ts.map