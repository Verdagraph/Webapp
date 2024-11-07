import { useQuery } from '@triplit/svelte';
import triplit from '../triplit';

/**
 * Retrieves the client's Account object from the backend. Returns an error if not authenticated.
 */
export const userClientQuery = useQuery(triplit, triplit.query('accounts'));

/**
 * Retrieves the requested user profiles.
 */
export const userProfilesQuery = () => {};

/**
 * Constructs a list of queries which return whether a username exists.
 */
export const usernamesExistQueries = (data: Array<string>) => {};
