/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTasksQueryOptions, getTaskByIdQueryOptions } from './_def';
import { api } from '$/_infra/backend/api/hono.client';
import type { QueryClient, QueryFunction, QueryFunctionContext } from '@tanstack/svelte-query';
import type { GetTask } from '../../model/schema';

vi.mock('$/_infra/backend/api/hono.client', () => ({
	api: {
		tasks: {
			$get: vi.fn(),
			':id': {
				$get: vi.fn()
			}
		}
	}
}));

describe('Tasks Service', () => {
	const mockedApi = api as any;

	const mockQueryContext: QueryFunctionContext<['tasks']> = {
		queryKey: ['tasks'],
		client: {} as QueryClient,
		pageParam: undefined,
		meta: undefined,
		signal: new AbortController().signal
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getTasksQueryOptions', () => {
		it('should fetch and sort tasks by ID correctly', async () => {
			const mockApiResponse = [
				{ id: 2, title: 'B', completed: false },
				{ id: 1, title: 'A', completed: false }
			];
			const expectedSortedData = [
				{ id: 1, title: 'A', completed: false },
				{ id: 2, title: 'B', completed: false }
			];

			mockedApi.tasks.$get.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(mockApiResponse)
			});

			const queryFn = getTasksQueryOptions.queryFn as QueryFunction<GetTask[], readonly unknown[]>;
			const result = await queryFn(mockQueryContext);

			expect(mockedApi.tasks.$get).toHaveBeenCalledTimes(1);
			expect(result).toEqual(expectedSortedData);
		});

		it('should throw an error if fetching tasks fails', async () => {
			mockedApi.tasks.$get.mockResolvedValue({
				ok: false,
				status: 500
			});

			const queryFn = getTasksQueryOptions.queryFn as QueryFunction<GetTask[], readonly unknown[]>;

			await expect(queryFn(mockQueryContext)).rejects.toThrow('Failed to fetch tasks');
		});
	});

	describe('getTaskByIdQueryOptions', () => {
		it('should fetch a single task by ID correctly', async () => {
			const mockTask = { id: 1, title: 'Single Task', completed: false };
			mockedApi.tasks[':id'].$get.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(mockTask)
			});

			const options = getTaskByIdQueryOptions(1);

			const queryFn = options.queryFn as QueryFunction<GetTask, readonly unknown[]>;
			const result = await queryFn(mockQueryContext);

			expect(mockedApi.tasks[':id'].$get).toHaveBeenCalledWith({ param: { id: 1 } });
			expect(result).toEqual(mockTask);
		});

		it('should throw an error if fetching a single task fails', async () => {
			mockedApi.tasks[':id'].$get.mockResolvedValue({
				ok: false,
				status: 404
			});

			const options = getTaskByIdQueryOptions(999);
			const queryFn = options.queryFn as QueryFunction<GetTask, readonly unknown[]>;

			await expect(queryFn(mockQueryContext)).rejects.toThrow('Failed to fetch task');
		});
	});
});
