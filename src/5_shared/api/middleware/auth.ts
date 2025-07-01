import { auth } from '$/5_shared/lib/auth';
import type { AppBindings } from '../utils';

import type { MiddlewareHandler } from 'hono';

export const authMiddleware: MiddlewareHandler<AppBindings> = async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session) {
		c.set('auth', null);
		return await next();
	}

	c.set('auth', session);
	return await next();
};
