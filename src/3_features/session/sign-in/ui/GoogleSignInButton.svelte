<script>
	import { signIn } from '$/5_shared/auth/api/authClient';
</script>

<button
	onclick={() =>
		signIn.social({
			provider: 'google'
		})}
>
	Sign In with Google
</button>
