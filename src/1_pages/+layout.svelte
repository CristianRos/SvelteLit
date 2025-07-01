<script lang="ts">
	import '$/0_app/app.css';

	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

	let { children, data } = $props();

	const client = data.queryClient;
</script>

<QueryClientProvider {client}>
	{@render children()}
	<SvelteQueryDevtools />
</QueryClientProvider>
