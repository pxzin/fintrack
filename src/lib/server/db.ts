import { createClient, type Client, type InArgs } from '@libsql/client';
import { dev } from '$app/environment';

// Environment variables validation
const DATABASE_URL = process.env.TURSO_DATABASE_URL;
const AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!DATABASE_URL) {
	throw new Error('TURSO_DATABASE_URL environment variable is required');
}

if (!AUTH_TOKEN && !dev) {
	throw new Error('TURSO_AUTH_TOKEN environment variable is required in production');
}

// Create Turso client
export const turso: Client = createClient({
	url: DATABASE_URL,
	authToken: AUTH_TOKEN
});

/**
 * Execute a query with parameters
 * @param sql SQL query string
 * @param params Query parameters
 * @returns Query result
 */
export async function executeQuery(sql: string, params: InArgs = []) {
	try {
		const result = await turso.execute({
			sql,
			args: params
		});
		return result;
	} catch (error) {
		console.error('Database query error:', error);
		throw error;
	}
}

/**
 * Execute multiple queries in a transaction
 * @param queries Array of {sql, params} objects
 * @returns Transaction result
 */
export async function executeTransaction(queries: Array<{ sql: string; params?: InArgs }>) {
	try {
		const transaction = await turso.batch(
			queries.map(({ sql, params = [] }) => ({
				sql,
				args: params
			}))
		);
		return transaction;
	} catch (error) {
		console.error('Database transaction error:', error);
		throw error;
	}
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
	try {
		await turso.execute('SELECT 1');
		return true;
	} catch (error) {
		console.error('Database connection failed:', error);
		return false;
	}
}

/**
 * Close database connection
 */
export async function closeConnection() {
	try {
		turso.close();
	} catch (error) {
		console.error('Error closing database connection:', error);
	}
}
