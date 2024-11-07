import { AppError } from '@vdt-webapp/common/src/errors';
import { localStore } from './localStore.svelte';

type AccessInfo = {
	/** Access token. */
	token: string | null;
	/**
	 * Stores the current user's ID.
	 * TODO: Retrieve this on login/refresh.
	 */
	clientAccountId: string | null;
	clientProfileId: string | null;
};

/**
 * Access token is stored in a local store for persistence across refreshes.
 */
let access = localStore<AccessInfo>('access', {
	token: null,
	clientAccountId: null,
	clientProfileId: null
});
export default access;

/**
 * Retrieves the client's profile ID or raises an exception if not authenticated.
 * @returns The client's profile ID.
 */
export const getProfileIdOrError = (): string => {
	if (access.value.clientProfileId == null) {
		throw new AppError('Unauthenticated.');
	}
	return access.value.clientProfileId;
};

/**
 * Retrieves the client's accilmt ID or raises an exception if not authenticated.
 * @returns The client's account ID.
 */
export const getAccountIdOrError = (): string => {
	if (access.value.clientAccountId == null) {
		throw new AppError('Unauthenticated.');
	}
	return access.value.clientAccountId;
};
