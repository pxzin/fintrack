import { json } from '@sveltejs/kit'
import { testConnection, executeQuery } from '$lib/server/db.js'
import { checkDatabaseHealth, runMigrations } from '$lib/server/migrations.js'
import type { RequestHandler } from './$types.js'

export const GET: RequestHandler = async () => {
	try {
		// Test basic connection
		const connectionOk = await testConnection()
		
		if (!connectionOk) {
			return json({
				success: false,
				error: 'Database connection failed',
				timestamp: new Date().toISOString()
			}, { status: 500 })
		}
		
		console.log('✅ Database connection successful, running migrations...')
		
		// Always run migrations (safe with IF NOT EXISTS)
		await runMigrations()
		
		// Check final state
		const healthOk = await checkDatabaseHealth()
		
		// Get database info safely
		let userCount = 0
		let tables: string[] = []
		
		try {
			const dbInfo = await executeQuery(`SELECT COUNT(*) as user_count FROM users`)
			userCount = dbInfo.rows[0].user_count as number
		} catch (e) {
			console.warn('Could not count users, table might not exist yet')
		}
		
		try {
			const tableInfo = await executeQuery(`
				SELECT name FROM sqlite_master 
				WHERE type='table' AND name NOT LIKE 'sqlite_%'
				ORDER BY name
			`)
			tables = tableInfo.rows.map(row => row.name as string)
		} catch (e) {
			console.warn('Could not list tables')
		}
		
		return json({
			success: true,
			connection: 'OK',
			migrations: 'Completed',
			tables,
			users: userCount,
			health: healthOk,
			timestamp: new Date().toISOString(),
			message: 'Database is ready! 🚀'
		})
		
	} catch (error) {
		console.error('Database test error:', error)
		
		return json({
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error',
			timestamp: new Date().toISOString()
		}, { status: 500 })
	}
}