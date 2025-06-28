import type { Schema } from 'hono';

import { OpenAPIHono } from '@hono/zod-openapi';
import { defaultHook } from 'stoker/openapi';

import { pinoLogger } from '$lib/server/api/middlewares';
import { requestId } from 'hono/request-id';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';

import type { AppBindings, AppOpenAPI } from '$lib/server/api/utils';
import { auth } from '$lib/auth';
import { authMiddleware } from '../middlewares/auth';

export function createRouter() {
	return new OpenAPIHono<AppBindings>({
		strict: false,
		defaultHook
	});
}

export function createApp() {
	const app = createRouter();
	app
		.use(requestId())
		.use(serveEmojiFavicon('📝'))
		.use(pinoLogger)
		.use('*', authMiddleware);

	app.on(['POST', 'GET'], 'api/auth/**', (c) => auth.handler(c.req.raw));

	app.notFound(notFound);
	app.onError(onError);
	return app;
}

export function createTestApp<S extends Schema>(router: AppOpenAPI<S>) {
	return createApp().route('/api', router);
}
