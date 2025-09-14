import type { Translation } from '../i18n-types'

const enUs: Translation = {
	// === AUTH ===
	auth: {
		login: {
			title: 'Login to Account',
			subtitle: 'Please enter your email and password to continue',
			emailLabel: 'Email address:',
			emailPlaceholder: 'your.email@example.com',
			passwordLabel: 'Password',
			passwordPlaceholder: 'Enter your password',
			forgotPassword: 'Forgot Password?',
			rememberPassword: 'Remember Password',
			signInButton: 'Sign In',
			noAccount: "Don't have an account?",
			createAccount: 'Create Account'
		},
		register: {
			title: 'Create New Account',
			subtitle: 'Fill in the details to create your account',
			nameLabel: 'Full name:',
			namePlaceholder: 'Enter your full name',
			signUpButton: 'Sign Up',
			hasAccount: 'Already have an account?',
			signIn: 'Sign In'
		},
		logout: 'Logout'
	},

	// === COMMON ===
	common: {
		loading: 'Loading...',
		save: 'Save',
		cancel: 'Cancel',
		delete: 'Delete',
		edit: 'Edit',
		add: 'Add',
		close: 'Close',
		confirm: 'Confirm',
		yes: 'Yes',
		no: 'No',
		search: 'Search',
		filter: 'Filter',
		clear: 'Clear',
		back: 'Back',
		next: 'Next',
		previous: 'Previous',
		finish: 'Finish',
		required: 'Required',
		optional: 'Optional'
	},

	// === NAVIGATION ===
	nav: {
		dashboard: 'Dashboard',
		accounts: 'Accounts',
		transactions: 'Transactions',
		categories: 'Categories',
		projections: 'Projections',
		settings: 'Settings'
	},

	// === DASHBOARD ===
	dashboard: {
		title: 'Dashboard',
		monthSummary: 'Month Summary',
		income: 'Income',
		expenses: 'Expenses',
		balance: 'Balance',
		recentTransactions: 'Recent Transactions',
		accountBalances: 'Account Balances'
	},

	// === ACCOUNTS ===
	accounts: {
		title: 'Accounts',
		addAccount: 'Add Account',
		accountName: 'Account name',
		accountType: 'Account type',
		initialBalance: 'Initial balance',
		currentBalance: 'Current balance',
		types: {
			checking: 'Checking Account',
			savings: 'Savings Account',
			creditCard: 'Credit Card',
			investment: 'Investment',
			business: 'Business',
			cash: 'Cash',
			crypto: 'Cryptocurrency',
			loan: 'Loan',
			pension: 'Pension',
			other: 'Other'
		}
	},

	// === TRANSACTIONS ===
	transactions: {
		title: 'Transactions',
		addTransaction: 'New Transaction',
		description: 'Description',
		amount: 'Amount',
		date: 'Date',
		category: 'Category',
		account: 'Account',
		type: 'Type',
		types: {
			income: 'Income',
			expense: 'Expense'
		},
		isRecurrent: 'Recurring transaction',
		recurrenceInterval: 'Recurrence interval',
		intervals: {
			monthly: 'Monthly',
			yearly: 'Yearly'
		}
	},

	// === CATEGORIES ===
	categories: {
		title: 'Categories',
		addCategory: 'New Category',
		categoryName: 'Category name',
		categoryIcon: 'Icon',
		types: {
			income: 'Income',
			expense: 'Expense'
		}
	},

	// === PROJECTIONS ===
	projections: {
		title: 'Projections',
		next6Months: 'Next 6 Months',
		expectedIncome: 'Expected Income',
		expectedExpenses: 'Expected Expenses',
		projectedBalance: 'Projected Balance'
	},

	// === ERRORS ===
	errors: {
		required: 'This field is required',
		invalidEmail: 'Invalid email',
		minLength: 'Minimum {min} characters',
		maxLength: 'Maximum {max} characters',
		invalidAmount: 'Invalid amount',
		networkError: 'Network error',
		serverError: 'Server error',
		unauthorized: 'Unauthorized',
		notFound: 'Not found'
	},

	// === SUCCESS MESSAGES ===
	success: {
		accountCreated: 'Account created successfully',
		accountUpdated: 'Account updated successfully',
		accountDeleted: 'Account deleted successfully',
		transactionCreated: 'Transaction created successfully',
		transactionUpdated: 'Transaction updated successfully',
		transactionDeleted: 'Transaction deleted successfully',
		categoryCreated: 'Category created successfully',
		categoryUpdated: 'Category updated successfully',
		categoryDeleted: 'Category deleted successfully'
	}
}

export default enUs