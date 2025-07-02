<script lang="ts">
	import Header from '$/2_widgets/header/Header.svelte';
	import TaskList from '$/2_widgets/tasks/task-list/TaskList.svelte';

	import TaskCreateButton from '$/3_features/tasks/manage-tasks/ui/TaskCreateButton.svelte';
	import { tasksService } from '$/4_entities/tasks/api/service';

	const { data } = $props();
	const user = $derived(data.user);

	const tasksQuery = tasksService.qry.get();
</script>

<div>
	<Header {user} />
	<main>
		{#if user}
			<div class="main-header">
				<h1>Your tasks</h1>
				<TaskCreateButton />
			</div>
			<TaskList {tasksQuery} />
		{:else}
			<p>You are not signed in</p>
		{/if}
	</main>
</div>

<style lang="postcss">
	@reference 'tailwindcss';

	main {
		@apply p-20;

		@apply flex flex-col gap-4;
	}

	.main-header {
		@apply flex flex-row justify-between;
	}
</style>
