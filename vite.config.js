import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import {resolve} from 'node:path'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({

	plugins: [

		// https://www.npmjs.com/package/@vitejs/plugin-vue
		vue(),

		// https://www.npmjs.com/package/vite-plugin-dts
		dts({
			include: ['src'],
			declarationOnly: true,
		}),

	],

	// resolve: {
	// 	alias: {
	// 		'@': fileURLToPath(new URL('./src', import.meta.url))
	// 	}
	// },


	build: {
		lib: {
			entry: resolve(import.meta.dirname, './src/index.mjs'),
			name: 'Whitebox',
			formats: ['es'],
			fileName: 'whitebox',
		}
	}

});
