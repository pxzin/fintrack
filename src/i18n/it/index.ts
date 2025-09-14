import type { Translation } from '../i18n-types'

const it: Translation = {
	// === AUTH ===
	auth: {
		login: {
			title: 'Accedi al Conto',
			subtitle: 'Inserisci la tua email e password per continuare',
			emailLabel: 'Indirizzo email:',
			emailPlaceholder: 'tua.email@esempio.it',
			passwordLabel: 'Password',
			passwordPlaceholder: 'Inserisci la tua password',
			forgotPassword: 'Password dimenticata?',
			rememberPassword: 'Ricorda password',
			signInButton: 'Accedi',
			noAccount: 'Non hai un account?',
			createAccount: 'Crea account'
		},
		register: {
			title: 'Crea Nuovo Account',
			subtitle: 'Compila i dettagli per creare il tuo account',
			nameLabel: 'Nome completo:',
			namePlaceholder: 'Inserisci il tuo nome completo',
			signUpButton: 'Registrati',
			hasAccount: 'Hai già un account?',
			signIn: 'Accedi'
		},
		logout: 'Esci'
	},

	// === COMMON ===
	common: {
		loading: 'Caricamento...',
		save: 'Salva',
		cancel: 'Annulla',
		delete: 'Elimina',
		edit: 'Modifica',
		add: 'Aggiungi',
		close: 'Chiudi',
		confirm: 'Conferma',
		yes: 'Sì',
		no: 'No',
		search: 'Cerca',
		filter: 'Filtra',
		clear: 'Pulisci',
		back: 'Indietro',
		next: 'Successivo',
		previous: 'Precedente',
		finish: 'Fine',
		required: 'Obbligatorio',
		optional: 'Opzionale'
	},

	// === NAVIGATION ===
	nav: {
		dashboard: 'Dashboard',
		accounts: 'Conti',
		transactions: 'Transazioni',
		categories: 'Categorie',
		projections: 'Proiezioni',
		settings: 'Impostazioni'
	},

	// === DASHBOARD ===
	dashboard: {
		title: 'Dashboard',
		monthSummary: 'Riepilogo del Mese',
		income: 'Entrate',
		expenses: 'Spese',
		balance: 'Saldo',
		recentTransactions: 'Transazioni Recenti',
		accountBalances: 'Saldi dei Conti'
	},

	// === ACCOUNTS ===
	accounts: {
		title: 'Conti',
		addAccount: 'Aggiungi Conto',
		accountName: 'Nome del conto',
		accountType: 'Tipo di conto',
		initialBalance: 'Saldo iniziale',
		currentBalance: 'Saldo attuale',
		types: {
			checking: 'Conto Corrente',
			savings: 'Conto di Risparmio',
			creditCard: 'Carta di Credito',
			investment: 'Investimento',
			business: 'Aziendale',
			cash: 'Contanti',
			crypto: 'Criptovaluta',
			loan: 'Prestito',
			pension: 'Pensione',
			other: 'Altro'
		}
	},

	// === TRANSACTIONS ===
	transactions: {
		title: 'Transazioni',
		addTransaction: 'Nuova Transazione',
		description: 'Descrizione',
		amount: 'Importo',
		date: 'Data',
		category: 'Categoria',
		account: 'Conto',
		type: 'Tipo',
		types: {
			income: 'Entrata',
			expense: 'Spesa'
		},
		isRecurrent: 'Transazione ricorrente',
		recurrenceInterval: 'Intervallo di ricorrenza',
		intervals: {
			monthly: 'Mensile',
			yearly: 'Annuale'
		}
	},

	// === CATEGORIES ===
	categories: {
		title: 'Categorie',
		addCategory: 'Nuova Categoria',
		categoryName: 'Nome categoria',
		categoryIcon: 'Icona',
		types: {
			income: 'Entrata',
			expense: 'Spesa'
		}
	},

	// === PROJECTIONS ===
	projections: {
		title: 'Proiezioni',
		next6Months: 'Prossimi 6 Mesi',
		expectedIncome: 'Entrate Previste',
		expectedExpenses: 'Spese Previste',
		projectedBalance: 'Saldo Previsto'
	},

	// === ERRORS ===
	errors: {
		required: 'Questo campo è obbligatorio',
		invalidEmail: 'Email non valida',
		minLength: 'Minimo {min} caratteri',
		maxLength: 'Massimo {max} caratteri',
		invalidAmount: 'Importo non valido',
		networkError: 'Errore di rete',
		serverError: 'Errore del server',
		unauthorized: 'Non autorizzato',
		notFound: 'Non trovato'
	},

	// === SUCCESS MESSAGES ===
	success: {
		accountCreated: 'Conto creato con successo',
		accountUpdated: 'Conto aggiornato con successo',
		accountDeleted: 'Conto eliminato con successo',
		transactionCreated: 'Transazione creata con successo',
		transactionUpdated: 'Transazione aggiornata con successo',
		transactionDeleted: 'Transazione eliminata con successo',
		categoryCreated: 'Categoria creata con successo',
		categoryUpdated: 'Categoria aggiornata con successo',
		categoryDeleted: 'Categoria eliminata con successo'
	}
}

export default it