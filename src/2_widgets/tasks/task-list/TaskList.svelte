<script lang="ts">
	import TaskManageCard from '$/2_widgets/tasks/task-manage-card/ui/TaskManageCard.svelte';
	import type { GetTask } from '$/4_entities/tasks/model/schema';

	import type { CreateQueryResult } from '@tanstack/svelte-query';

	interface Props {
		tasksQuery: CreateQueryResult<GetTask[], Error>;
	}

	const { tasksQuery }: Props = $props();
</script>

<ul>
	{#if $tasksQuery.isLoading}
		<p>Loading...</p>
	{:else if $tasksQuery.isError}
		<p>Error: {$tasksQuery.error.message}</p>
	{:else if $tasksQuery.data}
		{#each $tasksQuery.data as task (task.id)}
			<TaskManageCard {task} />
		{/each}
	{:else}
		<p>No tasks</p>
	{/if}
</ul>

<style lang="postcss">
	@reference 'tailwindcss';

	ul {
		@apply grid gap-4;

		grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
	}
</style>
