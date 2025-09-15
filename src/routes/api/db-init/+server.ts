import { json } from '@sveltejs/kit';
import { turso } from '$lib/server/db.js';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = async () => {
	try {
		console.log('🔄 Initializing database with direct SQL...');

		// Execute SQL statements directly
		const statements = [
			`CREATE TABLE IF NOT EXISTS users (
				id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
				email TEXT UNIQUE NOT NULL,
				password_hash TEXT NOT NULL,
				full_name TEXT NOT NULL,
				timezone TEXT DEFAULT 'America/Sao_Paulo',
				currency TEXT DEFAULT 'BRL',
				created_at TEXT DEFAULT (datetime('now')),
				updated_at TEXT DEFAULT (datetime('now')),
				email_verified INTEGER DEFAULT 0,
				is_active INTEGER DEFAULT 1
			)`,

			`CREATE TABLE IF NOT EXISTS sessions (
				id TEXT PRIMARY KEY,
				user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
				expires_at INTEGER NOT NULL
			)`,

			`CREATE TABLE IF NOT EXISTS email_verification_tokens (
				id TEXT PRIMARY KEY,
				user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
				email TEXT NOT NULL,
				expires_at INTEGER NOT NULL,
				created_at TEXT DEFAULT (datetime('now'))
			)`,

			`CREATE TABLE IF NOT EXISTS accounts (
				id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
				user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
				name TEXT NOT NULL,
				type TEXT NOT NULL CHECK(type IN (
					'CHECKING', 'SAVINGS', 'CREDIT_CARD', 'INVESTMENT', 
					'BUSINESS', 'CASH', 'CRYPTO', 'LOAN', 'PENSION', 'OTHER'
				)),
				initial_balance REAL NOT NULL DEFAULT 0,
				current_balance REAL NOT NULL DEFAULT 0,
				credit_limit REAL DEFAULT NULL,
				due_day INTEGER DEFAULT NULL,
				created_at TEXT DEFAULT (datetime('now')),
				updated_at TEXT DEFAULT (datetime('now'))
			)`,

			`CREATE TABLE IF NOT EXISTS categories (
				id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
				user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
				name TEXT NOT NULL,
				type TEXT NOT NULL CHECK(type IN ('INCOME', 'EXPENSE')),
				icon TEXT DEFAULT '📁',
				created_at TEXT DEFAULT (datetime('now'))
			)`,

			`CREATE TABLE IF NOT EXISTS transactions (
				id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
				user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
				description TEXT NOT NULL,
				amount REAL NOT NULL,
				date TEXT NOT NULL,
				account_id TEXT NOT NULL REFERENCES accounts(id),
				category_id TEXT NOT NULL REFERENCES categories(id),
				type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
				is_recurrent INTEGER DEFAULT 0,
				recurrence_interval TEXT CHECK(recurrence_interval IN ('MONTHLY', 'YEARLY')),
				installments_total INTEGER DEFAULT NULL,
				installments_paid INTEGER DEFAULT NULL,
				installment_start_date TEXT DEFAULT NULL,
				created_at TEXT DEFAULT (datetime('now')),
				updated_at TEXT DEFAULT (datetime('now'))
			)`
		];

		// Create indexes
		const indexes = [
			'CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)',
			'CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)',
			'CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at)',
			'CREATE INDEX IF NOT EXISTS idx_email_verification_user_id ON email_verification_tokens(user_id)',
			'CREATE INDEX IF NOT EXISTS idx_email_verification_expires_at ON email_verification_tokens(expires_at)',
			'CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id)',
			'CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id)',
			'CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id)',
			'CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date)'
		];

		// Execute table creation
		for (let i = 0; i < statements.length; i++) {
			console.log(`Creating table ${i + 1}/${statements.length}...`);
			await turso.execute(statements[i]);
		}

		// Execute index creation
		for (let i = 0; i < indexes.length; i++) {
			console.log(`Creating index ${i + 1}/${indexes.length}...`);
			await turso.execute(indexes[i]);
		}

		// List tables to verify
		const result = await turso.execute(`
			SELECT name FROM sqlite_master 
			WHERE type='table' AND name NOT LIKE 'sqlite_%'
			ORDER BY name
		`);

		console.log('✅ Database initialization completed!');

		return json({
			success: true,
			message: 'Database initialized successfully! 🚀',
			tables: result.rows.map((row) => row.name),
			timestamp: new Date().toISOString()
		});
	} catch (error) {
		console.error('❌ Database initialization failed:', error);

		return json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
				timestamp: new Date().toISOString()
			},
			{ status: 500 }
		);
	}
};
