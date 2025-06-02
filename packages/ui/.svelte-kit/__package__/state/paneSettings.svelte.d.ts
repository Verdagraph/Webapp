import { Resizable } from '../core';
export declare function createPaneSettings<Panes extends string[]>(id: string, initialEnabled: Panes[number][], initialDirection: Resizable.Direction): {
    direction: Resizable.Direction;
    isEnabled: (pane: Panes[number]) => boolean;
    enable: (pane: Panes[number]) => void;
    disable: (pane: Panes[number]) => void;
    reset: () => void;
};
export type PaneSettings = ReturnType<typeof createPaneSettings>;
//# sourceMappingURL=paneSettings.svelte.d.ts.map