import type { Demo } from './types';
import { workspaceDemo } from './workspaceEditor';

export const demos: Demo[] = [workspaceDemo];

export type DemoId = (typeof demos)[number]['id'];
