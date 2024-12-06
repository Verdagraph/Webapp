import { defineConfig } from 'orval';

export default defineConfig({
	vdt_frontend: {
		input: {
			// Path to the openapi specification.
			target: './openapi.yaml',
			// Whether to apply IBM OpenAPI linter.
			validation: false
		},
		output: {
			// Path to the generated client code.
			workspace: 'src/lib/codegen/',
			// Path relative to workspace to generated client code.
			target: './client/',
			schemas: './types/',
			// What type of client to generate.
			client: 'axios-functions',
			// Generates a folder for every unique openapi tag
			mode: 'tags-split',
			// Whether to generate Mock Service Worker mocked code.
			mock: false,
			// Generates comment headers on client code.
			headers: true,
			// Formats generated code.
			prettier: true,
			override: {
				mutator: {
					path: '../dataNew/customAxios.ts',
					name: 'axiosClient'
				},
				useNativeEnums: true
			}
		}
	}
});
