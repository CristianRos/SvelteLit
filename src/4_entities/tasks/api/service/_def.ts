import { api } from '$/5_shared/api/client';
import type { GetTask } from '../../model/schema';

import type { CreateQueryOptions } from '@tanstack/svelte-query';

export const queryKey = 'tasks' as const;

export const getTasksQueryOptions: CreateQueryOptions<GetTask[]> = {
	queryKey: [queryKey],
	queryFn: async () => {
		const response = await api.tasks.$get();

		if (!response.ok) {
			throw new Error('Failed to fetch tasks');
		}

		let data = await response.json();
		data = data.sort((a, b) => a.id - b.id);
		return data;
	}
};

export const getTaskByIdQueryOptions = (id: number): CreateQueryOptions<GetTask> => ({
	queryKey: [queryKey, id],
	queryFn: async () => {
		const response = await api.tasks[':id'].$get({ param: { id } });

		if (!response.ok) {
			throw new Error('Failed to fetch task');
		}

		const data = await response.json();
		return data;
	}
});
