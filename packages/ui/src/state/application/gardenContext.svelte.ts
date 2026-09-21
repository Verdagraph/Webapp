import { QuerySubscriptionOne, getSession } from 'jazz-tools/svelte';

import {
	type ActionType,
	type GardenRole,
	requiredRole as getRequiredRole
} from '@vdg-webapp/models';
import { jazzApp } from '@vdg-webapp/models/jazz';

/**
 * Holds context for a garden,
 * allowing UI elements to be rendered based on a user's
 * level of permissions.
 *
 * Jazz v2 validation spike: reads through Jazz instead of Triplit. `id` is
 * the garden's user-facing slug (not its Jazz row id — see
 * packages/models/src/jazz/SPIKE_NOTES.md). Identity for role checks comes
 * from the Jazz session (`session.user.account`, a Jazz-native account
 * UUID), not the Triplit `ClientContext` the rest of the app still uses.
 */
export function createGardenContext() {
	let id = $state('');
	const session = getSession();
	const gardenQuery = new QuerySubscriptionOne(() =>
		id ? jazzApp.gardens.where({ slug: id }) : undefined
	);
	const garden = $derived(gardenQuery.current ?? null);
	const role: GardenRole | null = $derived.by(() => {
		const accountId = session.current?.user.account;
		if (!accountId || !garden) {
			return null;
		}

		if (garden.adminIds.includes(accountId)) {
			return 'ADMIN';
		} else if (garden.editorIds.includes(accountId)) {
			return 'EDITOR';
		} else if (garden.viewerIds.includes(accountId)) {
			return 'VIEWER';
		}

		return null;
	});

	/**
	 * Returns whether the user can take an action on the active garden.
	 * @param action The action to check.
	 * @returns If true, the user is authorized.
	 */
	function authorize(action: ActionType): boolean {
		/** False for a null garden or user role. */
		if (id === null || role === null) {
			return false;
		}

		const requiredRole = getRequiredRole(action);
		if (requiredRole === 'ADMIN' && role === 'ADMIN') {
			return true;
		} else if (requiredRole === 'EDITOR' && (role === 'ADMIN' || role === 'EDITOR')) {
			return true;
		} else if (
			requiredRole === 'VIEWER' &&
			(role === 'ADMIN' || role === 'EDITOR' || role === 'VIEWER')
		) {
			return true;
		} else {
			return false;
		}
	}

	return {
		get id() {
			return id;
		},
		get role() {
			return role;
		},
		set id(newVal) {
			id = newVal;
		},
		authorize
	};
}
export type GardenContext = ReturnType<typeof createGardenContext>;
