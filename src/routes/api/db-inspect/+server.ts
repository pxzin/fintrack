import { json } from '@sveltejs/kit';
import { executeQuery } from '$lib/server/db.js';
import { dev } from '$app/environment';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = async ({ url }) => {
	// Only allow in development
	if (!dev) {
		return json({ error: 'Database inspector only available in development' }, { status: 403 });
	}

	try {
		const table = url.searchParams.get('table') || 'all';
		const limit = parseInt(url.searchParams.get('limit') || '50');

		const data: Record<string, any[]> = {};

		if (table === 'all') {
			// Get all tables
			const tables = ['users', 'sessions', 'email_verification_tokens', 'accounts', 'categories', 'transactions'];

			for (const tableName of tables) {
				try {
					let query = `SELECT * FROM ${tableName} ORDER BY created_at DESC`;
					if (tableName === 'sessions') {
						query = `SELECT * FROM ${tableName} ORDER BY expires_at DESC`;
					}
					query += ` LIMIT ${limit}`;

					const result = await executeQuery(query);
					data[tableName] = result.rows.map(row => {
						// Convert row to object
						const obj: any = {};
						result.columns.forEach((column, index) => {
							obj[column] = row[index];
						});
						return obj;
					});
				} catch (error) {
					data[tableName] = [];
				}
			}
		} else {
			// Get specific table
			try {
				const result = await executeQuery(`SELECT * FROM ${table} LIMIT ${limit}`);
				data[table] = result.rows.map(row => {
					const obj: any = {};
					result.columns.forEach((column, index) => {
						obj[column] = row[index];
					});
					return obj;
				});
			} catch (error) {
				data[table] = [];
			}
		}

		// Get table counts
		const counts: Record<string, number> = {};
		const tables = ['users', 'sessions', 'email_verification_tokens', 'accounts', 'categories', 'transactions'];

		for (const tableName of tables) {
			try {
				const result = await executeQuery(`SELECT COUNT(*) as count FROM ${tableName}`);
				counts[tableName] = result.rows[0][0] as number;
			} catch {
				counts[tableName] = 0;
			}
		}

		return json({
			success: true,
			data,
			counts,
			timestamp: new Date().toISOString()
		});

	} catch (error) {
		console.error('Database inspection error:', error);
		return json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};