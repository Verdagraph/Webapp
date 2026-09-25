/**
 * Standalone verification script, not part of the package build/exports
 * and not a maintained test suite. Kept as reproducible evidence for the
 * findings in SPIKE_NOTES.md; run manually, not in CI.
 * Usage: from packages/models, `npx tsc -p .` then `node spike-verify.ts`.
 */
import { createPolicyTestApp } from 'jazz-tools/testing';

import { createController } from './dist/controller.js';
import { gardenCreate } from './dist/gardens/controller.js';
import { constructGardenPermissions } from './dist/gardens/permissions.js';
import { app } from './dist/schema.js';

const ADMIN_ID = 'e92bbea9-7a9f-4c25-aa14-066ce643955c';
const EDITOR_ID = '2992e0c8-aee0-4c1f-ae4c-d4bf0ec57f7f';
const VIEWER_ID = '9f89ea1a-467f-4f82-af60-3ae9db38c099';
const STRANGER_ID = '75e0e43a-725d-4f75-aff0-e792110c1b74';

function makeSession(accountId: string) {
	return {
		account_id: accountId,
		issuer: 'spike-test-issuer',
		user_id: accountId,
		claims: {},
		authMode: 'local-first'
	};
}

let failures = 0;
let passes = 0;

function ok(label: string, condition: boolean) {
	if (condition) {
		passes++;
		console.log(`  PASS: ${label}`);
	} else {
		failures++;
		console.error(`  FAIL: ${label}`);
	}
}

function expect(value: unknown) {
	const fail = (msg: string) => {
		failures++;
		console.error(`  FAIL: ${msg}`);
	};
	const pass = () => {
		passes++;
	};
	return {
		not: {
			toThrow(_expected?: unknown) {
				try {
					if (typeof value === 'function') (value as () => unknown)();
					pass();
				} catch (e) {
					fail(`expected not to throw, but threw: ${e}`);
				}
			}
		},
		toThrow(_expected?: unknown) {
			try {
				if (typeof value === 'function') (value as () => unknown)();
				fail('expected to throw, but did not');
			} catch {
				pass();
			}
		},
		rejects: {
			async toThrow(_expected?: unknown) {
				try {
					await value;
					fail('expected promise to reject, but it resolved');
				} catch {
					pass();
				}
			}
		}
	};
}

async function main() {
	const permissions = constructGardenPermissions(app);
	const testApp = await createPolicyTestApp(app, permissions, expect as any);

	console.log('--- Test: gardenCreate() end-to-end through the ported controller ---');
	const adminDb = testApp.as(makeSession(ADMIN_ID));
	const adminCtx = createController({
		db: adminDb as any,
		jazz: app,
		getClient: async () => ({ profile: { id: ADMIN_ID, username: 'admin' } }) as any
	});

	const created = await gardenCreate(
		{
			id: 'my-test-garden',
			name: 'My Test Garden',
			description: '',
			visibility: 'HIDDEN',
			adminInvites: [],
			editorInvites: [],
			viewerInvites: []
		} as any,
		adminCtx
	);
	ok('created garden has a real (non-slug) row id', created.id !== 'my-test-garden');
	ok('created garden kept the slug field', (created as any).slug === 'my-test-garden');

	console.log('\n--- Test: duplicate slug is rejected by gardenCreate() ---');
	let duplicateRejected = false;
	try {
		await gardenCreate(
			{
				id: 'my-test-garden',
				name: 'Duplicate',
				description: '',
				visibility: 'HIDDEN',
				adminInvites: [],
				editorInvites: [],
				viewerInvites: []
			} as any,
			adminCtx
		);
	} catch {
		duplicateRejected = true;
	}
	ok('gardenCreate() rejected a duplicate slug', duplicateRejected);

	console.log('\n--- Test: creator membership was created with ADMIN role ---');
	const creatorMembership = await adminDb.one(
		app.gardenMemberships.where({ gardenId: created.id, userId: ADMIN_ID })
	);
	ok(
		'creator membership exists with role ADMIN',
		creatorMembership != null && creatorMembership.role === 'ADMIN'
	);

	// Manually seed editor/viewer memberships to test read/update policy below,
	// since gardenCreate() above only granted the creator (ADMIN) access.
	await testApp.seed((db) => {
		db.update(app.gardens, created.id, {
			editorIds: [EDITOR_ID],
			viewerIds: [VIEWER_ID]
		});
		return db.insert(app.gardenMemberships, {
			gardenId: created.id,
			userId: VIEWER_ID,
			role: 'VIEWER',
			status: 'ACCEPTED'
		});
	});

	console.log('\n--- Test: admin can update the garden ---');
	adminDb.expectAllowed((db) => {
		db.update(app.gardens, created.id, { name: 'Renamed by admin' });
	});

	console.log('\n--- Test: viewer cannot update the garden ---');
	const viewerDb = testApp.as(makeSession(VIEWER_ID));
	await viewerDb.expectDenied((db) => {
		return db.update(app.gardens, created.id, {
			name: 'should-be-denied'
		}) as any;
	});

	console.log('\n--- Test: non-member cannot read a HIDDEN garden ---');
	const strangerDb = testApp.as(makeSession(STRANGER_ID));
	const strangerReadResult = await strangerDb.one(
		app.gardens.where({ id: created.id })
	);
	ok('stranger got no result for a HIDDEN garden', strangerReadResult == null);

	console.log('\n--- Test: viewer (a member) CAN read the HIDDEN garden ---');
	const viewerReadResult = await viewerDb.one(app.gardens.where({ id: created.id }));
	ok('viewer member could read the HIDDEN garden', viewerReadResult != null);

	await testApp.shutdown();

	console.log(`\n${passes} passed, ${failures} failed.`);
	if (failures > 0) process.exit(1);
}

main().catch((e) => {
	console.error('Script error:', e);
	process.exit(1);
});
