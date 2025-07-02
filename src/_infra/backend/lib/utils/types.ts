import type { AuthType } from '$/5_shared/auth/model/types';
import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { Schema } from 'hono';
import type { PinoLogger } from 'hono-pino';

type ApiVariables = {
	auth: AuthType | null;
	logger: PinoLogger;
};

export interface AppBindings {
	Variables: ApiVariables;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;
