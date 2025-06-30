import { createQuery } from '@tanstack/svelte-query';
import { getTaskByIdQueryOptions, getTasksQueryOptions } from './_def';

export function get() {
	return createQuery(getTasksQueryOptions);
}

export function getById(id: number) {
	return createQuery(getTaskByIdQueryOptions(id));
}
