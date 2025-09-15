import { writable, derived } from 'svelte/store';
import type { Locales, TranslationFunctions, BaseTranslation } from './i18n-types';

// Import translations
import en from './en/index';
import ptBr from './pt-br/index';
import it from './it/index';

// Store all translations
const translations: Record<Locales, BaseTranslation> = {
	en,
	'pt-br': ptBr,
	it
};

// Current locale store
export const locale = writable<Locales>('pt-br');

// Convert translation object to function-based object
function createTranslationFunctions(translation: BaseTranslation): TranslationFunctions {
	function convertToFunctions(obj: any): any {
		if (typeof obj === 'string') {
			return () => obj;
		}

		if (typeof obj === 'object' && obj !== null) {
			const result: any = {};
			for (const [key, value] of Object.entries(obj)) {
				result[key] = convertToFunctions(value);
			}
			return result;
		}

		return obj;
	}

	return convertToFunctions(translation) as TranslationFunctions;
}

// Translation functions store
export const LL = derived(locale, ($locale) => {
	const translation = translations[$locale];
	return createTranslationFunctions(translation);
});

// Helper function to set locale
export const setLocale = (newLocale: Locales) => {
	locale.set(newLocale);
};

export default LL;
