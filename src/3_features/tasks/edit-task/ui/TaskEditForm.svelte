<script lang="ts">
	import tasksService from '$/4_entities/tasks/api/service';
	import type { GetTask, UpdateTask } from '$/4_entities/tasks/model/schema';

	interface Props {
		task: GetTask;
		onUpdateClicked: () => void;
	}

	const { task, onUpdateClicked }: Props = $props();

	let taskForm: UpdateTask = $state({ ...task });

	const updateMut = tasksService.mut.update();
	const update = () => {
		$updateMut.mutate({ id: task.id, data: { ...taskForm } });
	};

	function handleUpdate() {
		update();
		onUpdateClicked();
	}
</script>

<div class="wrapper">
	<div class="title">
		<p>Title</p>
		<input type="text" bind:value={taskForm.title} placeholder="Enter a title" />
	</div>
	<div class="description">
		<p>Description</p>
		<textarea bind:value={taskForm.description} placeholder="Enter a description"></textarea>
	</div>
	<div class="completed">
		<p>Completed</p>
		<input type="checkbox" bind:checked={taskForm.completed} />
	</div>
	<button onclick={handleUpdate}> Update </button>
</div>

<style lang="postcss">
	@reference 'tailwindcss';

	.wrapper {
		@apply w-full;

		@apply flex flex-col gap-4;
	}

	.title {
		@apply w-full;

		& input {
			@apply w-full;
			@apply p-2;
		}
	}

	.description {
		@apply w-full;

		& textarea {
			@apply w-full;
			@apply p-2;
		}
	}

	.completed {
		@apply flex flex-row items-center gap-2;
	}
</style>
