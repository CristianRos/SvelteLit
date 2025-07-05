import { notFoundSchema } from '$/_infra/backend/lib/utils';
import { createTaskSchema, updateTaskSchema, getTaskSchema } from '../model/schema';

import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';
import { createErrorSchema, createMessageObjectSchema, IdParamsSchema } from 'stoker/openapi/schemas';

const tags = ['Test'];

export const list = createRoute({
	path: '/tasks',
	method: 'get',
	tags,
	responses: {
		[HttpStatusCodes.OK]: jsonContent(z.array(getTaskSchema), 'The list of tasks'),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			createMessageObjectSchema('An unexpected error ocurred'),
			'Internal server error'
		)
	}
});

export const create = createRoute({
	path: '/tasks',
	method: 'post',
	request: {
		body: jsonContentRequired(createTaskSchema, 'The task to create')
	},
	tags,
	responses: {
		[HttpStatusCodes.OK]: jsonContent(getTaskSchema, 'The created task'),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(createTaskSchema),
			'The validation error(s)'
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			createMessageObjectSchema('An unexpected error ocurred'),
			'Internal server error'
		)
	}
});

export const getOne = createRoute({
	path: '/tasks/{id}',
	method: 'get',
	request: {
		params: IdParamsSchema
	},
	tags,
	responses: {
		[HttpStatusCodes.OK]: jsonContent(getTaskSchema, 'The requested task'),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(IdParamsSchema),
			'Invalid id error'
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			createMessageObjectSchema('An unexpected error ocurred'),
			'Internal server error'
		)
	}
});

export const patch = createRoute({
	path: '/tasks/{id}',
	method: 'patch',
	request: {
		params: IdParamsSchema,
		body: jsonContentRequired(updateTaskSchema, 'The task updates')
	},
	tags,
	responses: {
		[HttpStatusCodes.OK]: jsonContent(getTaskSchema, 'The updated task'),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(updateTaskSchema).or(createErrorSchema(IdParamsSchema)),
			'The validation error(s)'
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			createMessageObjectSchema('An unexpected error ocurred'),
			'Internal server error'
		)
	}
});

export const remove = createRoute({
	path: '/tasks/{id}',
	method: 'delete',
	request: {
		params: IdParamsSchema
	},
	tags,
	responses: {
		[HttpStatusCodes.NO_CONTENT]: {
			description: 'Task deleted'
		},
		[HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(IdParamsSchema),
			'Invalid id error'
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			createMessageObjectSchema('An unexpected error ocurred'),
			'Internal server error'
		)
	}
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
