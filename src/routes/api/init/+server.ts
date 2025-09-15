import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { seedDatabase } from '$lib/server/seed';

export const POST: RequestHandler = async () => {
	try {
		await seedDatabase();
		return json({ success: true, message: 'Database initialized successfully' });
	} catch (error) {
		console.error('Database initialization failed:', error);
		return json({ success: false, error: String(error) }, { status: 500 });
	}
};
