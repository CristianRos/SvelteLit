<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { GetTask } from '../model/schema';

	interface Props {
		task: GetTask;
		actions?: Snippet;
	}

	const { task, actions }: Props = $props();
</script>

<div class="header">
	<p>{task.title}</p>
	<div class="actions">
		{@render actions?.()}
	</div>
</div>

<style lang="postcss">
	@reference 'tailwindcss';

	.header {
		@apply bg-black text-white;
		@apply w-full;
		@apply px-4 py-3;
		@apply text-lg;

		@apply flex flex-row flex-wrap items-center justify-between gap-4;
	}

	.actions {
		@apply flex flex-row items-center gap-2;
	}
</style>
