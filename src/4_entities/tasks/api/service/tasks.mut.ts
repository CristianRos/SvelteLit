import { api } from '$/_infra/backend/api/hono.client';
import type { CreateTask, UpdateTask } from '../../model/schema';

import { queryKey } from './_def';

import { createMutation, useQueryClient } from '@tanstack/svelte-query';

export function create() {
	const queryClient = useQueryClient();
	return createMutation({
		mutationKey: [`create-${queryKey}`],
		mutationFn: async (data: CreateTask) => await api.tasks.$post({ json: data }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
	});
}

export function update() {
	const queryClient = useQueryClient();
	return createMutation({
		mutationKey: [`update-${queryKey}`],
		mutationFn: async (variables: { id: number; data: UpdateTask }) =>
			await api.tasks[':id'].$patch({ param: { id: variables.id }, json: variables.data }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] })
	});
}

export function remove() {
	const queryClient = useQueryClient();
	return createMutation({
		mutationKey: [`remove-${queryKey}`],
		mutationFn: async (id: number) => await api.tasks[':id'].$delete({ param: { id } }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] })
	});
}
