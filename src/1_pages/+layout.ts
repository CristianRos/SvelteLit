import { browser } from "$app/environment";

import { QueryClient } from "@tanstack/svelte-query";

export function load({ data }) {
    const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	return { queryClient, ...data };
}
