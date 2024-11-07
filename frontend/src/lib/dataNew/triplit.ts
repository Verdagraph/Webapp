import { TriplitClient } from '@triplit/client';
import { browser } from '$app/environment';
import { schema } from '@vdt-webapp/common';

const triplit = new TriplitClient({
	schema: schema,
	storage: 'indexeddb',
	serverUrl: '',
	autoConnect: browser
});
export default triplit;
