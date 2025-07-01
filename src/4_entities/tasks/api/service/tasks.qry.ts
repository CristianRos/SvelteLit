import { getTaskByIdQueryOptions, getTasksQueryOptions } from './_def';

import { createQuery } from '@tanstack/svelte-query';

export function get() {
	return createQuery(getTasksQueryOptions);
}

export function getById(id: number) {
	return createQuery(getTaskByIdQueryOptions(id));
}
