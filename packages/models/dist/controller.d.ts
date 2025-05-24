import { TriplitClient as TriplitClientBase } from '@triplit/client';
import { schema } from './index.js';
import { type User } from './users/schema.js';
type TriplitClient = TriplitClientBase<typeof schema>;
export type ControllerContext = {
    triplit: TriplitClient;
    getClient: (triplit: TriplitClient) => Promise<User | null>;
};
export {};
//# sourceMappingURL=controller.d.ts.map