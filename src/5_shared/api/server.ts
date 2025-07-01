import { registerRoutes } from './routes';
import { configureOpenAPI, createApp } from './utils';


export const app = registerRoutes(createApp());
configureOpenAPI(app);

export type AppType = typeof app;