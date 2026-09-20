import { createController } from '@vdg-webapp/models';

import triplit from '$data/triplit';
import { getClient } from '$data/users/auth';

/**
 * ControllerContext for calling packages/models controller functions
 * directly against this app's Triplit client (mirrors the wiring
 * apps/demo does with a mock getClient, using the real one here).
 */
const controller = createController({ triplit, getClient });
export default controller;
