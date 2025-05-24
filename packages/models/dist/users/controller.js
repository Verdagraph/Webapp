import { AppError } from '@vdg-webapp/models';
/**
 * Fetches the client's Account and Profile objects.
 * If the client fails to authenticate, an access refresh is attempted.
 * If this fails, an AppError is raised.
 * @returns The client.
 */
export const getClientOrError = async (ctx) => {
    /** Return the client if authenticated. */
    const client = await ctx.getClient(ctx.triplit);
    if (client) {
        return client;
    }
    throw new AppError('Authentication failed.', {
        nonFormErrors: ['Authentication failed. A login is required.']
    });
};
//# sourceMappingURL=controller.js.map