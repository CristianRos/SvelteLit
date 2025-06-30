import tasks from '$lib/services/tasks/index.js';
import { error } from '@sveltejs/kit';

export async function load({ parent }) {
    const { queryClient } = await parent();

    try {
        await tasks.pre.get(queryClient);
    } catch (e) {
        const err = e as Error;

        console.log(err.message);
        return error(500, err.message);
    }
}