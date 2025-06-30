import type { ClientType } from '$lib/api';
import type { AuthType } from '$lib/auth';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			api: ClientType;
			session: AuthType['session'] | undefined;
			user: AuthType['user'] | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
