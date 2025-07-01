<script lang="ts">
	import GoogleSignInButton from '$/3_features/session/sign-in/ui/GoogleSignInButton.svelte';
	import SignOutButton from '$/3_features/session/sign-out/ui/SignOutButton.svelte';

	import type { User } from 'better-auth';

	interface Props {
		user: User;
	}

	const { user }: Props = $props();
</script>

<div class="header">
	{#if user}
		<h2>Welcome {user.name}</h2>
		<SignOutButton />
	{:else}
		<h2>Sign in to see tasks</h2>
		<GoogleSignInButton />
	{/if}
</div>

<style lang="postcss">
	@reference 'tailwindcss';

	.header {
		@apply bg-black text-white;
		@apply p-4;

		@apply flex flex-row items-center justify-between;
	}
</style>
