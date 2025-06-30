<script lang="ts">
	import type { GetTask, UpdateTask } from '$lib/server/db/schema';
	import tasks from '../services/tasks';

	interface Props {
		task: GetTask;
	}

	const { task }: Props = $props();

	let editing = $state(false);
	let taskForm: UpdateTask = $state({ ...task });

	const updateMut = tasks.mut.update();
	const update = () => {
		$updateMut.mutate({ id: task.id, data: { ...taskForm } });
	};
	const removeMut = tasks.mut.remove();
	const remove = () => {
		$removeMut.mutate(task.id);
	};
</script>

<div class="wrapper">
	<div class="header">
		<p>{task.title}</p>
		<div>
			<button onclick={() => (editing = !editing)}> Edit </button>
			<button onclick={remove}> Delete </button>
		</div>
	</div>
	<div class="content">
		{#if editing}
			<div class="edit-wrapper">
				<div class="edit-title">
					<p>Title</p>
					<input type="text" bind:value={taskForm.title} placeholder="Enter a title" />
				</div>
				<div class="edit-description">
					<p>Description</p>
					<textarea bind:value={taskForm.description} placeholder="Enter a description"></textarea>
				</div>
				<div class="edit-completed">
					<p>Completed</p>
					<input type="checkbox" bind:checked={taskForm.completed} />
				</div>
				<button
					class="button"
					onclick={() => {
						update();
						editing = false;
					}}
				>
					Update
				</button>
			</div>
		{:else}
			<p>
				<span>Description:&nbsp;</span>
				{task.description}
			</p>
			<p>
				<span>State:&nbsp;</span>
				{task.completed ? 'Completed' : 'Not completed'}
			</p>
		{/if}
	</div>
</div>

<style lang="postcss">
	@reference 'tailwindcss';

	.wrapper {
		@apply border-2 border-black;
		@apply rounded-md;

		@apply flex flex-col items-start justify-center;
	}

	.header {
		@apply bg-black text-white;
		@apply w-full;
		@apply px-4 py-3;
		@apply text-lg;

		@apply flex flex-row items-center justify-between;
	}

	.content {
		@apply w-full;
		@apply p-4;

		@apply flex-1;
	}

	.edit-wrapper {
		@apply w-full;

		@apply flex flex-col gap-4;
	}

	.edit-title {
		@apply w-full;

		& input {
			@apply w-full;
			@apply p-2;
		}
	}

	.edit-description {
		@apply w-full;

		& textarea {
			@apply w-full;
			@apply p-2;
		}
	}

	.edit-completed {
		@apply flex flex-row items-center gap-2;
	}
</style>
