import type { Handle } from '@sveltejs/kit';

import app from '$lib/server/api';
import type { AppType } from '$lib/server/api';
import { hc } from 'hono/client';

import { auth } from '$lib/auth';

import { PUBLIC_APP_URL } from '$env/static/public';
if (!PUBLIC_APP_URL) throw new Error('PUBLIC_APP_URL is not set');


export const handle: Handle = async ({ event, resolve }) => {
	// API Route Handling
	if (event.url.pathname.startsWith('/api')) {
		return app.fetch(event.request);
	}
	
	// Hono RPC
	const api = hc<AppType>(PUBLIC_APP_URL, { fetch: event.fetch });
	event.locals.api = api;
	
	// Authentication
	const session = await auth.api.getSession({ headers: event.request.headers });
	if(session) {
		event.locals.user = session.user;
		event.locals.session = session.session;
	} else {
		event.locals.user = undefined;
		event.locals.session = undefined;
	}
	
	return resolve(event);
};