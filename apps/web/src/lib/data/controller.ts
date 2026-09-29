import { createCommands } from '@vdg-webapp/models';

import triplit from '$data/triplit';
import { getClient } from '$data/users/auth';

const controller = createCommands({ triplit, getClient });
export default controller;
