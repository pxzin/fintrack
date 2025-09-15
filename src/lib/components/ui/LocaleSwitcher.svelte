<script lang="ts">
	import {
		changeLocale,
		getLocale,
		getLocaleDisplayName,
		supportedLocales
	} from '$lib/stores/locale.svelte.js';
	import type { Locales } from '$i18n/i18n-types';

	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();

	const currentLocale = $derived(getLocale());

	function handleLocaleChange(newLocale: Locales) {
		if (newLocale !== currentLocale) {
			changeLocale(newLocale);
		}
	}

	// Get flag emoji for locale
	function getLocaleFlag(locale: Locales): string {
		const flags: Record<Locales, string> = {
			en: '🇺🇸',
			it: '🇮🇹',
			'pt-br': '🇧🇷'
		};
		return flags[locale] || '🌐';
	}

	// Get short code for locale
	function getLocaleCode(locale: Locales): string {
		const codes: Record<Locales, string> = {
			en: 'EN',
			it: 'IT',
			'pt-br': 'PT'
		};
		return codes[locale] || locale.toUpperCase();
	}
</script>

<div class="relative inline-block text-left {className}">
	<button
		type="button"
		class="inline-flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
		title="Change language"
	>
		<span class="text-base">{getLocaleFlag(currentLocale)}</span>
		<span class="text-sm font-medium">{getLocaleCode(currentLocale)}</span>
		<i class="i-lucide-chevron-down w-4 h-4"></i>
	</button>

	<div
		class="locale-menu hidden absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50"
	>
		{#each supportedLocales as locale (locale)}
			<button
				type="button"
				class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg transition-colors {locale ===
				currentLocale
					? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
					: ''}"
				onclick={() => handleLocaleChange(locale)}
			>
				<span class="text-base">{getLocaleFlag(locale)}</span>
				<span class="flex-1 text-left">{getLocaleDisplayName(locale)}</span>
				{#if locale === currentLocale}
					<i class="i-lucide-check w-4 h-4 text-blue-600 dark:text-blue-400"></i>
				{/if}
			</button>
		{/each}
	</div>
</div>

<style>
	.locale-menu {
		display: none;
	}

	.relative:hover .locale-menu,
	.relative:focus-within .locale-menu {
		display: block;
	}
</style>
