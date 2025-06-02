import { TriplitClient as TriplitClientBase } from '@triplit/client';
import { type ActionType, type Garden, type User, schema } from './index.js';
type TriplitClient = TriplitClientBase<typeof schema>;
export declare const CONTROLLER_CONTEXT_ID = "TriplitController";
/**
 * Controller class: singleton interface to the data layer.
 * Passed to controller functions to provide configurable behaviour.
 * @param triplit The Triplit client to perform operations on.
 * @param getClient A function for returning an authenticated user.
 * @returns ControllerContext.
 */
export declare function createController(triplit: TriplitClient, getClient: (triplit: TriplitClient) => Promise<User | null>, disablePermissions?: boolean): {
    triplit: TriplitClient;
    getClient: (triplit: TriplitClient) => Promise<User | null>;
    disablePermissions: boolean;
    getClientOrError: () => Promise<User>;
    requireRole: (gardenId: string, action: ActionType) => Promise<{
        client: User;
        garden: Garden;
    }>;
};
export type ControllerContext = ReturnType<typeof createController>;
export {};
//# sourceMappingURL=controller.d.ts.map