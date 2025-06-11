import { type ControllerContext } from '@vdg-webapp/models';
import { type ActionType } from '@vdg-webapp/models';
/**
 * Holds context for a garden,
 * allowing UI elements to be rendered based on a user's
 * level of permissions.
 */
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