import type { BaseTranslation } from '../i18n-types';

const ptBr: BaseTranslation = {
	// === AUTH ===
	auth: {
		login: {
			title: 'Entrar na Conta',
			subtitle: 'Digite seu email e senha para continuar',
			emailLabel: 'Endereço de email:',
			emailPlaceholder: 'seu.email@exemplo.com',
			passwordLabel: 'Senha',
			passwordPlaceholder: 'Digite sua senha',
			forgotPassword: 'Esqueceu a senha?',
			rememberPassword: 'Lembrar senha',
			signInButton: 'Entrar',
			noAccount: 'Não tem uma conta?',
			createAccount: 'Criar conta'
		},
		register: {
			title: 'Criar Nova Conta',
			subtitle: 'Preencha os dados para criar sua conta',
			nameLabel: 'Nome completo:',
			namePlaceholder: 'Digite seu nome completo',
			emailLabel: 'Endereço de email:',
			emailPlaceholder: 'seu.email@exemplo.com',
			passwordLabel: 'Senha:',
			passwordPlaceholder: 'Digite uma senha segura',
			confirmPasswordLabel: 'Confirmar senha:',
			confirmPasswordPlaceholder: 'Digite a senha novamente',
			signUpButton: 'Criar conta',
			hasAccount: 'Já tem uma conta?',
			signIn: 'Entrar'
		},
		password: {
			strength: {
				title: 'Força da senha',
				levels: {
					veryWeak: 'Muito fraca',
					weak: 'Fraca',
					moderate: 'Moderada',
					strong: 'Forte',
					veryStrong: 'Muito forte'
				}
			},
			feedback: {
				minLength: 'Use pelo menos 8 caracteres',
				mixedCase: 'Use letras maiúsculas e minúsculas',
				includeNumbers: 'Inclua números',
				includeSymbols: 'Inclua símbolos (!@#$%)',
				avoidCommon: 'Evite sequências comuns'
			}
		},
		emailVerification: {
			title: 'Verificar Email',
			subtitle: 'Enviamos um link de verificação para seu email',
			checkEmail: 'Verifique sua caixa de entrada',
			instructions: 'Clique no link enviado para ativar sua conta. O link expira em 24 horas.',
			didNotReceive: 'Não recebeu o email?',
			resendEmail: 'Reenviar email',
			backToLogin: 'Voltar ao login'
		},
		logout: 'Sair'
	},

	// === COMMON ===
	common: {
		loading: 'Carregando...',
		save: 'Salvar',
		cancel: 'Cancelar',
		delete: 'Excluir',
		edit: 'Editar',
		add: 'Adicionar',
		close: 'Fechar',
		confirm: 'Confirmar',
		yes: 'Sim',
		no: 'Não',
		search: 'Buscar',
		filter: 'Filtrar',
		clear: 'Limpar',
		back: 'Voltar',
		next: 'Próximo',
		previous: 'Anterior',
		finish: 'Finalizar',
		required: 'Obrigatório',
		optional: 'Opcional'
	},

	// === NAVIGATION ===
	nav: {
		dashboard: 'Dashboard',
		accounts: 'Contas',
		transactions: 'Transações',
		categories: 'Categorias',
		projections: 'Projeções',
		settings: 'Configurações'
	},

	// === DASHBOARD ===
	dashboard: {
		title: 'Dashboard',
		monthSummary: 'Resumo do Mês',
		income: 'Receitas',
		expenses: 'Despesas',
		balance: 'Saldo',
		recentTransactions: 'Transações Recentes',
		accountBalances: 'Saldos das Contas'
	},

	// === ACCOUNTS ===
	accounts: {
		title: 'Contas',
		addAccount: 'Adicionar Conta',
		accountName: 'Nome da conta',
		accountType: 'Tipo da conta',
		initialBalance: 'Saldo inicial',
		currentBalance: 'Saldo atual',
		types: {
			checking: 'Conta Corrente',
			savings: 'Poupança',
			creditCard: 'Cartão de Crédito',
			investment: 'Investimento',
			business: 'Empresarial',
			cash: 'Dinheiro',
			crypto: 'Criptomoeda',
			loan: 'Empréstimo',
			pension: 'Previdência',
			other: 'Outro'
		}
	},

	// === TRANSACTIONS ===
	transactions: {
		title: 'Transações',
		addTransaction: 'Nova Transação',
		description: 'Descrição',
		amount: 'Valor',
		date: 'Data',
		category: 'Categoria',
		account: 'Conta',
		type: 'Tipo',
		types: {
			income: 'Receita',
			expense: 'Despesa'
		},
		isRecurrent: 'Transação recorrente',
		recurrenceInterval: 'Intervalo de recorrência',
		intervals: {
			monthly: 'Mensal',
			yearly: 'Anual'
		}
	},

	// === CATEGORIES ===
	categories: {
		title: 'Categorias',
		addCategory: 'Nova Categoria',
		categoryName: 'Nome da categoria',
		categoryIcon: 'Ícone',
		types: {
			income: 'Receita',
			expense: 'Despesa'
		}
	},

	// === PROJECTIONS ===
	projections: {
		title: 'Projeções',
		next6Months: 'Próximos 6 Meses',
		expectedIncome: 'Receita Esperada',
		expectedExpenses: 'Despesas Esperadas',
		projectedBalance: 'Saldo Projetado'
	},

	// === ERRORS ===
	errors: {
		required: 'Este campo é obrigatório',
		invalidEmail: 'Email inválido',
		minLength: 'Mínimo de {min} caracteres',
		maxLength: 'Máximo de {max} caracteres',
		invalidAmount: 'Valor inválido',
		networkError: 'Erro de conexão',
		serverError: 'Erro do servidor',
		unauthorized: 'Não autorizado',
		notFound: 'Não encontrado',
		passwordMismatch: 'As senhas não coincidem',
		weakPassword: 'Senha muito fraca'
	},

	// === SUCCESS MESSAGES ===
	success: {
		accountCreated: 'Conta criada com sucesso',
		accountUpdated: 'Conta atualizada com sucesso',
		accountDeleted: 'Conta excluída com sucesso',
		transactionCreated: 'Transação criada com sucesso',
		transactionUpdated: 'Transação atualizada com sucesso',
		transactionDeleted: 'Transação excluída com sucesso',
		categoryCreated: 'Categoria criada com sucesso',
		categoryUpdated: 'Categoria atualizada com sucesso',
		categoryDeleted: 'Categoria excluída com sucesso'
	}
} as const;

export default ptBr;
