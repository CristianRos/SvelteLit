import { db } from '$/_infra/database/api/db';
import type { AppRouteHandler } from '$/_infra/backend/lib/utils/types';
import { noUpdatesJson } from '$/_infra/backend/lib/utils/constants';

import { tasks } from '../model/schema';

import { eq } from 'drizzle-orm';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import * as HttpStatusPhrases from 'stoker/http-status-phrases';

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from './tasks.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
	try {
		const tasks = await db.query.tasks.findMany();
		return c.json(tasks, HttpStatusCodes.OK);
	} catch (error) {
		console.error('Error fetching tasks:', error);
		return c.json(
			{
				message: HttpStatusPhrases.INTERNAL_SERVER_ERROR
			},
			HttpStatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
	const task = c.req.valid('json');

	try {
		const [inserted] = await db.insert(tasks).values(task).returning();

		return c.json(inserted, HttpStatusCodes.OK);
	} catch (error) {
		console.error('Error creating task:', error);

		return c.json(
			{
				message: HttpStatusPhrases.INTERNAL_SERVER_ERROR
			},
			HttpStatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
	const { id } = c.req.valid('param');

	try {
		const task = await db.query.tasks.findFirst({
			where(fields, operators) {
				return operators.eq(fields.id, id);
			}
		});

		if (!task) {
			return c.json(
				{
					message: HttpStatusPhrases.NOT_FOUND
				},
				HttpStatusCodes.NOT_FOUND
			);
		}

		return c.json(task, HttpStatusCodes.OK);
	} catch (error) {
		console.error('Error fetching task:', error);
		return c.json(
			{
				message: HttpStatusPhrases.INTERNAL_SERVER_ERROR
			},
			HttpStatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
	const { id } = c.req.valid('param');
	const updates = c.req.valid('json');

	try {
		if (Object.keys(updates).length === 0) {
			return c.json(noUpdatesJson, HttpStatusCodes.UNPROCESSABLE_ENTITY);
		}

		const [task] = await db.update(tasks).set(updates).where(eq(tasks.id, id)).returning();

		if (!task) {
			return c.json(
				{
					message: HttpStatusPhrases.NOT_FOUND
				},
				HttpStatusCodes.NOT_FOUND
			);
		}

		return c.json(task, HttpStatusCodes.OK);
	} catch (error) {
		console.error('Error updating task:', error);
		return c.json(
			{
				message: HttpStatusPhrases.INTERNAL_SERVER_ERROR
			},
			HttpStatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
	const { id } = c.req.valid('param');

	try {
		const result = await db.delete(tasks).where(eq(tasks.id, id));

		if (result.rowCount === 0) {
			return c.json(
				{
					message: HttpStatusPhrases.NOT_FOUND
				},
				HttpStatusCodes.NOT_FOUND
			);
		}

		return c.body(null, HttpStatusCodes.NO_CONTENT);
	} catch (error) {
		console.error('Error deleting task:', error);
		return c.json(
			{
				message: HttpStatusPhrases.INTERNAL_SERVER_ERROR
			},
			HttpStatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};
