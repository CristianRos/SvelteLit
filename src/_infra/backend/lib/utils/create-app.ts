import { auth } from '$/5_shared/auth/api/auth';
import { authMiddleware, pinoLogger } from '../middleware';
import type { AppBindings, AppOpenAPI } from '.';

import type { Schema } from 'hono';
import { requestId } from 'hono/request-id';
import { OpenAPIHono } from '@hono/zod-openapi';

import { defaultHook } from 'stoker/openapi';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';


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
