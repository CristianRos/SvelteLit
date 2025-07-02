import type { Router } from '../lib/routes';

import { hc } from 'hono/client';

import { PUBLIC_APP_URL } from '$env/static/public';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const client = hc<Router>('');
export type Client = typeof client;

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<Router>(...args);

export const api = hcWithType(PUBLIC_APP_URL).api;
