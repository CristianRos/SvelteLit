import type { AuthType } from '$lib/auth';
import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { Schema } from 'hono';
import type { PinoLogger } from 'hono-pino';

export type ApiBindings = {};

export type ApiVariables = {
	auth: AuthType | null;
	logger: PinoLogger;
};

export interface AppBindings {
	Bindings: ApiBindings;
	Variables: ApiVariables;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;
