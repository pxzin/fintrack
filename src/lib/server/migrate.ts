import { readFileSync } from 'fs';
import { join } from 'path';
import { turso } from './db';

export async function runMigrations() {
	console.warn('🔄 Running database migrations...');

	try {
		// Create migrations table if it doesn't exist
		await turso.execute(`
			CREATE TABLE IF NOT EXISTS migrations (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT UNIQUE NOT NULL,
				executed_at INTEGER NOT NULL DEFAULT (unixepoch())
			)
		`);

		// Get already executed migrations
		const result = await turso.execute('SELECT name FROM migrations');
		const executedMigrations = new Set(result.rows.map((row) => row[0] as string));

		// Define migrations in order
		const migrations = ['001_auth.sql'];

		// Execute pending migrations
		for (const migration of migrations) {
			if (executedMigrations.has(migration)) {
				console.log(`⏭️  Skipping migration: ${migration}`);
				continue;
			}

			console.log(`📝 Executing migration: ${migration}`);

			// Read migration file
			const migrationPath = join(process.cwd(), 'src/lib/server/migrations', migration);
			const migrationSQL = readFileSync(migrationPath, 'utf-8');

			// Execute migration in transaction
			await turso.execute('BEGIN TRANSACTION');

			try {
				// Execute each statement in the migration
				const statements = migrationSQL
					.split(';')
					.map((s) => s.trim())
					.filter((s) => s.length > 0);

				for (const statement of statements) {
					await turso.execute(statement);
				}

				// Record migration as executed
				await turso.execute('INSERT INTO migrations (name) VALUES (?)', [migration]);

				await turso.execute('COMMIT');
				console.log(`✅ Migration completed: ${migration}`);
			} catch (error) {
				await turso.execute('ROLLBACK');
				throw error;
			}
		}

		console.log('✅ All migrations completed successfully');
	} catch (error) {
		console.error('❌ Migration failed:', error);
		throw error;
	}
}
