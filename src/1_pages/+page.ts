import { tasksService } from '$/4_entities/tasks/api/service/';

import { error } from '@sveltejs/kit';

export async function load({ parent }) {
	const { queryClient } = await parent();

	try {
		await tasksService.pre.get(queryClient);
	} catch (e) {
		const err = e as Error;

		console.log(err.message);
		return error(500, err.message);
	}
}
