import type { AppRouteHandler } from '$lib/server/api/utils';
import type { HelloRoute } from './restricted.routes';
import * as HttpStatusCodes from 'stoker/http-status-codes';

export const hello: AppRouteHandler<HelloRoute> = async (c) => {
	const session = c.var.auth?.session;
	const user = c.var.auth?.user;

	if (!session || !user) {
		return c.json({ message: 'Not signed in' }, HttpStatusCodes.UNAUTHORIZED);
	}

	return c.json({ message: `Hello! ${user.name}` });
};
