import { configureOpenAPI, createApp } from '$lib/server/api/utils';

import { registerRoutes } from './routes';

const app = registerRoutes(createApp());
configureOpenAPI(app);

export default app;

export type AppType = typeof app;
