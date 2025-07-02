<script lang="ts">
	import { tasksService } from '$/4_entities/tasks/api/service';

	interface Props {
		taskId: number;
	}

	const { taskId }: Props = $props();

	const removeMut = tasksService.mut.remove();
	const remove = () => {
		$removeMut.mutate(taskId);
	};
</script>

<button onclick={remove}> Delete </button>
