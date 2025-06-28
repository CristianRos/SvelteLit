import { auth } from '$lib/auth';
import type { MiddlewareHandler } from 'hono';
import type { AppBindings } from '$lib/server/api/utils';

export const authMiddleware: MiddlewareHandler<AppBindings> = async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session) {
		c.set('auth', null);
		return await next();
	}

	c.set('auth', session);
	return await next();
};
