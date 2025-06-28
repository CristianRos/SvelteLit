import { Scalar } from '@scalar/hono-api-reference';

import type { AppOpenAPI } from '../utils/types';

import packageJSON from '../../../../../package.json' with { type: 'json' };

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
