import { api } from '$lib/api';
import type { CreateTask, UpdateTask } from '$lib/server/db/schema';
import { createMutation, useQueryClient } from '@tanstack/svelte-query';
import { queryKey } from './_def';

export function create() {
	const queryClient = useQueryClient();
	return createMutation({
		mutationKey: [`create-${queryKey}`],
		mutationFn: (data: CreateTask) => api.tasks.$post({ json: data }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
	});
}

export function update() {
	const queryClient = useQueryClient();
	return createMutation({
		mutationKey: [`update-${queryKey}`],
		mutationFn: (variables: { id: number; data: UpdateTask }) =>
			api.tasks[':id'].$patch({ param: { id: variables.id }, json: variables.data }),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [queryKey] })
	});
}

export function remove() {
	const queryClient = useQueryClient();
	return createMutation({
		mutationKey: [`remove-${queryKey}`],
		mutationFn: (id: number) => api.tasks[':id'].$delete({ param: { id } }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] })
	});
}
