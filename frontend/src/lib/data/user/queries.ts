import triplit from '$dataNew/triplit';
import { UserAccount, UserProfile } from '@vdt-webapp/common';
import { AppError } from '@vdt-webapp/common/src/errors';
import auth from '$state/auth.svelte';

/**
 * Retrieves the requested user profiles.
 */
export const userProfilesQuery = () => {};

/**
 * Constructs a list of queries which return whether a username exists.
 */
export const usernamesExistQueries = (data: Array<string>) => {};
