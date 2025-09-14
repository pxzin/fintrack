import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import UnoCSS from 'unocss/vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			UnoCSS(),
			sveltekit()
		],
		ssr: {
			noExternal: ['typesafe-i18n']
		},
		define: {
			'process.env.TURSO_DATABASE_URL': JSON.stringify(env.TURSO_DATABASE_URL),
			'process.env.TURSO_AUTH_TOKEN': JSON.stringify(env.TURSO_AUTH_TOKEN),
			'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
		}
	}
});
