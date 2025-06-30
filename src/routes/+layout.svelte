<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import '../app.css';

	let { children, data } = $props();

	const client = data.queryClient;
</script>

<QueryClientProvider {client}>
	{@render children()}
	<SvelteQueryDevtools />
</QueryClientProvider>
