<script lang="ts">
	import { api } from '$lib/api';
	import { signIn, signOut } from '$lib/authClient';
	import { onMount } from 'svelte';

	onMount(async () => {
		const response = await api.tasks.$get();
		const data = await response.json();
		console.log(data);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<button
	onclick={() => {
		signIn.social({
			provider: 'google'
		});
	}}>Sign in with Google</button
>
<button
	onclick={() => {
		signOut();
	}}
>
	Sign out
</button>

<style>
	button {
		background-color: lightskyblue;
		border: none;
		padding: 0.5rem 1rem;
		cursor: pointer;
		border-radius: 0.5rem;
	}
</style>
