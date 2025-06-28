import { createRouter } from '$lib/server/api/utils';

import * as handlers from './restricted.handlers';
import * as routes from './restricted.routes';

const router = createRouter().openapi(routes.hello, handlers.hello);

export default router;
