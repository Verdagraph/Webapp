import type { Vector2d } from 'konva/lib/types';
import { type CanvasContainer } from './container.svelte';
import { type CanvasTransform } from './transform.svelte';
type GridManagerPersistedState = {
    snapToGrid: boolean;
    rightAngleConstraint: boolean;
    metersPerBackgroundGridline: number;
};
export declare function createCanvasGridManager(container: CanvasContainer, transform: CanvasTransform): {
    config: GridManagerPersistedState;
    initialize: () => void;
    snapToGrid: (pos: Vector2d) => Vector2d;
};
export default createCanvasGridManager;
export type CanvasGridManager = ReturnType<typeof createCanvasGridManager>;
//# sourceMappingURL=grid.svelte.d.ts.map