import { cors } from 'hono/cors';

import { PUBLIC_APP_URL } from '$env/static/public';

if (!PUBLIC_APP_URL) throw new Error('PUBLIC_APP_URL is not set');

export const corsMiddleware = cors({
	origin: [PUBLIC_APP_URL],
	allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
	allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
	credentials: true,
	maxAge: 60 * 60 * 24 * 30
});
