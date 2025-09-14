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
	class="theme-toggle {sizeClasses[size]} {className}"
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

<style>
	.theme-toggle {
		@apply relative flex items-center justify-center;
		@apply bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700;
		@apply rounded-lg shadow-sm hover:shadow-md transition-all duration-200;
		@apply text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white;
		@apply hover:bg-gray-50 dark:hover:bg-slate-700;
	}
	
	.theme-toggle:focus {
		@apply outline-none ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-slate-900;
	}
</style>