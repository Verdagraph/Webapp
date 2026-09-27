import { getSession } from 'jazz-tools/svelte';

/**
 * Holds context for the user client. Every consumer only ever reads
 * `profile.id` (as the identity compared against garden/draft-bucket
 * ownership arrays), which is exactly the Jazz session's own account id -
 * no query needed.
 */
export function createClientContext() {
	const session = getSession();
	const profile = $derived.by(() => {
		const accountId = session.current?.user.account;
		return accountId ? { id: accountId } : null;
	});

	return {
		get profile() {
			return profile;
		}
	};
}
export type ClientContext = ReturnType<typeof createClientContext>;
