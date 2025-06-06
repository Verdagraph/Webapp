import { type ControllerContext } from '@vdg-webapp/models';
import { type ActionType } from '@vdg-webapp/models';
export declare function createGardenContext(controller: ControllerContext): {
    id: string;
    readonly role: any;
    authorize: (action: ActionType) => boolean;
};
export type GardenContext = ReturnType<typeof createGardenContext>;
export declare function setGardenContext(controller: ControllerContext): {
    id: string;
    readonly role: any;
    authorize: (action: ActionType) => boolean;
};
export declare function getGardenContext(): {
    id: string;
    readonly role: any;
    authorize: (action: ActionType) => boolean;
};
//# sourceMappingURL=gardenContext.svelte.d.ts.map