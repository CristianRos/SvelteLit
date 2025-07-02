<script lang="ts">
	import { tasksService } from '$/4_entities/tasks/api/service';

	const createTaskMut = tasksService.mut.create();
	const create = () => {
		$createTaskMut.mutate({
			title: 'New task',
			description: 'This is a new task',
			completed: false
		});
	};
</script>

<button onclick={create}> Create </button>
