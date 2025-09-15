// Custom i18n types for FinTrack
export type BaseLocale = 'en';
export type Locales = 'en' | 'it' | 'pt-br';

export interface BaseTranslation {
	auth: {
		login: {
			title: string;
			subtitle: string;
			emailLabel: string;
			emailPlaceholder: string;
			passwordLabel: string;
			passwordPlaceholder: string;
			forgotPassword: string;
			rememberPassword: string;
			signInButton: string;
			noAccount: string;
			createAccount: string;
		};
		register: {
			title: string;
			subtitle: string;
			nameLabel: string;
			namePlaceholder: string;
			emailLabel: string;
			emailPlaceholder: string;
			passwordLabel: string;
			passwordPlaceholder: string;
			confirmPasswordLabel: string;
			confirmPasswordPlaceholder: string;
			signUpButton: string;
			hasAccount: string;
			signIn: string;
		};
		password: {
			strength: {
				title: string;
				levels: {
					veryWeak: string;
					weak: string;
					moderate: string;
					strong: string;
					veryStrong: string;
				};
			};
			feedback: {
				minLength: string;
				mixedCase: string;
				includeNumbers: string;
				includeSymbols: string;
				avoidCommon: string;
			};
		};
		emailVerification: {
			title: string;
			subtitle: string;
			checkEmail: string;
			instructions: string;
			didNotReceive: string;
			resendEmail: string;
			backToLogin: string;
		};
		logout: string;
	};
	common: {
		loading: string;
		save: string;
		cancel: string;
		delete: string;
		edit: string;
		add: string;
		close: string;
		confirm: string;
		yes: string;
		no: string;
		search: string;
		filter: string;
		clear: string;
		back: string;
		next: string;
		previous: string;
		finish: string;
		required: string;
		optional: string;
	};
	nav: {
		dashboard: string;
		accounts: string;
		transactions: string;
		categories: string;
		projections: string;
		settings: string;
	};
	dashboard: {
		title: string;
		monthSummary: string;
		income: string;
		expenses: string;
		balance: string;
		recentTransactions: string;
		accountBalances: string;
	};
	accounts: {
		title: string;
		addAccount: string;
		accountName: string;
		accountType: string;
		initialBalance: string;
		currentBalance: string;
		types: {
			checking: string;
			savings: string;
			creditCard: string;
			investment: string;
			business: string;
			cash: string;
			crypto: string;
			loan: string;
			pension: string;
			other: string;
		};
	};
	transactions: {
		title: string;
		addTransaction: string;
		description: string;
		amount: string;
		date: string;
		category: string;
		account: string;
		type: string;
		types: {
			income: string;
			expense: string;
		};
		isRecurrent: string;
		recurrenceInterval: string;
		intervals: {
			monthly: string;
			yearly: string;
		};
	};
	categories: {
		title: string;
		addCategory: string;
		categoryName: string;
		categoryIcon: string;
		types: {
			income: string;
			expense: string;
		};
	};
	projections: {
		title: string;
		next6Months: string;
		expectedIncome: string;
		expectedExpenses: string;
		projectedBalance: string;
	};
	errors: {
		required: string;
		invalidEmail: string;
		minLength: string;
		maxLength: string;
		invalidAmount: string;
		networkError: string;
		serverError: string;
		unauthorized: string;
		notFound: string;
		passwordMismatch: string;
		weakPassword: string;
	};
	success: {
		accountCreated: string;
		accountUpdated: string;
		accountDeleted: string;
		transactionCreated: string;
		transactionUpdated: string;
		transactionDeleted: string;
		categoryCreated: string;
		categoryUpdated: string;
		categoryDeleted: string;
	};
}

export type Translation = BaseTranslation;
export type Translations = BaseTranslation;

// Create a nested type that converts all string values to functions that return strings
type DeepFunctionize<T> = {
	[K in keyof T]: T[K] extends string
		? () => string
		: T[K] extends object
			? DeepFunctionize<T[K]>
			: T[K];
};

export type TranslationFunctions = DeepFunctionize<BaseTranslation>;

export type Formatters = Record<string, never>;
