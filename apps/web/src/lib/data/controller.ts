import { createCommands } from '@vdg-webapp/models';

import triplit from '$data/triplit';
import { getClient } from '$data/users/auth';

/**
 * Commands instance (see packages/models/src/controller.ts) for calling
 * packages/models write commands directly against this app's Triplit
 * client (mirrors the wiring apps/demo does with a mock getClient, using
 * the real one here).
 */
const controller = createCommands({ triplit, getClient });
export default controller;
