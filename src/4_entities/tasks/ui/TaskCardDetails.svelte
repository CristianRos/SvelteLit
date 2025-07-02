<script lang="ts">
	import TaskManageCard from '$/2_widgets/tasks/task-manage-card/ui/TaskManageCard.svelte';
	import type { GetTask } from '../model/schema';

	interface Props {
		task: GetTask;
	}

	const { task }: Props = $props();
</script>

<TaskManageCard {task} />
<div class="details">
	<p>
		<span>Description:&nbsp;</span>
		{task.description}
	</p>
	<p>
		<span>State:&nbsp;</span>
		{task.completed ? 'Completed' : 'Not completed'}
	</p>
</div>

<style lang="postcss">
	@reference 'tailwindcss';

	.details {
		@apply w-full;
		@apply p-4;

		@apply flex-1;
	}
</style>
