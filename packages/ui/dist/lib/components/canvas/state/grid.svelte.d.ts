import { CanvasContainer } from './container.svelte';
import { CanvasTransform } from './transform.svelte';
import type { Vector2d } from 'konva/lib/types';
export declare function createCanvasGridManager(container: CanvasContainer, transform: CanvasTransform): {
    config: any;
    initialize: () => void;
    snapToGrid: (pos: Vector2d) => Vector2d;
};
export default createCanvasGridManager;
export type CanvasGridManager = ReturnType<typeof createCanvasGridManager>;
//# sourceMappingURL=grid.svelte.d.ts.map