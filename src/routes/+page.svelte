<script lang="ts">
	import { signIn, signOut } from '$lib/authClient';
	import tasks from '$lib/services/tasks';
	import TaskCard from '$lib/components/TaskCard.svelte';
	import { invalidateAll } from '$app/navigation';

	const { data } = $props();
	const user = $derived(data.user);

	const tasksQuery = tasks.qry.get();

	const createTaskMut = tasks.mut.create();
	const createTask = () => {
		$createTaskMut.mutate({
			title: 'New task',
			description: 'This is a new task',
			completed: false
		});
	};
</script>

<div>
	<div class="header">
		{#if user}
			<h2>Welcome {user.name}</h2>
			<button
				onclick={async () => {
					await signOut();
					await invalidateAll();
				}}
			>
				Sign out
			</button>
		{:else}
			<h2>Sign in to see tasks</h2>
			<button
				class="button"
				onclick={() => {
					signIn.social({
						provider: 'google'
					});
				}}>Sign in with Google</button
			>
		{/if}
	</div>
	<main>
		{#if user}
			<div class="main-header">
				<h1>Your tasks</h1>
				<button onclick={createTask}>Create task</button>
			</div>
			<ul class="task-list">
				{#if $tasksQuery.isLoading}
					<p>Loading...</p>
				{:else if $tasksQuery.isError}
					<p>Error: {$tasksQuery.error.message}</p>
				{:else if $tasksQuery.data}
					{#each $tasksQuery.data as task}
						<TaskCard {task} />
					{/each}
				{:else}
					<li>No tasks</li>
				{/if}
			</ul>
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

	.header {
		@apply flex flex-row items-center justify-between;
		@apply bg-black text-white;
		@apply p-4;
	}

	.main-header {
		@apply flex flex-row justify-between;
	}

	.task-list {
		@apply grid gap-4;

		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	}
</style>
