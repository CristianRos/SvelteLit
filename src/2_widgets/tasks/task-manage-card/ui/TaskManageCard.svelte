<script lang="ts">
	import TaskEditForm from '$/3_features/tasks/manage-tasks/ui/TaskEditForm.svelte';
	import TaskRemoveButton from '$/3_features/tasks/manage-tasks/ui/TaskRemoveButton.svelte';

	import type { GetTask } from '$/4_entities/tasks/model/schema';
	import TaskHeader from '$/4_entities/tasks/ui/TaskHeader.svelte';
	import TaskCardDetails from '$/4_entities/tasks/ui/TaskCardDetails.svelte';

	interface Props {
		task: GetTask;
	}

	const { task }: Props = $props();

	let editing = $state(false);
</script>

<div class="wrapper">
	<TaskHeader {task} {actions} />
	<div class="content">
		{#if editing}
			<TaskEditForm {task} onUpdateClicked={() => (editing = false)} />
		{:else}
			<TaskCardDetails {task} />
		{/if}
	</div>
</div>

{#snippet actions()}
	<button onclick={() => (editing = !editing)}> Edit </button>
	<TaskRemoveButton taskId={task.id} />
{/snippet}

<style lang="postcss">
	@reference 'tailwindcss';

	.wrapper {
		@apply border-2 border-black;
		@apply rounded-md;

		@apply flex flex-col items-start justify-center;
	}

	.content {
		@apply w-full;
		@apply p-4;

		@apply flex-1;
	}
</style>
