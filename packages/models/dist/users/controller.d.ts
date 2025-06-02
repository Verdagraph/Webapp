import { type User } from '@vdg-webapp/models';
import type { ControllerContext } from '../controller.js';
/**
 * Fetches the client's Account and Profile objects.
 * If the client fails to authenticate, an access refresh is attempted.
 * If this fails, an AppError is raised.
 * @returns The client.
 */
export declare const getClientOrError: (ctx: ControllerContext) => Promise<User>;
//# sourceMappingURL=controller.d.ts.map