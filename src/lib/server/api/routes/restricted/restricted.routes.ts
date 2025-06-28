import { createRoute } from '@hono/zod-openapi';
import { jsonContent } from 'stoker/openapi/helpers';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import * as HttpStatusPhrases from 'stoker/http-status-phrases';
import { createMessageObjectSchema } from 'stoker/openapi/schemas';

export const hello = createRoute({
	tags: ['Test'],
	method: 'get',
	path: '/restricted',
	description: 'Hello! This is a restricted route.',
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			createMessageObjectSchema('Hello! This is a restricted route.'),
			HttpStatusPhrases.OK
		),
		[HttpStatusCodes.UNAUTHORIZED]: jsonContent(
			createMessageObjectSchema(HttpStatusPhrases.UNAUTHORIZED),
			HttpStatusPhrases.UNAUTHORIZED
		)
	}
});

export type HelloRoute = typeof hello;
