import { createRouter } from '$lib/server/api/utils';

import type { AppOpenAPI } from '$lib/server/api/utils';

import tasks from './tasks/tasks.index';
import restricted from './restricted/restricted.index';

const _baseRoute = '/api';

export function registerRoutes(app: AppOpenAPI) {
	return app
		.route(_baseRoute, tasks)
		.route(_baseRoute, restricted);
}

// stand alone router type used for api client
export const router = registerRoutes(createRouter().basePath('/api'));
export type Router = typeof router;
