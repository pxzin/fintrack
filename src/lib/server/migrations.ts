import { readFile } from 'fs/promises';
import { join } from 'path';
import { executeQuery } from './db.js';

/**
 * Run database migrations
 * Executes the schema.sql file to create tables and indexes
 */
export async function runMigrations() {
	try {
		console.log('🔄 Running database migrations...');

		// Read schema file
		const schemaPath = join(process.cwd(), 'src/lib/server/schema.sql');
		const schema = await readFile(schemaPath, 'utf-8');

		// Parse SQL statements properly by finding complete statements
		const allStatements: string[] = [];

		// Remove comments first, but preserve line structure
		const cleanedSchema = schema
			.split('\n')
			.map((line) => line.replace(/^--.*$/, '').trim())
			.filter((line) => line.length > 0)
			.join('\n');

		// Split by semicolons and reconstruct complete statements
		const potentialStatements = cleanedSchema.split(';');
		let currentStatement = '';

		for (const stmt of potentialStatements) {
			const trimmed = stmt.trim();
			if (!trimmed) continue;

			currentStatement += (currentStatement ? ' ' : '') + trimmed;

			// Check if this looks like a complete statement
			const upperStmt = currentStatement.toUpperCase();
			if (upperStmt.includes('CREATE TABLE') && currentStatement.includes(')')) {
				// Complete CREATE TABLE statement
				allStatements.push(currentStatement);
				currentStatement = '';
			} else if (upperStmt.includes('CREATE INDEX')) {
				// CREATE INDEX statements are single line
				allStatements.push(currentStatement);
				currentStatement = '';
			} else if (upperStmt.includes('CREATE')) {
				// Continue building the statement
			} else {
				// Unknown statement type, add it if it's not empty
				if (currentStatement.trim()) {
					allStatements.push(currentStatement);
				}
				currentStatement = '';
			}
		}

		// Add any remaining statement
		if (currentStatement.trim()) {
			allStatements.push(currentStatement);
		}

		console.log(`🔍 Debug: Found ${allStatements.length} complete statements`);
		allStatements.forEach((stmt, i) => {
			console.log(`   Statement ${i + 1}: ${stmt.substring(0, 80)}...`);
		});

		// Separate CREATE TABLE statements from CREATE INDEX statements
		const tableStatements = allStatements.filter((stmt) =>
			stmt.toUpperCase().includes('CREATE TABLE')
		);
		const indexStatements = allStatements.filter((stmt) =>
			stmt.toUpperCase().includes('CREATE INDEX')
		);
		const otherStatements = allStatements.filter(
			(stmt) =>
				!stmt.toUpperCase().includes('CREATE TABLE') && !stmt.toUpperCase().includes('CREATE INDEX')
		);

		console.log(`📝 Executing ${allStatements.length} migration statements...`);
		console.log(`   - ${tableStatements.length} table statements`);
		console.log(`   - ${indexStatements.length} index statements`);
		console.log(`   - ${otherStatements.length} other statements`);

		// Debug: Log all statements to see what's being parsed
		console.log('🔍 Debug: All statements:');
		allStatements.forEach((stmt, i) => {
			console.log(`   ${i + 1}. ${stmt.substring(0, 80)}...`);
		});

		// Execute table creation first
		console.log('🔄 Creating tables...');
		for (let i = 0; i < tableStatements.length; i++) {
			const statement = tableStatements[i];
			try {
				console.log(
					`   Table ${i + 1}/${tableStatements.length}: ${statement.substring(0, 50)}...`
				);
				await executeQuery(statement);
			} catch (error) {
				console.error(`❌ Failed to execute table statement ${i + 1}:`, statement);
				console.error('Error:', error);
				throw error;
			}
		}

		// Execute other statements
		if (otherStatements.length > 0) {
			console.log('🔄 Executing other statements...');
			for (let i = 0; i < otherStatements.length; i++) {
				const statement = otherStatements[i];
				try {
					console.log(
						`   Other ${i + 1}/${otherStatements.length}: ${statement.substring(0, 50)}...`
					);
					await executeQuery(statement);
				} catch (error) {
					console.error(`❌ Failed to execute other statement ${i + 1}:`, statement);
					console.error('Error:', error);
					throw error;
				}
			}
		}

		// Execute index creation last
		console.log('🔄 Creating indexes...');
		for (let i = 0; i < indexStatements.length; i++) {
			const statement = indexStatements[i];
			try {
				console.log(
					`   Index ${i + 1}/${indexStatements.length}: ${statement.substring(0, 50)}...`
				);
				await executeQuery(statement);
			} catch (error) {
				console.error(`❌ Failed to execute index statement ${i + 1}:`, statement);
				console.error('Error:', error);
				throw error;
			}
		}

		console.log('✅ Database migrations completed successfully');
		return true;
	} catch (error) {
		console.error('❌ Migration failed:', error);
		throw error;
	}
}

/**
 * Create default categories for a new user
 */
export async function createDefaultCategories(userId: string) {
	const defaultCategories = [
		// Income categories
		{ name: 'Salary', type: 'INCOME', icon: '💼' },
		{ name: 'Freelance', type: 'INCOME', icon: '💻' },
		{ name: 'Investment', type: 'INCOME', icon: '📈' },
		{ name: 'Other Income', type: 'INCOME', icon: '💰' },

		// Expense categories
		{ name: 'Food', type: 'EXPENSE', icon: '🍽️' },
		{ name: 'Transport', type: 'EXPENSE', icon: '🚗' },
		{ name: 'Shopping', type: 'EXPENSE', icon: '🛒' },
		{ name: 'Bills', type: 'EXPENSE', icon: '📋' },
		{ name: 'Health', type: 'EXPENSE', icon: '🏥' },
		{ name: 'Entertainment', type: 'EXPENSE', icon: '🎬' },
		{ name: 'Other', type: 'EXPENSE', icon: '📁' }
	];

	try {
		for (const category of defaultCategories) {
			await executeQuery('INSERT INTO categories (user_id, name, type, icon) VALUES (?, ?, ?, ?)', [
				userId,
				category.name,
				category.type,
				category.icon
			]);
		}

		console.log(`✅ Created ${defaultCategories.length} default categories for user ${userId}`);
		return true;
	} catch (error) {
		console.error('❌ Failed to create default categories:', error);
		throw error;
	}
}

/**
 * Check if database is properly initialized
 */
export async function checkDatabaseHealth() {
	try {
		const tables = await executeQuery(`
			SELECT name FROM sqlite_master 
			WHERE type='table' AND name NOT LIKE 'sqlite_%'
			ORDER BY name
		`);

		const requiredTables = [
			'users',
			'sessions',
			'accounts',
			'categories',
			'transactions',
			'recurrence_adjustments'
		];
		const existingTables = tables.rows.map((row) => row.name as string);

		const missingTables = requiredTables.filter((table) => !existingTables.includes(table));

		if (missingTables.length > 0) {
			console.warn('⚠️ Missing tables:', missingTables);
			return false;
		}

		console.log('✅ Database health check passed');
		console.log('📊 Existing tables:', existingTables.join(', '));
		return true;
	} catch (error) {
		console.error('❌ Database health check failed:', error);
		return false;
	}
}
