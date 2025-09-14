import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

class ThemeState {
	private _theme = $state<Theme>('system');
	private _resolvedTheme = $state<'light' | 'dark'>('light');

	constructor() {
		if (browser) {
			this.init();
		}
	}

	get theme() {
		return this._theme;
	}

	get resolvedTheme() {
		return this._resolvedTheme;
	}

	get isDark() {
		return this._resolvedTheme === 'dark';
	}

	private init() {
		// Load saved theme from localStorage
		const savedTheme = localStorage.getItem('theme') as Theme | null;
		if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
			this._theme = savedTheme;
		}

		// Set up media query listener for system theme
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = () => this.updateResolvedTheme();
		mediaQuery.addEventListener('change', handleChange);

		// Initial theme setup
		this.updateResolvedTheme();
		this.applyTheme();

		// Cleanup function (for when component unmounts)
		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}

	private updateResolvedTheme() {
		if (this._theme === 'system') {
			this._resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
		} else {
			this._resolvedTheme = this._theme as 'light' | 'dark';
		}
	}

	private applyTheme() {
		const root = document.documentElement;
		
		if (this._resolvedTheme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	}

	setTheme(theme: Theme) {
		this._theme = theme;
		
		if (browser) {
			localStorage.setItem('theme', theme);
			this.updateResolvedTheme();
			this.applyTheme();
		}
	}

	toggle() {
		const newTheme = this._resolvedTheme === 'dark' ? 'light' : 'dark';
		this.setTheme(newTheme);
	}
}

export const themeState = new ThemeState();