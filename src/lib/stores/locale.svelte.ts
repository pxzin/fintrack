import { browser } from '$app/environment';
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { setLocale } from '$i18n/i18n-svelte';
import type { Locales } from '$i18n/i18n-types';

// Supported locales
export const supportedLocales: Locales[] = ['en', 'it', 'pt-br'];
export const defaultLocale: Locales = 'pt-br';

// Reactive locale exported state (Svelte 5)
export const currentLocale = $state<{ value: Locales }>({ value: defaultLocale });

// Locale detection and initialization
export function detectLocale(): Locales {
	if (!browser) return defaultLocale;

	// Try to get from localStorage first
	const stored = localStorage.getItem('fintrack-locale') as Locales;
	if (stored && supportedLocales.includes(stored)) {
		return stored;
	}

	// Try to detect from browser language
	const browserLang = navigator.language.toLowerCase();

	// Direct match
	if (supportedLocales.includes(browserLang as Locales)) {
		return browserLang as Locales;
	}

	// Language code match (e.g., 'pt' -> 'pt-br')
	const langCode = browserLang.split('-')[0];
	const matchedLocale = supportedLocales.find((locale) => locale.startsWith(langCode));

	return matchedLocale || defaultLocale;
}

// Initialize locale
export async function initLocale(locale?: Locales) {
	const targetLocale = locale || detectLocale();

	try {
		await loadLocaleAsync(targetLocale);
		setLocale(targetLocale);
		currentLocale.value = targetLocale;

		// Save to localStorage
		if (browser) {
			localStorage.setItem('fintrack-locale', targetLocale);
		}

		return targetLocale;
	} catch (error) {
		console.warn(`Failed to load locale ${targetLocale}, falling back to ${defaultLocale}`, error);

		// Fallback to default
		await loadLocaleAsync(defaultLocale);
		setLocale(defaultLocale);
		currentLocale.value = defaultLocale;

		if (browser) {
			localStorage.setItem('fintrack-locale', defaultLocale);
		}

		return defaultLocale;
	}
}

// Change locale
export async function changeLocale(newLocale: Locales) {
	if (!supportedLocales.includes(newLocale)) {
		console.warn(`Unsupported locale: ${newLocale}`);
		return false;
	}

	try {
		await loadLocaleAsync(newLocale);
		setLocale(newLocale);
		currentLocale.value = newLocale;

		if (browser) {
			localStorage.setItem('fintrack-locale', newLocale);
		}

		return true;
	} catch (_error) {
		console.error(`Failed to change locale to ${newLocale}:`, _error);
		return false;
	}
}

// Get current locale (reactive)
export function getLocale() {
	return currentLocale.value;
}

// Get locale display name
export function getLocaleDisplayName(locale: Locales): string {
	const names: Record<Locales, string> = {
		en: 'English',
		it: 'Italiano',
		'pt-br': 'Português (Brasil)',
		'en-us': 'English (US)'
	};
	return names[locale] || locale;
}

// Format currency based on locale
export function formatCurrency(amount: number, locale?: Locales): string {
	const targetLocale = locale || currentLocale.value;

	const formatOptions: Record<Locales, { locale: string; currency: string }> = {
		en: { locale: 'en-US', currency: 'USD' },
		it: { locale: 'it-IT', currency: 'EUR' },
		'pt-br': { locale: 'pt-BR', currency: 'BRL' },
		'en-us': { locale: 'en-US', currency: 'USD' }
	};

	const options = formatOptions[targetLocale as Locales] || formatOptions['pt-br'];

	return new Intl.NumberFormat(options.locale, {
		style: 'currency',
		currency: options.currency
	}).format(amount);
}

// Format date based on locale
export function formatDate(date: Date, locale?: Locales): string {
	const targetLocale = locale || currentLocale.value;

	const localeMap: Record<Locales, string> = {
		en: 'en-US',
		it: 'it-IT',
		'pt-br': 'pt-BR',
		'en-us': 'en-US'
	};

	const browserLocale = localeMap[targetLocale as Locales] || 'pt-BR';

	return new Intl.DateTimeFormat(browserLocale, {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	}).format(date);
}
