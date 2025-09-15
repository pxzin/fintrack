import { defineConfig, presetUno, presetIcons, presetWebFonts } from 'unocss';

export default defineConfig({
	presets: [
		presetUno(),
		presetIcons({
			collections: {
				lucide: () => import('@iconify-json/lucide/icons.json').then((i) => i.default),
				heroicons: () => import('@iconify-json/heroicons/icons.json').then((i) => i.default)
			}
		}),
		presetWebFonts({
			fonts: {
				sans: 'Inter:400,500,600,700',
				mono: 'JetBrains Mono:400,500'
			}
		})
	],
	theme: {
		colors: {
			// Primary Brand Colors
			primary: {
				50: '#eff6ff',
				100: '#dbeafe',
				200: '#bfdbfe',
				300: '#93c5fd',
				400: '#60a5fa',
				500: '#4f83ff', // Main brand blue
				600: '#2563eb',
				700: '#1d4ed8',
				800: '#1e40af',
				900: '#1e3a8a',
				950: '#172554'
			},

			// Success/Completed (Green)
			success: {
				50: '#ecfdf5',
				100: '#d1fae5',
				200: '#a7f3d0',
				300: '#6ee7b7',
				400: '#34d399',
				500: '#10b981', // Completed green
				600: '#059669',
				700: '#047857',
				800: '#065f46',
				900: '#064e3b',
				950: '#022c22'
			},

			// Processing (Purple)
			processing: {
				50: '#faf5ff',
				100: '#f3e8ff',
				200: '#e9d5ff',
				300: '#d8b4fe',
				400: '#c084fc',
				500: '#8b5cf6', // Processing purple
				600: '#7c3aed',
				700: '#6d28d9',
				800: '#5b21b6',
				900: '#4c1d95',
				950: '#2e1065'
			},

			// Info/Cyan
			info: {
				50: '#ecfeff',
				100: '#cffafe',
				200: '#a5f3fc',
				300: '#67e8f9',
				400: '#22d3ee',
				500: '#06b6d4', // Primary label cyan
				600: '#0891b2',
				700: '#0e7490',
				800: '#155e75',
				900: '#164e63',
				950: '#083344'
			},

			// Neutral/Gray Scale
			neutral: {
				50: '#f8f9fa', // Light background
				100: '#f1f3f4',
				200: '#e8eaed',
				300: '#dadce0',
				400: '#bdc1c6',
				500: '#9aa0a6',
				600: '#80868b',
				700: '#5f6368',
				800: '#3c4043',
				900: '#2e3a52', // Dark background
				950: '#1a1f2e'
			},

			// Semantic Colors
			danger: {
				50: '#fef2f2',
				100: '#fee2e2',
				200: '#fecaca',
				300: '#fca5a5',
				400: '#f87171',
				500: '#ef4444',
				600: '#dc2626',
				700: '#b91c1c',
				800: '#991b1b',
				900: '#7f1d1d',
				950: '#450a0a'
			},

			warning: {
				50: '#fffbeb',
				100: '#fef3c7',
				200: '#fde68a',
				300: '#fcd34d',
				400: '#fbbf24',
				500: '#f59e0b',
				600: '#d97706',
				700: '#b45309',
				800: '#92400e',
				900: '#78350f',
				950: '#451a03'
			}
		},

		// Border radius matching design
		borderRadius: {
			none: '0px',
			sm: '4px',
			DEFAULT: '8px',
			md: '8px',
			lg: '12px',
			xl: '16px',
			'2xl': '20px',
			'3xl': '24px',
			full: '9999px'
		},

		// Spacing system
		spacing: {
			xs: '4px',
			sm: '8px',
			md: '16px',
			lg: '24px',
			xl: '32px',
			'2xl': '48px',
			'3xl': '64px'
		},

		// Typography
		fontSize: {
			xs: ['12px', '16px'],
			sm: ['14px', '20px'],
			base: ['16px', '24px'],
			lg: ['18px', '28px'],
			xl: ['20px', '28px'],
			'2xl': ['24px', '32px'],
			'3xl': ['30px', '36px'],
			'4xl': ['36px', '40px']
		},

		// Shadows matching design
		boxShadow: {
			sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
			DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
			md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
			lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
			xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
			card: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
			sidebar: '2px 0 8px 0 rgb(0 0 0 / 0.1)'
		}
	},

	// Custom shortcuts for common patterns
	shortcuts: {
		// Layout
		sidebar: 'w-64 h-screen bg-white border-r border-neutral-200 shadow-sidebar',
		'sidebar-dark': 'w-64 h-screen bg-neutral-900 border-r border-neutral-800',
		'main-content': 'flex-1 bg-neutral-50 p-6',
		'main-content-dark': 'flex-1 bg-neutral-950 p-6',

		// Cards
		card: 'bg-white rounded-lg shadow-card p-6 border border-neutral-200',
		'card-dark': 'bg-neutral-900 rounded-lg shadow-lg p-6 border border-neutral-800',

		// Buttons
		'btn-primary':
			'bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors',
		'btn-secondary':
			'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 px-4 py-2 rounded-lg font-medium transition-colors',
		'btn-success':
			'bg-success-500 hover:bg-success-600 text-white px-4 py-2 rounded-lg font-medium transition-colors',

		// Navigation
		'nav-item':
			'flex items-center px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors',
		'nav-item-active':
			'flex items-center px-4 py-2 text-primary-600 bg-primary-50 rounded-lg font-medium',
		'nav-item-dark':
			'flex items-center px-4 py-2 text-neutral-300 hover:bg-neutral-800 rounded-lg transition-colors',
		'nav-item-dark-active':
			'flex items-center px-4 py-2 text-primary-400 bg-primary-950 rounded-lg font-medium',

		// Form elements
		input:
			'w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
		'input-dark':
			'w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',

		// Labels/Badges
		'badge-primary':
			'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-info-100 text-info-800',
		'badge-success':
			'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800',
		'badge-processing':
			'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-processing-100 text-processing-800',
		'badge-warning':
			'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800',
		'badge-danger':
			'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger-100 text-danger-800',

		// Text styles
		'text-primary': 'text-neutral-900',
		'text-secondary': 'text-neutral-600',
		'text-muted': 'text-neutral-500',
		'text-primary-dark': 'text-neutral-100',
		'text-secondary-dark': 'text-neutral-300',
		'text-muted-dark': 'text-neutral-400'
	},

	// Custom rules for specific patterns
	rules: [
		// Custom financial amount styling
		[
			/^amount-(.+)$/,
			([, color]) => ({
				'font-variant-numeric': 'tabular-nums',
				'font-weight': '600',
				color: `var(--un-color-${color})`
			})
		],

		// Custom sidebar width
		[
			/^sidebar-w-(.+)$/,
			([, width]) => ({
				width: `${width}px`,
				'min-width': `${width}px`,
				'max-width': `${width}px`
			})
		]
	],

	// Safelist for dynamic classes
	safelist: [
		'text-success-600',
		'text-danger-600',
		'bg-success-100',
		'bg-danger-100',
		'bg-processing-100',
		'bg-info-100',
		// Icons
		'i-lucide-plus',
		'i-lucide-check',
		'i-lucide-download',
		'i-lucide-trash-2',
		'i-lucide-settings',
		'i-lucide-save',
		'i-lucide-log-in',
		'i-lucide-credit-card',
		'i-lucide-trending-up',
		'i-lucide-trending-down',
		'i-lucide-transfer',
		'i-lucide-eye',
		'i-lucide-minus',
		'i-lucide-repeat',
		'i-lucide-more-horizontal'
	]
});
