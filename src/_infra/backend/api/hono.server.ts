import { registerRoutes } from '../lib/routes';
import { configureOpenAPI, createApp } from '../lib/utils';


export const app = registerRoutes(createApp());
configureOpenAPI(app);

export type AppType = typeof app;