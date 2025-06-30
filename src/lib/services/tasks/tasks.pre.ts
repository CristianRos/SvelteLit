import { QueryClient } from '@tanstack/svelte-query';
import { getTaskByIdQueryOptions, getTasksQueryOptions } from './_def';

export async function get(queryClient: QueryClient) {
	await queryClient.prefetchQuery(getTasksQueryOptions);
}

export async function getById(queryClient: QueryClient, id: number) {
	await queryClient.prefetchQuery(getTaskByIdQueryOptions(id));
}
