/**
 * Seeds a local dev Jazz server with a pre-verified test account and a
 * working garden, mirroring what Triplit's old `--seed=triplit/seeds/seed.ts`
 * flag used to provide automatically. Run via `pnpm --filter
 * @vdg-webapp/models run seed`, or automatically at the end of `dev.sh`.
 *
 * Idempotent: safe to run against an already-seeded server (checks for the
 * test account/garden by their known identifiers before inserting).
 *
 * The test account's credentials match `apps/web/src/routes/+layout.svelte`'s
 * dev auto-login, so a fresh `pnpm dev` in apps/web logs straight in with no
 * manual signup/email-verification step.
 *
 * apps/demo's own shared garden is deliberately NOT seeded here: an earlier
 * version of this script did that, and browser clients synced that
 * backend-written data far more slowly (sometimes not at all within normal
 * page-load timeframes) than data written by a real browser session - a
 * genuine alpha-SDK gap between backend-origin and client-origin writes.
 * apps/demo seeds itself client-side instead (see
 * apps/demo/src/lib/seeds/jazzSeed.ts), using a fixed row id so concurrent
 * first-time visitors converge on one garden instead of racing duplicates.
 */
import { createJazzSession } from 'jazz-tools/backend';
import jwt from 'jsonwebtoken';

import { type Db, app, createCommands, permissions } from '../src/index.js';

const APP_ID = 'afe427f5-6e8a-5b1a-9546-1367d527cb39';
const SERVER_URL = 'http://localhost:1626';
/** Matches apps/server's default ACCESS_TOKEN_SECRET and dev.sh's Jazz server JWT key. */
const JWT_SECRET = 'secret';
const JWT_ISSUER = 'verdagraph';
const JWT_AUDIENCE = 'jazz';
const ACCESS_TOKEN_EXPIRY_S = 15 * 60;
const SERVICE_TOKEN_EXPIRY_S = 60 * 60;
const JAZZ_SERVICE_SUBJECT = 'verdagraph-server';

const TEST_USERNAME = 'user1';
const TEST_EMAIL = 'test@Verdagraph.com';
/**
 * Argon2 hash of the plaintext password 'password', reused verbatim from
 * the old Triplit seed - argon2's verify() reads its params from the hash
 * string itself, so this remains valid without depending on apps/server's
 * hashing implementation here.
 */
const TEST_PASSWORD_HASH =
	'$argon2i$v=19$m=16,t=2,p=1$MTIzNDU2Nzg5$e7G/IEd63Q/ZrZIiW6FUow';
const TEST_GARDEN_SLUG = 'nathaniels-garden';

/** Mints a service-identity JWT, matching apps/server's encodeServiceToken. */
function signServiceToken(): string {
	return jwt.sign({ role: 'service' }, JWT_SECRET, {
		expiresIn: SERVICE_TOKEN_EXPIRY_S,
		subject: JAZZ_SERVICE_SUBJECT,
		issuer: JWT_ISSUER,
		audience: JWT_AUDIENCE
	});
}

/** Mints a user-identity JWT, matching apps/server's encodeAccessToken. */
function signUserToken(accountId: string, profileId: string, username: string): string {
	return jwt.sign({ type: 'user', accountId, profileId, username }, JWT_SECRET, {
		expiresIn: ACCESS_TOKEN_EXPIRY_S,
		subject: accountId,
		issuer: JWT_ISSUER,
		audience: JWT_AUDIENCE
	});
}

async function openSession(getToken: () => Promise<string> | string) {
	const session = await createJazzSession({
		appId: APP_ID,
		app,
		permissions,
		serverUrl: SERVER_URL,
		driver: { type: 'memory' }
	});
	await session.loginOrRegisterJWT({ getToken: async () => getToken() });
	return session;
}

/** Creates the credential rows if they don't already exist, returning the account/profile ids. */
async function ensureTestCredentials(
	serviceDb: Db
): Promise<{ accountId: string; profileId: string }> {
	const existingAccount = await serviceDb.one(
		app.accounts.where({ verifiedEmail: TEST_EMAIL })
	);
	if (existingAccount) {
		console.log(
			`Test account already exists (${TEST_EMAIL}), skipping credential seed.`
		);
		return { accountId: existingAccount.id, profileId: existingAccount.profileId };
	}

	const accountProfile = await serviceDb
		.insert(app.accountProfiles, { username: TEST_USERNAME, createdAt: new Date() })
		.wait({ tier: 'edge' });
	const account = await serviceDb
		.insert(app.accounts, {
			profileId: accountProfile.id,
			passwordHash: TEST_PASSWORD_HASH,
			verifiedEmail: TEST_EMAIL,
			isActive: true
		})
		.wait({ tier: 'edge' });
	console.log(`Created test account ${TEST_EMAIL} (password: 'password').`);
	return { accountId: account.id, profileId: accountProfile.id };
}

async function main() {
	/** Service session: read/write the credential tables. */
	const serviceSession = await openSession(signServiceToken);
	const serviceSnapshot = serviceSession.getSnapshot();
	if (!serviceSnapshot.client) {
		throw new Error('Failed to establish the Jazz service session.');
	}
	const { accountId, profileId } = await ensureTestCredentials(
		serviceSnapshot.client.db
	);
	await serviceSession.logout();

	/**
	 * User session: logs in as the same identity apps/web's real login flow
	 * will use, so this resolves to the exact Jazz-native account the
	 * browser gets later, and every model write below goes through the real
	 * policy-checked command functions rather than a service bypass.
	 */
	const userToken = signUserToken(accountId, profileId, TEST_USERNAME);
	const userSession = await openSession(() => userToken);
	const userSnapshot = userSession.getSnapshot();
	if (!userSnapshot.client || !userSnapshot.account) {
		throw new Error('Failed to establish the Jazz user session.');
	}
	const db = userSnapshot.client.db;
	const jazzAccountId = userSnapshot.account.id;

	/** Self-provision the public users row, same as a browser's first login would. */
	await db
		.upsert(app.users, jazzAccountId, { username: TEST_USERNAME })
		.wait({ tier: 'edge' });
	const profile = await db.one(app.users.where({ id: jazzAccountId }));
	if (!profile) {
		throw new Error('Failed to provision the test user profile.');
	}

	const existingGarden = await db.one(app.gardens.where({ slug: TEST_GARDEN_SLUG }));
	if (existingGarden) {
		console.log(
			`Test garden already exists (${TEST_GARDEN_SLUG}), skipping model seed.`
		);
		await userSession.logout();
		return;
	}

	const commands = createCommands({
		db,
		jazz: app,
		getClient: async () => ({ profile })
	});

	const garden = await commands.gardenCreate({
		id: TEST_GARDEN_SLUG,
		name: "Nathaniel's Garden",
		description: 'The default seeded garden.',
		visibility: 'PUBLIC',
		adminInvites: [],
		editorInvites: [],
		viewerInvites: []
	});

	const workspace = await commands.workspaceCreate({
		gardenId: TEST_GARDEN_SLUG,
		name: 'Workspace 1',
		description: 'The default seeded workspace.'
	});

	const earlyDate = new Date(2020, 0, 1);
	await commands.plantingAreaCreate({
		gardenId: TEST_GARDEN_SLUG,
		workspaceId: workspace.id,
		name: 'Rectangle Area',
		description: 'Rectangle description.',
		depth: 0,
		geometry: {
			type: 'RECTANGLE',
			date: earlyDate,
			scaleFactor: 1,
			rotation: 0,
			rectangleLength: 2,
			rectangleWidth: 3,
			polygonNumSides: 3,
			polygonRadius: 1,
			ellipseLength: 1,
			ellipseWidth: 1,
			linesCoordinates: [],
			linesClosed: true
		},
		location: {
			gardenId: garden.id,
			workspaceId: workspace.id,
			coordinate: { x: 1.5, y: 2 },
			date: earlyDate
		}
	});
	await commands.plantingAreaCreate({
		gardenId: TEST_GARDEN_SLUG,
		workspaceId: workspace.id,
		name: 'Ellipse Area',
		description: 'Ellipse description.',
		depth: 0,
		geometry: {
			type: 'ELLIPSE',
			date: earlyDate,
			scaleFactor: 1,
			rotation: 0,
			rectangleLength: 1,
			rectangleWidth: 1,
			polygonNumSides: 3,
			polygonRadius: 1,
			ellipseLength: 2,
			ellipseWidth: 1.5,
			linesCoordinates: [],
			linesClosed: true
		},
		location: {
			gardenId: garden.id,
			workspaceId: workspace.id,
			coordinate: { x: 5, y: 3 },
			date: earlyDate
		}
	});

	console.log(
		`Created test garden '${TEST_GARDEN_SLUG}' with a workspace and 2 planting areas.`
	);
	await userSession.logout();
}

main()
	.then(() => {
		console.log('Seed complete.');
		process.exit(0);
	})
	.catch((error) => {
		console.error('Seed failed:', error);
		process.exit(1);
	});
