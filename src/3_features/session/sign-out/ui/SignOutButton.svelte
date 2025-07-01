<script lang="ts">
	import { signOut } from '$/5_shared/lib/authClient';
	import { invalidateAll } from '$app/navigation';
</script>

<button
	onclick={async () => {
		await signOut();
		await invalidateAll();
	}}
>
	Sign out
</button>
