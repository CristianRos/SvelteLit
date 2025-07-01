import { getTaskByIdQueryOptions, getTasksQueryOptions } from './_def';

import { QueryClient } from '@tanstack/svelte-query';

export async function get(queryClient: QueryClient) {
	await queryClient.prefetchQuery(getTasksQueryOptions);
}

export async function getById(queryClient: QueryClient, id: number) {
	await queryClient.prefetchQuery(getTaskByIdQueryOptions(id));
}
