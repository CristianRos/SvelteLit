import { createRouter, type AppOpenAPI } from '../utils';

import tasks from '$/4_entities/tasks/api/tasks.index';

const _baseRoute = '/api';

export function registerRoutes(app: AppOpenAPI) {
	return app.route(_baseRoute, tasks);
}

// stand alone router type used for api client
export const router = registerRoutes(createRouter().basePath('/api'));
export type Router = typeof router;
