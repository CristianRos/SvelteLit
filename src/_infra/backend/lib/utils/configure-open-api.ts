import type { AppOpenAPI } from './types';
import packageJSON from '$/../package.json' with { type: 'json' };

import { Scalar } from '@scalar/hono-api-reference';

export function configureOpenAPI(app: AppOpenAPI) {
	app.doc('/api/doc', {
		openapi: '3.0.0',
		info: {
			version: packageJSON.version,
			title: 'Tasks API'
		}
	});

	app.get(
		'/api/reference',
		Scalar({
			theme: 'kepler',
			layout: 'classic',
			defaultHttpClient: {
				targetKey: 'js',
				clientKey: 'fetch'
			},
			url: '/api/doc'
		})
	);
}
