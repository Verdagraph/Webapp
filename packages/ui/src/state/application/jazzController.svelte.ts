import { getDb, getSession } from 'jazz-tools/svelte';

import {
	type Commands,
	type JazzUser,
	createCommands,
	jazzApp
} from '@vdg-webapp/models/jazz';

/**
 * Polls until the Jazz session has assigned this browser its own account
 * id - immediate for a local-first session (apps/demo), or once the JWT
 * login completes for a real session (apps/web).
 */
async function waitForAccountId(): Promise<string> {
	const session = getSession();
	while (!session.current?.user.account) {
		await new Promise((resolve) => setTimeout(resolve, 20));
	}
	return session.current.user.account;
}

/**
 * Resolves this session's public profile row (see
 * packages/models/src/jazz/users.ts), self-provisioning one keyed by the
 * session's own account id if it doesn't exist yet - true on a session's
 * first Jazz login, since signup happens before any Jazz identity exists.
 * @param fetchUsername Called only when a new profile needs provisioning.
 */
async function resolveOrProvisionProfile(
	fetchUsername: () => Promise<string>
): Promise<JazzUser> {
	const db = getDb();
	const accountId = await waitForAccountId();

	let profile = await db.one(jazzApp.users.where({ id: accountId }));
	if (!profile) {
		const username = await fetchUsername();
		const write = db.upsert(jazzApp.users, accountId, { username });
		await write.wait({ tier: 'edge' });
		profile = await db.one(jazzApp.users.where({ id: accountId }));
	}
	if (!profile) {
		throw new Error('Failed to provision a Jazz user profile.');
	}

	return { profile };
}

/**
 * Builds the app's single Commands instance (the bound write-command
 * surface, see packages/models/src/jazz/dataController.ts), shared by
 * every read resolver and write call site.
 * @param fetchUsername Supplies a username the first time this session's
 * profile needs self-provisioning - a REST call in apps/web, a constant
 * in apps/demo.
 */
export function createJazzCommands(fetchUsername: () => Promise<string>): Commands {
	return createCommands({
		db: getDb(),
		jazz: jazzApp,
		getClient: () => resolveOrProvisionProfile(fetchUsername)
	});
}
