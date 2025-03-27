import { TriplitClient } from '@triplit/client';
import { browser } from '$app/environment';
import { schema, roles, AppError } from '@vdt-webapp/common';
import { userRefresh } from './users/auth';
import { handleErrors } from '$lib/errors';

export const TRIPLIT_ANON_TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdG9rZW4tdHlwZSI6ImFub24iLCJ4LXRyaXBsaXQtcHJvamVjdC1pZCI6ImxvY2FsLXByb2plY3QtaWQifQ.9xYxsdR7ecDQ251Iv6oF7GrjBXAe1WcXY849g-soXVU';
const TRIPLIT_SERVER_URL = 'http://localhost:6543';

const triplit = new TriplitClient({
	schema,
	roles,
	/** Anonymous token. */
	token: TRIPLIT_ANON_TOKEN,
	serverUrl: TRIPLIT_SERVER_URL,
	autoConnect: browser,
	refreshOptions: {
		refreshHandler: async () => {
			const token = await userRefresh.mutation();
			if (token) {
				return token;
			} else {
				throw new Error('Failed to refresh access token.');
			}
		}
	},
	onSessionError: (type) => {
		triplit.endSession();
		triplit.clear();
		if (
			type === 'TOKEN_EXPIRED' ||
			type === 'UNAUTHORIZED' ||
			type === 'ROLES_MISMATCH'
		) {
			const error = new AppError(`Triplit session error of type ${type}.`, {
				nonFormErrors: ['Authentication error. Log in again.']
			});
			handleErrors(error.details);
			throw error;
		} else if (type === 'SCHEMA_MISMATCH') {
			const error = new AppError(`Triplit session error of type ${type}.`, {
				nonFormErrors: [
					'Failed to synchronize data structures with the server. Please refresh the application.'
				]
			});
			handleErrors(error.details);
			throw error;
		}
	}
});
export default triplit;
