import type { MiddlewareHandler } from 'hono';

import { pinoLogger as logger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

import { LOG_LEVEL, NODE_ENV } from '$env/static/private';

if (!LOG_LEVEL) throw new Error('LOG_LEVEL is not set');
if (!NODE_ENV) throw new Error('NODE_ENV is not set');

export const pinoLogger: MiddlewareHandler = async (c, next) => {
	await logger({
		pino: pino(
			{
				level: LOG_LEVEL || 'info'
			},
			NODE_ENV === 'production' ? undefined : pretty()
		)
	})(c, next);
};
