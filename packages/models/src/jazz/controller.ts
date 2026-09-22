import type { Db } from 'jazz-tools/backend';

import { AppError } from '../errors.js';
import { type ActionType, requiredRole } from '../permissions.js';
import { type JazzGarden } from './gardens/schema.js';
import { isUserAuthorized } from './gardens/utils.js';
import { type JazzApp, jazzApp } from './schema.js';
import { type JazzUser } from './users.js';

/** Descriptive alias for the Jazz runtime database type. */
export type JazzDb = Db;

export const CONTROLLER_CONTEXT_ID = 'JazzController';

export type ControllerContextParams = {
	db: JazzDb;
	jazz: JazzApp;
	/** Returns the currently authenticated user, or null if unauthenticated. */
	getClient: (db: JazzDb) => Promise<JazzUser | null>;
};

/**
 * Controller class: singleton interface to the Jazz data layer.
 * Passed to controller functions to provide configurable behaviour.
 * @param params.db The Jazz Db instance.
 * @param params.jazz The app schema proxy with table query builders.
 * @param params.getClient A function for returning an authenticated user.
 * @returns ControllerContext.
 */
export function createController(params: ControllerContextParams) {
	/**
	 * Fetches the client's user object.
	 * If the client fails to authenticate, an AppError is raised.
	 * @returns The authenticated user.
	 */
	async function getClientOrError(): Promise<JazzUser> {
		const client = await params.getClient(params.db);
		if (client) return client;
		throw new AppError('Authentication failed.', {
			nonFormErrors: ['Authentication failed. A login is required.']
		});
	}

	/**
	 * Given a garden and an action, retrieve the client
	 * and throw an error if the client does not have at least that role.
	 * @param gardenSlug The garden's user-facing slug (not its Jazz row id).
	 * @param action The action to authorize for.
	 * @returns The client and garden objects.
	 */
	async function requireRole(
		gardenSlug: string,
		action: ActionType
	): Promise<{
		client: JazzUser;
		garden: JazzGarden;
	}> {
		const client = await getClientOrError();

		const garden = await params.db.one(params.jazz.gardens.where({ slug: gardenSlug }));
		if (garden == null) {
			throw new AppError('Garden key does not exist.', {
				nonFormErrors: ['Garden key does not exist.']
			});
		}

		const role = requiredRole(action);
		if (!isUserAuthorized(garden, client.profile.id, role)) {
			throw new AppError(`Requires ${role} access.`, {
				nonFormErrors: [`This action requires the ${role} role.`]
			});
		}

		return { client, garden };
	}

	/**
	 * Same as requireRole, but keyed by the garden's Jazz row id rather than
	 * its user-facing slug. Needed when the garden id is already known from a
	 * fetched row (e.g. a plant's gardenId ref) rather than from a route.
	 * @param gardenId The garden's Jazz row id.
	 * @param action The action to authorize for.
	 * @returns The client and garden objects.
	 */
	async function requireRoleForGardenId(
		gardenId: string,
		action: ActionType
	): Promise<{
		client: JazzUser;
		garden: JazzGarden;
	}> {
		const client = await getClientOrError();

		const garden = await params.db.one(params.jazz.gardens.where({ id: gardenId }));
		if (garden == null) {
			throw new AppError('Garden key does not exist.', {
				nonFormErrors: ['Garden key does not exist.']
			});
		}

		const role = requiredRole(action);
		if (!isUserAuthorized(garden, client.profile.id, role)) {
			throw new AppError(`Requires ${role} access.`, {
				nonFormErrors: [`This action requires the ${role} role.`]
			});
		}

		return { client, garden };
	}

	return {
		db: params.db,
		jazz: params.jazz,
		getClient: params.getClient,
		getClientOrError,
		requireRole,
		requireRoleForGardenId
	};
}
export type ControllerContext = ReturnType<typeof createController>;

export { jazzApp };
