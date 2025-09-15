<script lang="ts">
	import '../app.css';
	import 'virtual:uno.css';
	import favicon from '$lib/assets/favicon.svg';
	import { browser } from '$app/environment';
	import { themeState } from '$lib/stores/theme.svelte.js';
	import { initLocale } from '$lib/stores/locale.svelte.js';
	import { onMount } from 'svelte';

	const { children } = $props();

	// Initialize locale immediately (server and client)
	initLocale();

	// Initialize theme and locale on mount
	onMount(() => {
		if (browser) {
			// Re-initialize locale on client (might have different preferences)
			initLocale();

			// Theme is already initialized in the store constructor
			// but we ensure the class is applied correctly
			const isDark = themeState.isDark;
			document.documentElement.classList.toggle('dark', isDark);
		}
	});
	import DevStoreInspector from '$lib/components/DevStoreInspector.svelte';
	import DevDbInspector from '$lib/components/DevDbInspector.svelte';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<DevStoreInspector />
<DevDbInspector />
{@render children?.()}
