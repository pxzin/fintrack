<script lang="ts">
	import { themeState } from '$lib/stores/theme.svelte.js';

	interface Props {
		class?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	let { class: className = '', size = 'md' }: Props = $props();

	const sizeClasses = {
		sm: 'w-8 h-8',
		md: 'w-10 h-10',
		lg: 'w-12 h-12'
	};

	const iconSizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-5 h-5',
		lg: 'w-6 h-6'
	};
</script>

<button
	class="relative flex items-center justify-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 {sizeClasses[
		size
	]} {className}"
	onclick={() => themeState.toggle()}
	title={themeState.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
	aria-label="Toggle theme"
>
	{#if themeState.isDark}
		<i class="i-lucide-sun {iconSizeClasses[size]}"></i>
	{:else}
		<i class="i-lucide-moon {iconSizeClasses[size]}"></i>
	{/if}
</button>
